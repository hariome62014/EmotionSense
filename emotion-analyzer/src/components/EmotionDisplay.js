// // src/components/EmotionDisplay.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import './../styles/global.css';

// const EmotionDisplay = ({ emotion, confidence }) => {
//   const getEmotionColor = () => {
//     switch (emotion) {
//       case 'happy':
//         return '#4CAF50';
//       case 'sad':
//         return '#2196F3';
//       case 'angry':
//         return '#F44336';
//       case 'surprised':
//         return '#FFC107';
//       default:
//         return '#9E9E9E';
//     }
//   };

//   const getEmotionIcon = () => {
//     switch (emotion) {
//       case 'happy':
//         return '😊';
//       case 'sad':
//         return '😢';
//       case 'angry':
//         return '😠';
//       case 'surprised':
//         return '😲';
//       default:
//         return '😐';
//     }
//   };

//   return (
//     <motion.div 
//       className="emotion-display"
//       initial={{ scale: 0.8, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//     >
//       <div 
//         className="emotion-circle"
//         style={{ backgroundColor: getEmotionColor() }}
//       >
//         <span className="emotion-icon">{getEmotionIcon()}</span>
//       </div>
//       <div className="confidence-meter">
//         <div 
//           className="confidence-fill"
//           style={{ 
//             width: `${confidence * 100}%`,
//             backgroundColor: getEmotionColor()
//           }}
//         ></div>
//       </div>
//     </motion.div>
//   );
// };

// export default EmotionDisplay;


// src/components/EmotionDisplay.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './../styles/global.css';

const EmotionDisplay = ({ emotion, confidence }) => {
  const getEmotionColor = () => {
    return `var(--${emotion}-color)`;
  };

  const getEmotionIcon = () => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'angry': return '😠';
      case 'surprised': return '😲';
      default: return '😐';
    }
  };

  return (
    <motion.div 
      className="emotion-display"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div 
        className="emotion-circle"
        style={{ 
          backgroundColor: getEmotionColor(),
          boxShadow: `0 5px 20px ${getEmotionColor()}40`
        }}
      >
        <span className="emotion-icon">{getEmotionIcon()}</span>
      </div>
      <div className="confidence-meter">
        <div 
          className="confidence-fill"
          style={{ 
            width: `${confidence * 100}%`,
            background: `linear-gradient(90deg, ${getEmotionColor()}, ${getEmotionColor()}cc)`
          }}
        ></div>
      </div>
    </motion.div>
  );
};

export default EmotionDisplay;