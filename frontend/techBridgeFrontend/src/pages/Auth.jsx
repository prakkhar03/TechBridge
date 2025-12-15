import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLeftPanel from '../components/Auth/AuthLeftPanel';
import LoginForm from '../components/Auth/LoginForm';
import RegisterWizard from '../components/Auth/RegisterWizard';
import { Link } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-dark flex">
            <AuthLeftPanel />

            <div className="w-full lg:w-[60%] relative flex flex-col">
                {/* Mobile Header */}
                <div className="lg:hidden p-6 flex items-center justify-between border-b border-white/10">
                    <span className="text-xl font-bold text-white">Tech Bridge</span>
                    <Link to="/" className="text-sm text-gray-400 hover:text-white">
                        Back to Home
                    </Link>
                </div>

                {/* Desktop Back Button */}
                <div className="hidden lg:block absolute top-8 right-8 z-20">
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                        Back to Home
                    </Link>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto">
                    <div className="w-full max-w-md">
                        {/* Tab Switcher */}
                        <div className="flex mb-8 border-b border-white/10 relative">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 pb-4 text-center font-medium transition-colors relative ${isLogin ? 'text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Login
                                {isLogin && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 pb-4 text-center font-medium transition-colors relative ${!isLogin ? 'text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Sign Up
                                {!isLogin && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Forms */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? 'login' : 'register'}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isLogin ? (
                                    <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
                                ) : (
                                    <RegisterWizard onSwitchToLogin={() => setIsLogin(true)} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
