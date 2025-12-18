import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaChartLine, FaBookOpen, FaBrain, FaTrophy, FaSpinner,
    FaCheckCircle, FaTimesCircle, FaClock
} from 'react-icons/fa';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api';

const ProgressAnalytics = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        fetchProgress();
    }, []);

    const fetchProgress = async () => {
        try {
            const response = await api.get('analysis/progress/');
            setProgress(response.data);
        } catch (err) {
            console.error('Failed to fetch progress:', err);
            setError('Failed to load progress data');
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="text-xl text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1">{title}</p>
            <p className="text-2xl font-bold text-white capitalize">{value || 'N/A'}</p>
        </motion.div>
    );

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-64">
                    <FaSpinner className="text-4xl text-primary animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Progress Analytics</h1>
                    <p className="text-gray-400">Track your learning journey and achievements</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        icon={FaBrain}
                        title="Learning Level"
                        value={progress?.stats?.learning_level}
                        color="bg-purple-600"
                    />
                    <StatCard
                        icon={FaBookOpen}
                        title="Total Modules"
                        value={progress?.stats?.total_modules}
                        color="bg-primary"
                    />
                    <StatCard
                        icon={FaTrophy}
                        title="Completed"
                        value={progress?.stats?.completed_modules}
                        color="bg-green-600"
                    />
                </div>

                {/* Personality Test Result */}
                {progress?.personality_result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 rounded-2xl p-6 mb-8"
                    >
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <FaBrain /> Personality Assessment Results
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/5 rounded-xl p-4">
                                <p className="text-gray-400 text-sm">Learning Level</p>
                                <p className="text-xl font-bold text-white capitalize">
                                    {progress.personality_result.learning_level}
                                </p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <p className="text-gray-400 text-sm">Total Score</p>
                                <p className="text-xl font-bold text-white">
                                    {progress.personality_result.total_score}
                                </p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <p className="text-gray-400 text-sm">Completed On</p>
                                <p className="text-xl font-bold text-white">
                                    {new Date(progress.personality_result.completed_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Learning Modules */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FaBookOpen /> Learning Modules
                    </h2>

                    {progress?.modules?.length > 0 ? (
                        <div className="space-y-4">
                            {progress.modules.map((module) => (
                                <div
                                    key={module.id}
                                    className="bg-dark border border-white/10 rounded-xl p-4 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${module.is_completed ? 'bg-green-600' : 'bg-primary'
                                            }`}>
                                            {module.is_completed ? (
                                                <FaCheckCircle className="text-white" />
                                            ) : (
                                                <FaClock className="text-white" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white capitalize">{module.topic}</h3>
                                            <p className="text-sm text-gray-400">
                                                {module.difficulty} • {new Date(module.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {module.latest_test ? (
                                            <div className={`text-sm font-bold ${module.latest_test.passed ? 'text-green-400' : 'text-yellow-400'
                                                }`}>
                                                {module.latest_test.percentage?.toFixed(0)}%
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-500">No test taken</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            <FaBookOpen className="text-4xl mx-auto mb-4 opacity-50" />
                            <p>No learning modules yet.</p>
                            <p className="text-sm mt-2">Complete an assessment to start learning!</p>
                        </div>
                    )}
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FaChartLine /> Recent Activity
                    </h2>

                    {progress?.recent_activity?.length > 0 ? (
                        <div className="space-y-3">
                            {progress.recent_activity.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.type === 'personality_test' ? 'bg-purple-600' :
                                            activity.type === 'module_created' ? 'bg-primary' :
                                                'bg-green-600'
                                        }`}>
                                        {activity.type === 'personality_test' && <FaBrain className="text-white text-sm" />}
                                        {activity.type === 'module_created' && <FaBookOpen className="text-white text-sm" />}
                                        {activity.type === 'test_attempt' && <FaTrophy className="text-white text-sm" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-medium">{activity.title}</p>
                                        <p className="text-sm text-gray-400">{activity.description}</p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(activity.date).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            <FaChartLine className="text-4xl mx-auto mb-4 opacity-50" />
                            <p>No activity yet.</p>
                            <p className="text-sm mt-2">Start an assessment to see your progress!</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ProgressAnalytics;
