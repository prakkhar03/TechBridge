import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-dark">
            {/* Background Gradient & Particles */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[100px] animate-pulse delay-1000" />

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/10 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            width: Math.random() * 10 + 5,
                            height: Math.random() * 10 + 5,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Bridge the <span className="text-primary">Skills Gap</span> in Your Startup
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-lg">
                        Master emerging tech skills 40% faster with our AI-driven personalized learning platform designed for the modern ecosystem.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg shadow-primary/25 transition-all"
                        >
                            Start Learning Free
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white rounded-full font-semibold text-lg backdrop-blur-sm transition-all"
                        >
                            For Startups
                        </motion.button>
                    </div>
                </motion.div>

                {/* Visual Element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[400px] md:h-[500px] flex items-center justify-center"
                >
                    {/* Abstract 3D Representation */}
                    <div className="relative w-full h-full">
                        <motion.div
                            animate={{
                                rotateY: [0, 360],
                                rotateX: [0, 10, 0],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="absolute inset-0 m-auto w-64 h-64 border-4 border-primary/30 rounded-full"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="absolute inset-0 border-4 border-secondary/30 rounded-full rotate-45" />
                            <div className="absolute inset-0 border-4 border-accent/30 rounded-full -rotate-45" />
                        </motion.div>

                        {/* Floating Cards */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 right-0 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                                    AI
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Progress</div>
                                    <div className="font-bold text-white">+40% Growth</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-1/4 left-0 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
                                    ★
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Skill Mastered</div>
                                    <div className="font-bold text-white">Blockchain Dev</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
