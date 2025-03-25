// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './../styles/global.css';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-container"
    >
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            AI-Powered Mental Health Analysis
          </motion.h1>
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Understand your emotions through text, voice, and facial expressions with our advanced AI analyzer.
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/dashboard" className="cta-button">
              Get Started
            </Link>
          </motion.div>
        </div>
        <div className="hero-image">
          {/* Placeholder for an animated illustration */}
          <div className="animated-illustration"></div>
        </div>
      </section>

      <section className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="feature-card"
          >
            <div className="feature-icon text-icon"></div>
            <h3>Text Analysis</h3>
            <p>Analyze emotions from written text using advanced NLP.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="feature-card"
          >
            <div className="feature-icon voice-icon"></div>
            <h3>Voice Analysis</h3>
            <p>Detect emotional tone from your voice recordings.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="feature-card"
          >
            <div className="feature-icon face-icon"></div>
            <h3>Facial Analysis</h3>
            <p>Recognize emotions through facial expressions.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="feature-card"
          >
            <div className="feature-icon ai-icon"></div>
            <h3>AI Recommendations</h3>
            <p>Get personalized mental health suggestions.</p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;