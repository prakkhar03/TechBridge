import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaGamepad, FaChartPie, FaBriefcase, FaLayerGroup, FaBrain } from 'react-icons/fa';

const features = [
    {
        icon: FaBrain,
        title: "AI-Powered Personalization",
        description: "Dynamic learning paths that adapt to your progress, pace, and career goals in real-time."
    },
    {
        icon: FaRobot,
        title: "24/7 AI Learning Agent",
        description: "Instant help and doubt resolution while learning, available whenever you need it."
    },
    {
        icon: FaGamepad,
        title: "Interactive Gamification",
        description: "Earn points, badges, and compete on leaderboards to keep your motivation high."
    },
    {
        icon: FaChartPie,
        title: "Real-time Progress Analytics",
        description: "Track your growth with detailed insights, skill graphs, and future performance predictions."
    },
    {
        icon: FaBriefcase,
        title: "Skill-based Job Matching",
        description: "Get matched with internships and job opportunities based on your verified skills."
    },
    {
        icon: FaLayerGroup,
        title: "Bite-sized Learning Modules",
        description: "Learn in short, focused sessions that fit into any schedule without overwhelming you."
    }
];

const FeatureCard = ({ feature, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
        >
            <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                {feature.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
                {feature.description}
            </p>
        </motion.div>
    );
};

const Features = () => {
    return (
        <section id="features" className="py-24 bg-dark relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        Why Choose <span className="text-primary">Tech Bridge</span>?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Experience a revolutionary way to learn and grow with features designed for the modern tech ecosystem.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
