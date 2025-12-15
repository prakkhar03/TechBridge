import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaClipboardCheck, FaRoute, FaHandshake } from 'react-icons/fa';

const TimelineStep = ({ icon: Icon, title, description, index, isLast }) => {
    return (
        <div className="relative flex items-start gap-8 mb-16 last:mb-0">
            {/* Icon Circle */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30"
            >
                <Icon className="text-2xl text-white" />
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
                className="pt-2"
            >
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-lg max-w-xl">{description}</p>
            </motion.div>
        </div>
    );
};

const Timeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

    const steps = [
        {
            icon: FaClipboardCheck,
            title: "Step 1: Skill Assessment",
            description: "Take our comprehensive AI-driven quiz to identify your current strengths and skill gaps."
        },
        {
            icon: FaRoute,
            title: "Step 2: Personalized Path",
            description: "Our AI generates a custom learning roadmap tailored specifically to your goals and pace."
        },
        {
            icon: FaHandshake,
            title: "Step 3: Land Opportunities",
            description: "Get matched with internships and job opportunities that perfectly fit your new skill set."
        }
    ];

    return (
        <section id="timeline" className="py-24 bg-dark-light relative overflow-hidden" ref={containerRef}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
                    <p className="text-gray-400 text-lg">Your journey to success in three simple steps</p>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Connecting Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 h-full" />
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-8 top-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2 origin-top"
                    />

                    <div className="relative z-10">
                        {steps.map((step, index) => (
                            <TimelineStep
                                key={index}
                                {...step}
                                index={index}
                                isLast={index === steps.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
