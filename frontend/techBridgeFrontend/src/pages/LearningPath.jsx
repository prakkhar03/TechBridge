import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaSearch, FaHistory, FaBookOpen, FaLightbulb,
    FaArrowRight, FaSpinner, FaChevronRight, FaRegBookmark,
    FaArrowLeft, FaBrain
} from 'react-icons/fa';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LearningPath = () => {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [activeModule, setActiveModule] = useState(null);
    const [error, setError] = useState('');
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await api.get('modules/history/');
            setHistory(response.data);
        } catch (err) {
            console.error('Failed to fetch history:', err);
        }
    };

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!topic.trim()) return;

        setLoading(true);
        setError('');
        setActiveModule(null);

        try {
            const response = await api.post('modules/search/', { topic: topic.trim() });
            setActiveModule(response.data.module);
            fetchHistory(); // Refresh history
        } catch (err) {
            console.error('Search failed:', err);
            setError('Failed to generate learning path. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const selectModule = (module) => {
        setActiveModule(module);
        setTopic(module.topic);
        if (window.innerWidth < 768) setShowHistory(false);
    };

    return (
        <DashboardLayout>
            <div className="flex h-[calc(100vh-140px)] gap-6 overflow-hidden">
                {/* History Sidebar - Desktop */}
                <motion.div
                    className={`
                        fixed md:relative z-20 w-80 h-full bg-white/5 border border-white/10 rounded-2xl 
                        backdrop-blur-xl transition-all duration-300 md:translate-x-0
                        ${showHistory ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    `}
                >
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white font-bold">
                            <FaHistory className="text-primary" /> Learning History
                        </div>
                        <button
                            className="md:hidden text-white"
                            onClick={() => setShowHistory(false)}
                        >
                            <FaArrowLeft />
                        </button>
                    </div>
                    <div className="overflow-y-auto h-[calc(100%-80px)] p-4 space-y-3 custom-scrollbar">
                        {history.length > 0 ? (
                            history.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => selectModule(item)}
                                    className={`
                                        w-full p-4 rounded-xl border text-left transition-all group
                                        ${activeModule?.id === item.id
                                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/10'}
                                    `}
                                >
                                    <h4 className="font-bold truncate capitalize mb-1 group-hover:text-white">
                                        {item.topic}
                                    </h4>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className={activeModule?.id === item.id ? 'text-white/80' : 'text-gray-500'}>
                                            {item.difficulty}
                                        </span>
                                        <FaChevronRight className={activeModule?.id === item.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100 transition-all text-primary'} />
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="text-center py-12 text-gray-500 text-sm">
                                <FaHistory className="text-3xl mx-auto mb-3 opacity-20" />
                                <p>No history yet</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-full space-y-6 min-w-0">
                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6"
                    >
                        <form onSubmit={handleSearch} className="relative group">
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Search any topic (e.g., Quantum Computing, Neural Networks, Docker...)"
                                className="w-full bg-dark border border-white/10 rounded-xl py-4 pl-14 pr-32 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-lg"
                            />
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary text-xl">
                                <FaSearch className="group-focus-within:scale-110 transition-transform" />
                            </div>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <button
                                    hidden={loading}
                                    className="md:hidden bg-primary p-3 rounded-lg text-white"
                                    onClick={() => setShowHistory(true)}
                                >
                                    <FaHistory />
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || !topic.trim()}
                                    className="bg-primary hover:bg-blue-600 disabled:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                                >
                                    {loading ? <FaSpinner className="animate-spin" /> : <><span className="hidden md:inline">Generate</span> <FaArrowRight /></>}
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Result Content */}
                    <div className="flex-1 overflow-y-auto rounded-2xl bg-white/5 border border-white/10 custom-scrollbar relative">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <div className="w-32 h-32 relative mb-8">
                                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                                        <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <FaBrain className="text-4xl text-primary animate-pulse" />
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Architecting your path...</h2>
                                    <p className="text-gray-400 max-w-sm">Generating a comprehensive learning roadmap for "{topic}". This usually takes 10-20 seconds.</p>
                                </motion.div>
                            ) : activeModule ? (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-8 md:p-12"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10 border-b border-white/10 pb-8">
                                        <div>
                                            <div className="flex items-center gap-2 text-primary font-bold mb-4">
                                                <FaBookOpen /> LEARNING ROADMAP
                                            </div>
                                            <h1 className="text-4xl md:text-5xl font-black text-white capitalize leading-tight">
                                                {activeModule.topic}
                                            </h1>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-bold capitalize">
                                                {activeModule.difficulty} Level
                                            </span>
                                            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors">
                                                <FaRegBookmark />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Markdown Content Rendering */}
                                    <div className="prose prose-invert prose-lg max-w-none 
                                        prose-headings:text-white 
                                        prose-p:text-gray-300 prose-p:leading-relaxed
                                        prose-strong:text-primary prose-strong:font-bold
                                        prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-secondary
                                        prose-li:text-gray-300
                                        prose-hr:border-white/10
                                        prose-blockquote:border-l-primary prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                                    ">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                h1: ({ node, ...props }) => <h1 className="text-4xl font-extrabold text-white mb-8 border-b-2 border-primary pb-4" {...props} />,
                                                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10" {...props} />,
                                                h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-primary mt-8 mb-4 flex items-center gap-2" {...props} />,
                                                p: ({ node, ...props }) => <p className="text-gray-300 mb-6 leading-relaxed text-lg" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="space-y-3 mb-8 list-none" {...props} />,
                                                li: ({ node, ...props }) => (
                                                    <li className="flex gap-3 text-gray-300 text-lg">
                                                        <span className="text-primary mt-1.5"><FaChevronRight className="text-xs" /></span>
                                                        <span>{props.children}</span>
                                                    </li>
                                                ),
                                                code: ({ node, inline, ...props }) => (
                                                    inline
                                                        ? <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono text-sm" {...props} />
                                                        : <pre className="bg-black/40 p-6 rounded-2xl border border-white/10 overflow-x-auto my-8 scrollbar-thin scrollbar-thumb-white/10">
                                                            <code className="text-secondary font-mono text-sm leading-relaxed" {...props} />
                                                        </pre>
                                                ),
                                                blockquote: ({ node, ...props }) => (
                                                    <blockquote className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-2xl my-8 italic text-gray-300" {...props} />
                                                ),
                                                hr: () => <hr className="border-white/10 my-12" />
                                            }}
                                        >
                                            {activeModule.content}
                                        </ReactMarkdown>
                                    </div>
                                </motion.div>
                            ) : error ? (
                                <motion.div
                                    key="error"
                                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6">
                                        <FaLightbulb className="text-3xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h3>
                                    <p className="text-gray-400 mb-6">{error}</p>
                                    <button
                                        onClick={handleSearch}
                                        className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-all"
                                    >
                                        Try Again
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 animate-bounce transition-all duration-1000">
                                        <FaLightbulb className="text-4xl" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-4">What do you want to master today?</h2>
                                    <p className="text-gray-400 max-w-md mx-auto text-lg">
                                        Enter any topic, technology, or domain above and our AI will architect a detailed learning path for you.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-2xl">
                                        {['Generative AI', 'Cloud Architecture', 'Web3 & Solidity'].map(term => (
                                            <button
                                                key={term}
                                                onClick={() => {
                                                    setTopic(term);
                                                    // Auto trigger search
                                                    setTimeout(() => handleSearch(), 100);
                                                }}
                                                className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:border-primary/50 hover:text-primary transition-all text-sm font-medium"
                                            >
                                                Learn "{term}"
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Icons needed but not imported yet */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                .prose strong { color: #3b82f6 !important; }
            `}} />
        </DashboardLayout>
    );
};

export default LearningPath;
