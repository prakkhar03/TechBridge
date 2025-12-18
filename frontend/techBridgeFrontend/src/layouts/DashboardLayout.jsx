import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    FaHome, FaClipboardList, FaRoute, FaChartLine,
    FaBriefcase, FaCog, FaSignOutAlt, FaBars, FaTimes
} from 'react-icons/fa';

const SidebarItem = ({ icon: Icon, label, to, active, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active
            ? 'bg-primary text-white shadow-lg shadow-primary/25'
            : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
    >
        <Icon className={`text-lg ${active ? 'text-white' : 'group-hover:text-white'}`} />
        <span className="font-medium">{label}</span>
        {active && (
            <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
            />
        )}
    </Link>
);

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const fullName = user.profile?.full_name || user.email?.split('@')[0] || 'User';
    const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';
    const role = user.role || 'student';

    const menuItems = [
        { icon: FaHome, label: 'Dashboard', to: '/dashboard' },
        { icon: FaClipboardList, label: 'Skill Assessment', to: '/assessment' },
        { icon: FaRoute, label: 'My Learning Path', to: '/learning-path' },
        { icon: FaChartLine, label: 'Progress Analytics', to: '/analytics' },
        { icon: FaBriefcase, label: 'Opportunities', to: '/opportunities' },
        { icon: FaCog, label: 'Settings', to: '/settings' },
    ];

    const handleLogout = () => {
        // Clear auth tokens and user data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        navigate('/auth');
    };

    return (
        <div className="min-h-screen bg-dark text-white flex">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-dark border-r border-white/10 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                        <span className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white text-sm">TB</span>
                        Tech Bridge
                    </Link>
                </div>

                {/* User Profile */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-sm font-bold">
                            {initials}
                        </div>
                        <div>
                            <h3 className="font-medium text-sm">{fullName}</h3>
                            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 capitalize">
                                {role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.to}
                            {...item}
                            active={location.pathname === item.to}
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                        <FaSignOutAlt />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden h-16 border-b border-white/10 flex items-center justify-between px-4 bg-dark/80 backdrop-blur-md sticky top-0 z-30">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-white p-2"
                    >
                        <FaBars className="text-xl" />
                    </button>
                    <span className="font-bold">Tech Bridge</span>
                    <div className="w-8" /> {/* Spacer for centering */}
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
