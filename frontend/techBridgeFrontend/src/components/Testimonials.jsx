import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Product Manager",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "Tech Bridge helped me transition from marketing to product management in just 4 months! The personalized path was a game changer."
    },
    {
        name: "Rahul Verma",
        role: "Full Stack Developer",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "The AI personalization is incredible. It knew exactly what I needed to learn next and skipped what I already knew."
    },
    {
        name: "Anjali Reddy",
        role: "CTO at FinTech Startup",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        text: "We trained our entire team of 20 in blockchain basics within 2 months. The ROI has been phenomenal for our startup."
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="py-24 bg-dark-light relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Success Stories</h2>
                    <p className="text-gray-400 text-lg">Join thousands of learners transforming their careers</p>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden md:block">
                        <button
                            onClick={prevSlide}
                            className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110"
                        >
                            <FaChevronLeft />
                        </button>
                    </div>

                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden md:block">
                        <button
                            onClick={nextSlide}
                            className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110"
                        >
                            <FaChevronRight />
                        </button>
                    </div>

                    <div className="h-[400px] md:h-[300px] relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 h-full flex flex-col md:flex-row items-center gap-8">
                                    <div className="flex-shrink-0">
                                        <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary to-accent">
                                            <img
                                                src={testimonials[currentIndex].image}
                                                alt={testimonials[currentIndex].name}
                                                className="w-full h-full rounded-full object-cover border-4 border-dark"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 text-center md:text-left">
                                        <FaQuoteLeft className="text-4xl text-primary/30 mb-4 mx-auto md:mx-0" />
                                        <p className="text-xl md:text-2xl text-white italic mb-6 leading-relaxed">
                                            "{testimonials[currentIndex].text}"
                                        </p>
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h4>
                                            <p className="text-primary">{testimonials[currentIndex].role}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-primary w-8" : "bg-white/20 hover:bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
