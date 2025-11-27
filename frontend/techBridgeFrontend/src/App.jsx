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
      </Routes>
    </Router>
  );
};

export default App;
