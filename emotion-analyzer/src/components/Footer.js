// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { 
  faHeart, 
  faEnvelope, 
  faShieldAlt,
  faFileAlt,
  faCodeBranch
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGithub, 
  faTwitter, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';
import './../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="footer-container"
    >
      <div className="footer-wave"></div>
      
      <div className="footer-content">
        <motion.div 
          className="footer-brand"
          variants={itemVariants}
        >
          <div className="logo">
            <span className="logo-icon">
            <FontAwesomeIcon icon={faBrain} className="brain-icon" />
            </span>
            <span className="logo-text">EmotionSense</span>
          </div>
          <p className="tagline">
            Harnessing AI to understand and improve mental wellbeing
          </p>
          
          <motion.div 
            className="social-links"
            variants={itemVariants}
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="footer-links"
          variants={itemVariants}
        >
          <div className="links-column">
            <h4>Product</h4>
            <ul>
              <li><a href="/features">Features</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/demo">Demo</a></li>
              <li><a href="/updates">Updates</a></li>
            </ul>
          </div>
          
          <div className="links-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/guides">Guides</a></li>
              <li><a href="/research">Research</a></li>
              <li><a href="/support">Help Center</a></li>
            </ul>
          </div>
          
          <div className="links-column">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/press">Press</a></li>
            </ul>
          </div>
          
          <div className="links-column">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="/privacy">
                  <FontAwesomeIcon icon={faShieldAlt} /> Privacy
                </a>
              </li>
              <li>
                <a href="/terms">
                  <FontAwesomeIcon icon={faFileAlt} /> Terms
                </a>
              </li>
              <li>
                <a href="/cookies">
                  <FontAwesomeIcon icon={faFileAlt} /> Cookies
                </a>
              </li>
              <li>
                <a href="/license">
                  <FontAwesomeIcon icon={faCodeBranch} /> License
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="footer-bottom"
        variants={itemVariants}
      >
        <div className="copyright">
          © {currentYear} EmotionSense AI. All rights reserved.
        </div>
        <div className="made-with-love">
          Made with <FontAwesomeIcon icon={faHeart} className="heart-icon" /> 
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;


// // src/components/Footer.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBrain } from '@fortawesome/free-solid-svg-icons';
// import { 
//   faHeart, 
//   faEnvelope, 
//   faShieldAlt,
//   faFileAlt,
//   faCodeBranch
// } from '@fortawesome/free-solid-svg-icons';
// import { 
//   faGithub, 
//   faTwitter, 
//   faLinkedin 
// } from '@fortawesome/free-brands-svg-icons';
// import './../styles/footer.css';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
  
//   const footerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delay: 0.3,
//         when: "beforeChildren",
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100
//       }
//     }
//   };


//   return (
//     <motion.footer
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ delay: 0.5 }}
//       className="footer-container"
//     >
//       <div className="footer-wave"></div>
//       <div className="footer-content">
//       <motion.div 
//           className="footer-brand"
//           variants={itemVariants}
//         >
//           <div className="logo">
//             <span className="logo-icon">
//             <FontAwesomeIcon icon={faBrain} className="brain-icon" />
//             </span>
//             <span className="logo-text">EmotionSense</span>
//           </div>
//           <p className="tagline">
//             Harnessing AI to understand and improve mental wellbeing
//           </p>
          
//           <motion.div 
//             className="social-links"
//             variants={itemVariants}
//           >
//             <a href="https://github.com" target="_blank" rel="noopener noreferrer">
//               <FontAwesomeIcon icon={faGithub} />
//             </a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//               <FontAwesomeIcon icon={faTwitter} />
//             </a>
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//               <FontAwesomeIcon icon={faLinkedin} />
//             </a>
//           </motion.div>
//         </motion.div>
        
//         <motion.div 
//           className="footer-links"
//           variants={itemVariants}
//         >
//           <div className="links-column">
//             <h4>Product</h4>
//             <ul>
//               <li><a href="/features">Features</a></li>
//               <li><a href="/pricing">Pricing</a></li>
//               <li><a href="/demo">Demo</a></li>
//               <li><a href="/updates">Updates</a></li>
//             </ul>
//           </div>
          
//           <div className="links-column">
//             <h4>Resources</h4>
//             <ul>
//               <li><a href="/blog">Blog</a></li>
//               <li><a href="/guides">Guides</a></li>
//               <li><a href="/research">Research</a></li>
//               <li><a href="/support">Help Center</a></li>
//             </ul>
//           </div>
          
//           <div className="links-column">
//             <h4>Company</h4>
//             <ul>
//               <li><a href="/about">About Us</a></li>
//               <li><a href="/careers">Careers</a></li>
//               <li><a href="/contact">Contact</a></li>
//               <li><a href="/press">Press</a></li>
//             </ul>
//           </div>
          
//           <div className="links-column">
//             <h4>Legal</h4>
//             <ul>
//               <li>
//                 <a href="/privacy">
//                   <FontAwesomeIcon icon={faShieldAlt} /> Privacy
//                 </a>
//               </li>
//               <li>
//                 <a href="/terms">
//                   <FontAwesomeIcon icon={faFileAlt} /> Terms
//                 </a>
//               </li>
//               <li>
//                 <a href="/cookies">
//                   <FontAwesomeIcon icon={faFileAlt} /> Cookies
//                 </a>
//               </li>
//               <li>
//                 <a href="/license">
//                   <FontAwesomeIcon icon={faCodeBranch} /> License
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </motion.div>
//       </div>
//       <div className="footer-bottom">
//         <div className="copyright">
//           © {new Date().getFullYear()} EmotionSense AI. All rights reserved.
//         </div>
//         <div className="made-with-love">
//           Made with <FontAwesomeIcon icon={faHeart} className="heart-icon" /> in San Francisco
//         </div>
//       </div>
//     </motion.footer>
//   );
// };

// export default Footer;