import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaChartLine, FaUserGraduate, FaExclamationTriangle } from 'react-icons/fa';

const StatCard = ({ icon: Icon, end, suffix, text, inView }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
        <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-2xl">
            <Icon />
        </div>
        <div className="text-4xl md:text-5xl font-bold text-white mb-2">
            {inView ? <CountUp end={end} duration={2.5} /> : 0}
            {suffix}
        </div>
        <p className="text-gray-400 text-lg">{text}</p>
    </div>
);

const ProblemStats = () => {
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    return (
        <section className="py-20 bg-dark-light relative overflow-hidden" ref={ref}>
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">The Startup Skills Crisis</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Traditional learning methods aren't keeping up with the rapid pace of technological change in the startup ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard
                        icon={FaExclamationTriangle}
                        end={70}
                        suffix="%"
                        text="Startups need AI/Blockchain training"
                        inView={inView}
                    />
                    <StatCard
                        icon={FaChartLine}
                        end={15}
                        suffix="%"
                        text="Average course completion rate"
                        inView={inView}
                    />
                    <StatCard
                        icon={FaUserGraduate}
                        end={80}
                        suffix="%"
                        text="Employees struggle with generic training"
                        inView={inView}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProblemStats;
