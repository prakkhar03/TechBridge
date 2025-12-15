import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PricingCard = ({ plan, price, features, isPopular, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className={`relative p-8 rounded-2xl border transition-all duration-300 ${isPopular
                ? "bg-gradient-to-b from-primary/10 to-secondary/10 border-primary shadow-2xl shadow-primary/20 scale-105 z-10"
                : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    MOST POPULAR
                </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{plan}</h3>
            <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">{price}</span>
                {price !== "Free" && <span className="text-gray-400 ml-2">/month</span>}
            </div>

            <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                        {feature.included ? (
                            <FaCheck className="text-green-400 flex-shrink-0" />
                        ) : (
                            <FaTimes className="text-gray-600 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-gray-200" : "text-gray-500"}>
                            {feature.text}
                        </span>
                    </li>
                ))}
            </ul>

            <button
                className={`w-full py-3 rounded-full font-bold transition-all ${isPopular
                    ? "bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/25"
                    : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
            >
                {isPopular ? "Start Free Trial" : "Get Started"}
            </button>
        </motion.div>
    );
};

const Pricing = () => {
    const plans = [
        {
            plan: "Free Plan",
            price: "₹0",
            features: [
                { text: "Basic courses", included: true },
                { text: "Community access", included: true },
                { text: "Progress tracking", included: true },
                { text: "Limited AI features", included: true },
                { text: "Job matching", included: false },
                { text: "Certificates", included: false },
            ],
            isPopular: false,
            delay: 0
        },
        {
            plan: "Premium Plan",
            price: "₹999",
            features: [
                { text: "All Free features", included: true },
                { text: "Full AI personalization", included: true },
                { text: "24/7 AI support", included: true },
                { text: "Certificates", included: true },
                { text: "Job matching", included: true },
                { text: "Priority support", included: true },
            ],
            isPopular: true,
            delay: 0.2
        },
        {
            plan: "Startup Plan",
            price: "₹5,999",
            features: [
                { text: "All Premium features", included: true },
                { text: "Team analytics", included: true },
                { text: "Custom content", included: true },
                { text: "Admin dashboard", included: true },
                { text: "Bulk licenses", included: true },
                { text: "Dedicated manager", included: true },
            ],
            isPopular: false,
            delay: 0.4
        }
    ];

    return (
        <section id="pricing" className="py-24 bg-dark relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
                    <p className="text-gray-400 text-lg">Invest in your future with plans designed for every stage</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} {...plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
