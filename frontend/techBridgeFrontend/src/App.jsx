import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemStats from './components/ProblemStats';
import Features from './components/Features';
import Timeline from './components/Timeline';
import SuccessMetrics from './components/SuccessMetrics';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Auth from './pages/Auth';
import StudentDashboard from './pages/StudentDashboard';
import Assessment from './pages/Assessment';
import Settings from './pages/Settings';
import ProgressAnalytics from './pages/ProgressAnalytics';
import LearningPath from './pages/LearningPath';

const LandingPage = () => (
  <>
    <Navbar />
    <Hero />
    <ProblemStats />
    <Features />
    <Timeline />
    <SuccessMetrics />
    <Testimonials />
    <Pricing />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<ProgressAnalytics />} />
        <Route path="/learning-path" element={<LearningPath />} />
      </Routes>
    </Router>
  );
};

export default App;
