import React from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark-light pt-20 pb-10 relative overflow-hidden">
            {/* CTA Banner */}
            <div className="container mx-auto px-6 mb-20 relative z-10">
                <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your Career?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Join 10,000+ learners already upskilling with Tech Bridge
                        </p>
                        <button className="px-8 py-4 bg-white text-primary font-bold rounded-full text-lg hover:bg-gray-100 transition-colors shadow-lg">
                            Start Your Free Journey
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Tech Bridge</h3>
                        <p className="text-gray-400 mb-6">
                            Empowering the next generation of tech leaders with AI-driven personalized learning.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors">
                                <FaLinkedin />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Product</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">For Startups</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Success Stories</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Resources</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Community</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Help Center</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Stay Updated</h4>
                        <p className="text-gray-400 mb-4">Get the latest insights and trends directly in your inbox.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary w-full"
                            />
                            <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2025 Tech Bridge. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
