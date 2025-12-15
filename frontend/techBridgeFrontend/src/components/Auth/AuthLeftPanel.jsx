import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaBrain, FaChartLine } from 'react-icons/fa';

const AuthLeftPanel = () => {
    return (
        <div className="hidden lg:flex w-[40%] bg-dark relative overflow-hidden items-center justify-center p-12">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-dark to-secondary/20" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/10 rounded-full blur-[100px]"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-white max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-8">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Tech Bridge
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold mb-6 leading-tight">
                        Transform Your Skills, <br />
                        <span className="text-primary">Transform Your Career</span>
                    </h1>

                    <p className="text-gray-400 text-lg mb-12">
                        Join the fastest growing AI-powered learning platform designed for the modern tech ecosystem.
                    </p>

                    <div className="space-y-6">
                        {[
                            { icon: FaBrain, text: "AI-Powered Personalization", color: "text-purple-400" },
                            { icon: FaRocket, text: "Learn 40% Faster", color: "text-blue-400" },
                            { icon: FaChartLine, text: "60% Job Placement Rate", color: "text-green-400" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                            >
                                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${item.color}`}>
                                    <item.icon className="text-xl" />
                                </div>
                                <span className="font-medium">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthLeftPanel;
