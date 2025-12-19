import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FaRocket, FaChartPie, FaUserGraduate, FaArrowRight,
    FaRoute, FaClipboardList, FaBrain, FaBookOpen, FaTrophy, FaSpinner
} from 'react-icons/fa';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api';

const BenefitCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
    >
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4">
            <Icon className="text-xl" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
);

const StudentDashboard = () => {
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const firstName = user.profile?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'User';

    useEffect(() => {
        fetchRecentActivity();
    }, []);

    const fetchRecentActivity = async () => {
        try {
            const response = await api.get('analysis/progress/');
            setRecentActivity(response.data.recent_activity || []);
        } catch (err) {
            console.error('Failed to fetch activity:', err);
        } finally {
            setLoading(false);
        }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'personality_test': return <FaBrain className="text-white text-sm" />;
            case 'module_created': return <FaBookOpen className="text-white text-sm" />;
            case 'test_attempt': return <FaTrophy className="text-white text-sm" />;
            default: return <FaClipboardList className="text-white text-sm" />;
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case 'personality_test': return 'bg-purple-600';
            case 'module_created': return 'bg-primary';
            case 'test_attempt': return 'bg-green-600';
            default: return 'bg-gray-600';
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {firstName}! 👋</h1>
                    <p className="text-gray-400">Ready to take your skills to the next level?</p>
                </div>

                {/* Hero Assessment Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-purple-600 p-8 md:p-12"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-medium mb-6">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Recommended for you
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Discover Your True Potential
                            </h2>
                            <p className="text-white/80 text-lg mb-8 leading-relaxed">
                                Take our comprehensive AI-driven assessment to identify your strengths and get a personalized learning roadmap tailored just for you.
                            </p>

                            <div className="flex flex-wrap items-center gap-6 mb-8">
                                <div className="flex items-center gap-2 text-white/90 text-sm">
                                    <FaChartPie /> 500+ Skills Assessed
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/40" />
                                <div className="flex items-center gap-2 text-white/90 text-sm">
                                    <FaRocket /> 15-20 min duration
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/40" />
                                <div className="flex items-center gap-2 text-white/90 text-sm">
                                    <FaUserGraduate /> Personalized Results
                                </div>
                            </div>

                            <Link
                                to="/assessment"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Start Assessment <FaArrowRight />
                            </Link>
                        </div>

                        {/* Illustration Placeholder */}
                        <div className="hidden md:block relative w-64 h-64">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full animate-pulse" />
                            <div className="absolute inset-4 bg-white/20 backdrop-blur-md rounded-full" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaRocket className="text-6xl text-white/80" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <BenefitCard
                        icon={FaRoute}
                        title="Personalized Path"
                        description="Get a custom-tailored learning journey based on your unique skills and goals."
                        delay={0.2}
                    />
                    <BenefitCard
                        icon={FaChartPie}
                        title="Skill Mapping"
                        description="Visualize your competencies and identify areas for focused improvement."
                        delay={0.3}
                    />
                    <BenefitCard
                        icon={FaUserGraduate}
                        title="Track Growth"
                        description="Monitor your progress over time with detailed analytics and milestone tracking."
                        delay={0.4}
                    />
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>

                    {loading ? (
                        <div className="text-center py-12">
                            <FaSpinner className="text-2xl text-primary animate-spin mx-auto" />
                        </div>
                    ) : recentActivity.length > 0 ? (
                        <div className="space-y-3">
                            {recentActivity.slice(0, 5).map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                                        {getActivityIcon(activity.type)}
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
                            <Link
                                to="/analytics"
                                className="block text-center text-primary hover:underline text-sm mt-4"
                            >
                                View all activity →
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaClipboardList className="text-2xl opacity-50" />
                            </div>
                            <p>No assessments taken yet.</p>
                            <p className="text-sm mt-2">Complete your first assessment to see your history here.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout >
    );
};

export default StudentDashboard;
