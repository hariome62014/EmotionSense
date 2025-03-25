// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBrain, 
  faHome, 
  faChartLine, 
  faSun, 
  faMoon 
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../contexts/ThemeContext';
import './../styles/global.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="navbar"
    >
      <div className="navbar-container">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="logo-container"
        >
          <Link to="/" className="logo">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="brain-icon-container"
            >
              <FontAwesomeIcon 
                icon={faBrain} 
                className="brain-icon" 
              />
            </motion.div>
            <span className="logo-text">EmotionSense</span>
            {/* <span className="logo-beta">AI</span> */}
          </Link>
        </motion.div>
        
        <div className="nav-links">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="nav-link-container"
          >
            <Link to="/" className="nav-link">
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="nav-link-container"
          >
            <Link to="/dashboard" className="nav-link">
              <FontAwesomeIcon icon={faChartLine} />
              <span>Dashboard</span>
            </Link>
          </motion.div>
          
          <motion.button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: 'rgba(255,255,255,0.2)'
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              key={theme}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="theme-icon-container"
            >
              <FontAwesomeIcon 
                icon={theme === 'light' ? faMoon : faSun} 
                className="theme-icon"
              />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;