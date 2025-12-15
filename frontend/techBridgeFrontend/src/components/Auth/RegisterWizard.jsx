import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaUserGraduate, FaBuilding, FaCheck, FaUser, FaEnvelope, FaLock,
    FaEye, FaEyeSlash, FaPhone, FaBriefcase, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

const RegisterWizard = ({ onSwitchToLogin }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        role: '', // 'student' or 'client'
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        companyName: '',
        designation: '',
        learningGoal: '',
        experienceLevel: '',
        interests: [],
        companySize: '',
        industry: '',
        employeesToTrain: '',
        trainingGoals: []
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        // Add validation logic here
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsLoading(false);
        // Handle success (e.g., show success message, redirect)
    };

    // Step 1: Role Selection
    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Choose Your Path</h2>
                <p className="text-gray-400">How will you use Tech Bridge?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['student', 'client'].map((role) => (
                    <motion.div
                        key={role}
                        whileHover={{ scale: 1.02, translateY: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            updateFormData('role', role);
                            setTimeout(handleNext, 300);
                        }}
                        className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${formData.role === role
                                ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20'
                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${formData.role === role ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'
                            }`}>
                            {role === 'student' ? <FaUserGraduate className="text-xl" /> : <FaBuilding className="text-xl" />}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 capitalize">
                            {role === 'student' ? 'Student / Individual' : 'Client / Startup'}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            {role === 'student'
                                ? 'Learn new skills and advance your career'
                                : 'Train your team with custom programs'}
                        </p>
                        <ul className="space-y-2">
                            {(role === 'student'
                                ? ['Personalized learning', 'Job matching', 'Certificates']
                                : ['Team analytics', 'Custom content', 'Bulk licenses']
                            ).map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                                    <FaCheck className="text-green-400" /> {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    // Step 2: Basic Info
    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Basic Information</h2>
                <p className="text-gray-400">Let's get to know you</p>
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) => updateFormData('fullName', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary focus:outline-none transition-colors"
                    />
                </div>
                <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary focus:outline-none transition-colors"
                    />
                </div>
                <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white focus:border-primary focus:outline-none transition-colors"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {formData.role === 'client' && (
                    <>
                        <div className="relative">
                            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) => updateFormData('phone', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="relative">
                            <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Company Name"
                                value={formData.companyName}
                                onChange={(e) => updateFormData('companyName', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    // Step 3: Additional Details
    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Tell Us More</h2>
                <p className="text-gray-400">Help us personalize your experience</p>
            </div>

            {formData.role === 'student' ? (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Primary Learning Goal</label>
                        <select
                            value={formData.learningGoal}
                            onChange={(e) => updateFormData('learningGoal', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary focus:outline-none [&>option]:bg-dark"
                        >
                            <option value="">Select a goal</option>
                            <option value="career_switch">Career Switch</option>
                            <option value="skill_upgrade">Skill Upgrade</option>
                            <option value="freelancing">Start Freelancing</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => updateFormData('experienceLevel', level)}
                                    className={`p-2 rounded-lg border text-sm transition-all ${formData.experienceLevel === level
                                            ? 'bg-primary/20 border-primary text-white'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Company Size</label>
                        <select
                            value={formData.companySize}
                            onChange={(e) => updateFormData('companySize', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary focus:outline-none [&>option]:bg-dark"
                        >
                            <option value="">Select size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="200+">200+ employees</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );

    // Step 4: Confirmation
    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Almost There!</h2>
                <p className="text-gray-400">Review and confirm your information</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 space-y-4 border border-white/10">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <div>
                        <p className="text-xs text-gray-400 uppercase">Account Type</p>
                        <p className="text-white font-medium capitalize">{formData.role}</p>
                    </div>
                    <button onClick={() => setStep(1)} className="text-primary text-sm hover:underline">Edit</button>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <div>
                        <p className="text-xs text-gray-400 uppercase">Name</p>
                        <p className="text-white font-medium">{formData.fullName}</p>
                    </div>
                    <button onClick={() => setStep(2)} className="text-primary text-sm hover:underline">Edit</button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-xs text-gray-400 uppercase">Email</p>
                        <p className="text-white font-medium">{formData.email}</p>
                    </div>
                    <button onClick={() => setStep(2)} className="text-primary text-sm hover:underline">Edit</button>
                </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-5 h-5 border-2 border-gray-500 rounded peer-checked:bg-primary peer-checked:border-primary transition-colors" />
                    <FaCheck className="absolute left-0.5 top-0.5 text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </span>
            </label>
        </div>
    );

    return (
        <div className="w-full">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10" />
                {[1, 2, 3, 4].map((s) => (
                    <div
                        key={s}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= s ? 'bg-primary text-white' : 'bg-dark border-2 border-white/10 text-gray-500'
                            }`}
                    >
                        {step > s ? <FaCheck /> : s}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                    {step === 4 && renderStep4()}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {step > 1 && (
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={handleBack}
                        className="flex-1 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                    >
                        <FaChevronLeft /> Back
                    </button>
                    <button
                        onClick={step === 4 ? handleSubmit : handleNext}
                        disabled={isLoading}
                        className="flex-1 py-3 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold transition-all hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                {step === 4 ? 'Create Account' : 'Next'} <FaChevronRight />
                            </>
                        )}
                    </button>
                </div>
            )}

            <p className="mt-8 text-center text-gray-400 text-sm">
                Already have an account?{' '}
                <button
                    onClick={onSwitchToLogin}
                    className="text-primary hover:text-blue-400 font-medium transition-colors"
                >
                    Login
                </button>
            </p>
        </div>
    );
};

export default RegisterWizard;
