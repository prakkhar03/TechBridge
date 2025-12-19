import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaArrowRight, FaSpinner, FaBrain, FaLightbulb, FaBookOpen } from 'react-icons/fa';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api';

const Assessment = () => {
    const [phase, setPhase] = useState(1); // 1: Personality, 2: Topic, 3: Module View
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Phase 1: Personality Test State
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Phase 2: Topic State
    const [topic, setTopic] = useState('');
    const [generatedModule, setGeneratedModule] = useState(null);

    // Fetch Questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get('analysis/questions/');
                setQuestions(response.data);
            } catch (err) {
                console.error("Failed to fetch questions:", err);
                setError("Failed to load assessment questions.");
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswer = (questionId, optionId) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));
        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 300);
        }
    };

    const submitPersonalityTest = async () => {
        setLoading(true);
        try {
            // Format answers for backend
            // Backend expects: { answers: [{ question_id: int, option_id: int }] }
            const formattedAnswers = Object.entries(answers).map(([qId, oId]) => ({
                question_id: parseInt(qId),
                option_id: oId
            }));

            await api.post('analysis/submit/', { answers: formattedAnswers });
            setPhase(2);
        } catch (err) {
            console.error("Submission failed:", err);
            setError("Failed to submit assessment.");
        } finally {
            setLoading(false);
        }
    };

    const generateModule = async () => {
        if (!topic) return;
        setLoading(true);
        setError('');

        try {
            const response = await api.post('modules/generate/', { topic });
            setGeneratedModule(response.data);
            setPhase(3);
        } catch (err) {
            console.error("Module generation failed:", err);
            setError("Failed to generate module. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Render Phase 1: Personality Test
    const renderPhase1 = () => (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm text-center">
                        {error}
                    </div>
                )}
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
                <h2 className="text-2xl font-bold text-white mb-8">
                    {questions[currentQuestionIndex]?.text}
                </h2>

                <div className="space-y-4">
                    {questions[currentQuestionIndex]?.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleAnswer(questions[currentQuestionIndex].id, option.id)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${answers[questions[currentQuestionIndex].id] === option.id
                                ? 'bg-primary/20 border-primary text-white'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    {currentQuestionIndex === questions.length - 1 && (
                        <button
                            onClick={submitPersonalityTest}
                            disabled={Object.keys(answers).length !== questions.length || loading}
                            className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : 'Complete Assessment'}
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );

    // Render Phase 2: Topic Selection
    const renderPhase2 = () => (
        <div className="max-w-xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <FaLightbulb className="text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">What do you want to learn?</h2>
                <p className="text-gray-400 mb-8">
                    Based on your profile, we'll generate a custom learning module for any topic you choose.
                </p>

                <div className="relative mb-8">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., React Hooks, Python Basics, Blockchain"
                        className="w-full bg-dark border border-white/20 rounded-xl py-4 px-6 text-white placeholder-gray-500 focus:border-primary focus:outline-none text-lg"
                    />
                </div>

                <button
                    onClick={generateModule}
                    disabled={!topic || loading}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin" /> Generating Module...
                        </>
                    ) : (
                        <>
                            Generate Learning Path <FaArrowRight />
                        </>
                    )}
                </button>
            </motion.div>
        </div>
    );

    // Render Phase 3: Module View
    const renderPhase3 = () => (
        <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
                <div className="p-8 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-3 text-primary mb-2">
                        <FaBookOpen /> Learning Module
                    </div>
                    <h1 className="text-3xl font-bold text-white capitalize">{generatedModule?.module?.topic}</h1>
                    <p className="text-gray-400 mt-2">Difficulty: {generatedModule?.module?.difficulty}</p>
                </div>

                <div className="p-8 prose prose-invert max-w-none">
                    {/* Render content as preformatted text since it's markdown/plain text */}
                    <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                        {generatedModule?.module?.content}
                    </div>
                </div>

                <div className="p-8 border-t border-white/10 bg-white/5 flex justify-end">
                    <button className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center gap-2">
                        Take Skill Test <FaArrowRight />
                    </button>
                </div>
            </motion.div>
        </div>
    );

    return (
        <DashboardLayout>
            <div className="container mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Skill Assessment</h1>
                    <p className="text-gray-400">Phase {phase} of 3: {
                        phase === 1 ? 'Personality Analysis' :
                            phase === 2 ? 'Topic Selection' : 'Learning Module'
                    }</p>
                </div>

                <AnimatePresence mode="wait">
                    {phase === 1 && renderPhase1()}
                    {phase === 2 && renderPhase2()}
                    {phase === 3 && renderPhase3()}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
};

export default Assessment;
