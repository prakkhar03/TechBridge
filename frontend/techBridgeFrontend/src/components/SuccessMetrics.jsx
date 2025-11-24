import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaRocket, FaUserCheck, FaBrain } from 'react-icons/fa';

const MetricCard = ({ icon: Icon, value, label, description, trend }) => {
    return (
        <div className="group h-[300px] perspective-1000">
            <div className="relative w-full h-full transition-all duration-500 transform style-preserve-3d group-hover:rotate-y-180">
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                    <div className="w-16 h-16 mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl shadow-lg shadow-primary/30">
                        <Icon />
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-2">{value}</h3>
                    <p className="text-gray-300 font-medium">{label}</p>
                    <div className="mt-4 text-green-400 text-sm font-bold flex items-center gap-1">
                        <span>▲</span> {trend}
                    </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-primary/90 to-secondary/90 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">{label}</h3>
                    <p className="text-white/90 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const SuccessMetrics = () => {
    const metrics = [
        {
            icon: FaTrophy,
            value: "70%",
            label: "Completion Rate",
            description: "Compared to the industry average of 15%, our personalized approach keeps learners engaged until the end.",
            trend: "4.5x Higher"
        },
        {
            icon: FaRocket,
            value: "40%",
            label: "Faster Learning",
            description: "Our AI adapts to your pace, helping you master complex tech skills significantly faster than traditional methods.",
            trend: "Efficiency Boost"
        },
        {
            icon: FaUserCheck,
            value: "60%",
            label: "Job Placement",
            description: "Graduates find relevant roles within 6 months of completing their learning path.",
            trend: "Within 6 Months"
        },
        {
            icon: FaBrain,
            value: "85%",
            label: "Retention Rate",
            description: "Active recall and spaced repetition techniques ensure you remember what you learn.",
            trend: "After 3 Months"
        }
    ];

    return (
        <section className="py-24 bg-dark relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Results That Matter</h2>
                    <p className="text-gray-400 text-lg">Real impact driven by AI-powered learning</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metrics.map((metric, index) => (
                        <MetricCard key={index} {...metric} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessMetrics;
