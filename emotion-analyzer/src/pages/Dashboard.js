// // src/pages/Dashboard.jsx
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import TextAnalysis from '../components/TextAnalysis';
// import SpeechAnalysis from '../components/SpeechAnalysis';
// import FacialAnalysis from '../components/FacialAnalysis';
// import Recommendations from '../components/Recommendations';
// import './../styles/global.css';

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('text');
//   const [emotionData, setEmotionData] = useState(null);

//   const handleAnalysisComplete = (data) => {
//     setEmotionData(prev => ({
//       ...prev,
//       ...data
//     }));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="dashboard-container"
//     >
//       <div className="dashboard-header">
//         <h1>Emotion Analysis Dashboard</h1>
//         <p>Choose a method to analyze your emotions</p>
//       </div>

//       <div className="analysis-tabs">
//         <button 
//           className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
//           onClick={() => setActiveTab('text')}
//         >
//           Text Analysis
//         </button>
//         <button 
//           className={`tab-button ${activeTab === 'speech' ? 'active' : ''}`}
//           onClick={() => setActiveTab('speech')}
//         >
//           Voice Analysis
//         </button>
//         <button 
//           className={`tab-button ${activeTab === 'facial' ? 'active' : ''}`}
//           onClick={() => setActiveTab('facial')}
//         >
//           Facial Analysis
//         </button>
//       </div>

//       <div className="analysis-content">
//         {activeTab === 'text' && (
//           <motion.div
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <TextAnalysis onAnalysisComplete={handleAnalysisComplete} />
//           </motion.div>
//         )}
//         {activeTab === 'speech' && (
//           <motion.div
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <SpeechAnalysis onAnalysisComplete={handleAnalysisComplete} />
//           </motion.div>
//         )}
//         {activeTab === 'facial' && (
//           <motion.div
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <FacialAnalysis onAnalysisComplete={handleAnalysisComplete} />
//           </motion.div>
//         )}
//       </div>

//       {emotionData && (
//         <motion.div
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="results-section"
//         >
//           <Recommendations emotionData={emotionData} />
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default Dashboard;


// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TextAnalysis from '../components/TextAnalysis';
import SpeechAnalysis from '../components/SpeechAnalysis';
import FacialAnalysis from '../components/FacialAnalysis';
import Recommendations from '../components/Recommendations';
import './../styles/global.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faKeyboard, 
  faMicrophone, 
  faSmile 
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [emotionData, setEmotionData] = useState(null);

  const handleAnalysisComplete = (data) => {
    setEmotionData(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="dashboard-container"
    >
      <div className="dashboard-header">
        <h1>Emotion Analysis Dashboard</h1>
        <p>Choose a method to analyze your emotions</p>
      </div>


      <div className="analysis-tabs">
  <motion.button
    whileHover={{ scale: activeTab === 'text' ? 1 : 1.05 }}
    whileTap={{ scale: 0.98 }}
    className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
    onClick={() => setActiveTab('text')}
  >
    <FontAwesomeIcon icon={faKeyboard} style={{ marginRight: '0.5rem' }} />
    Text Analysis
  </motion.button>
  
  <motion.button
    whileHover={{ scale: activeTab === 'speech' ? 1 : 1.05 }}
    whileTap={{ scale: 0.98 }}
    className={`tab-button ${activeTab === 'speech' ? 'active' : ''}`}
    onClick={() => setActiveTab('speech')}
  >
    <FontAwesomeIcon icon={faMicrophone} style={{ marginRight: '0.5rem' }} />
    Voice Analysis
  </motion.button>
  
  <motion.button
    whileHover={{ scale: activeTab === 'facial' ? 1 : 1.05 }}
    whileTap={{ scale: 0.98 }}
    className={`tab-button ${activeTab === 'facial' ? 'active' : ''}`}
    onClick={() => setActiveTab('facial')}
  >
    <FontAwesomeIcon icon={faSmile} style={{ marginRight: '0.5rem' }} />
    Facial Analysis
  </motion.button>
</div>

      <div className="analysis-content">
        {activeTab === 'text' && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TextAnalysis onAnalysisComplete={handleAnalysisComplete} />
          </motion.div>
        )}
        {activeTab === 'speech' && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SpeechAnalysis onAnalysisComplete={handleAnalysisComplete} />
          </motion.div>
        )}
        {activeTab === 'facial' && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <FacialAnalysis onAnalysisComplete={handleAnalysisComplete} />
          </motion.div>
        )}
      </div>

      {emotionData && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="results-section"
        >
          <Recommendations emotionData={emotionData} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dashboard;