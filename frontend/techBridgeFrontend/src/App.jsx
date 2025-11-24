import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemStats from './components/ProblemStats';
import Features from './components/Features';
import Timeline from './components/Timeline';
import SuccessMetrics from './components/SuccessMetrics';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-dark min-h-screen text-white font-sans">
      <Navbar />
      <Hero />
      <ProblemStats />
      <Features />
      <Timeline />
      <SuccessMetrics />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;
