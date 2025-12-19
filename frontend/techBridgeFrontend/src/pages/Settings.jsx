import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaShieldAlt, FaCheck, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../api';

// Moved OUTSIDE of Settings component to prevent re-creation on every render
const SettingSection = ({ icon: Icon, title, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6"
    >
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <Icon className="text-lg" />
            </div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        {children}
    </motion.div>
);

const Settings = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Name change state
    const [fullName, setFullName] = useState('');

    // Password change state
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(storedUser);
        setFullName(storedUser.profile?.full_name || '');
    }, []);

    const handleNameChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await api.patch('accounts/profile/', {
                full_name: fullName
            });

            // Update localStorage
            const updatedUser = { ...user, profile: { ...user.profile, full_name: fullName } };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            setSuccess('Name updated successfully!');
        } catch (err) {
            console.error('Failed to update name:', err);
            setError(err.response?.data?.detail || 'Failed to update name. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('New passwords do not match.');
            setLoading(false);
            return;
        }

        if (passwords.newPassword.length < 6) {
            setError('Password must be at least 6 characters.');
            setLoading(false);
            return;
        }

        try {
            await api.post('accounts/change-password/', {
                current_password: passwords.currentPassword,
                new_password: passwords.newPassword
            });

            setSuccess('Password changed successfully!');
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            console.error('Failed to change password:', err);
            setError(err.response?.data?.detail || err.response?.data?.message || 'Failed to change password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-gray-400">Manage your account preferences</p>
                </div>

                {/* Success/Error Messages */}
                {success && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
                        <FaCheck /> {success}
                    </div>
                )}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                {/* Change Name Section */}
                <SettingSection icon={FaUser} title="Change Name">
                    <form onSubmit={handleNameChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full bg-dark border border-white/20 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !fullName.trim()}
                            className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                            Save Name
                        </button>
                    </form>
                </SettingSection>

                {/* Change Password Section */}
                <SettingSection icon={FaLock} title="Change Password">
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                            <input
                                type={showPasswords.current ? "text" : "password"}
                                value={passwords.currentPassword}
                                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                placeholder="Enter current password"
                                className="w-full bg-dark border border-white/20 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                className="absolute right-4 top-10 text-gray-400 hover:text-white"
                            >
                                {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                            <input
                                type={showPasswords.new ? "text" : "password"}
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                placeholder="Enter new password"
                                className="w-full bg-dark border border-white/20 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                className="absolute right-4 top-10 text-gray-400 hover:text-white"
                            >
                                {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                            <input
                                type={showPasswords.confirm ? "text" : "password"}
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                placeholder="Confirm new password"
                                className="w-full bg-dark border border-white/20 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                className="absolute right-4 top-10 text-gray-400 hover:text-white"
                            >
                                {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword}
                            className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : <FaLock />}
                            Change Password
                        </button>
                    </form>
                </SettingSection>

                {/* Two-Factor Authentication Section (Dummy) */}
                <SettingSection icon={FaShieldAlt} title="Two-Factor Authentication">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-300 mb-1">Secure your account with 2FA</p>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <button
                            onClick={() => alert('2FA feature coming soon!')}
                            className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
                        >
                            Enable 2FA
                        </button>
                    </div>
                </SettingSection>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
