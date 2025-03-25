// src/components/LoadingSpinner.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './../styles/global.css';

const LoadingSpinner = ({ size = 'medium' }) => {
  return (
    <motion.div 
      className={`loading-spinner ${size}`}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    >
      <div className="spinner-circle"></div>
    </motion.div>
  );
};

export default LoadingSpinner;