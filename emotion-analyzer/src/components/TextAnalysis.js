// // src/components/TextAnalysis.jsx
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import LoadingSpinner from './LoadingSpinner';
// import EmotionDisplay from './EmotionDisplay';
// import axios from 'axios';
// import './../styles/global.css';

// const TextAnalysis = ({ onAnalysisComplete }) => {
//   const [text, setText] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const analyzeText = async () => {
//     if (!text.trim()) {
//       setError('Please enter some text to analyze');
//       return;
//     }

//     setIsAnalyzing(true);
//     setError(null);

//     try {
//       // In a real app, you would call your backend API here
//       // For demo purposes, we'll simulate an API call
//       const response = await simulateTextAnalysis(text);
      
//       setResult(response);
//       onAnalysisComplete({ textAnalysis: response });
//     } catch (err) {
//       setError('Failed to analyze text. Please try again.');
//       console.error(err);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const simulateTextAnalysis = async (text) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         // Mock analysis based on keywords
//         const lowerText = text.toLowerCase();
//         let sentiment = 'neutral';
//         let confidence = 0.7;
        
//         if (lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('awesome')) {
//           sentiment = 'happy';
//           confidence = 0.9;
//         } else if (lowerText.includes('sad') || lowerText.includes('depressed') || lowerText.includes('unhappy')) {
//           sentiment = 'sad';
//           confidence = 0.85;
//         } else if (lowerText.includes('angry') || lowerText.includes('mad') || lowerText.includes('frustrated')) {
//           sentiment = 'angry';
//           confidence = 0.8;
//         }
        
//         resolve({
//           sentiment,
//           confidence,
//           text: text,
//           type: 'text'
//         });
//       }, 1500);
//     });
//   };

//   return (
//     <div className="analysis-container">
//       <h2>Text Emotion Analysis</h2>
//       <p>Enter your text below to analyze the emotional sentiment</p>
      
//       <div className="input-group">
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="How are you feeling today?"
//           rows="5"
//         />
//       </div>
      
//       {error && <div className="error-message">{error}</div>}
      
//       <motion.button
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//         onClick={analyzeText}
//         disabled={isAnalyzing}
//         className="analyze-button"
//       >
//         {isAnalyzing ? <LoadingSpinner size="small" /> : 'Analyze Text'}
//       </motion.button>
      
//       {result && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="result-container"
//         >
//           <h3>Analysis Result</h3>
//           <EmotionDisplay emotion={result.sentiment} confidence={result.confidence} />
//           <div className="result-text">
//             <p>Detected Emotion: <strong>{result.sentiment}</strong></p>
//             <p>Confidence: <strong>{(result.confidence * 100).toFixed(1)}%</strong></p>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default TextAnalysis;



// src/components/TextAnalysis.jsx
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import LoadingSpinner from './LoadingSpinner';
// import EmotionDisplay from './EmotionDisplay';
// import './../styles/global.css';

// const TextAnalysis = ({ onAnalysisComplete }) => {
//   const [text, setText] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const analyzeText = async () => {
//     if (!text.trim()) {
//       setError('Please enter some text to analyze');
//       return;
//     }

//     setIsAnalyzing(true);
//     setError(null);

//     try {
//       // Simulate API call
//       const response = await simulateTextAnalysis(text);
//       setResult(response);
//       onAnalysisComplete({ textAnalysis: response });
//     } catch (err) {
//       setError('Failed to analyze text. Please try again.');
//       console.error(err);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };


//     const simulateTextAnalysis = async (text) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         // Mock analysis based on keywords
//         const lowerText = text.toLowerCase();
//         let sentiment = 'neutral';
//         let confidence = 0.7;
        
//         if (lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('awesome')) {
//           sentiment = 'happy';
//           confidence = 0.9;
//         } else if (lowerText.includes('sad') || lowerText.includes('depressed') || lowerText.includes('unhappy')) {
//           sentiment = 'sad';
//           confidence = 0.85;
//         } else if (lowerText.includes('angry') || lowerText.includes('mad') || lowerText.includes('frustrated')) {
//           sentiment = 'angry';
//           confidence = 0.8;
//         }
        
//         resolve({
//           sentiment,
//           confidence,
//           text: text,
//           type: 'text'
//         });
//       }, 1500);
//     });
//   };

//   return (
//     <div className="analysis-container">
//       <h2>Text Emotion Analysis</h2>
//       <p>Enter your text below to analyze the emotional sentiment</p>
      
//       <div className="input-group">
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="How are you feeling today?"
//           rows="5"
//         />
//       </div>
      
//       {error && <div className="error-message">{error}</div>}
      
//       <motion.button
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//         onClick={analyzeText}
//         disabled={isAnalyzing}
//         className="analyze-button"
//       >
//         {isAnalyzing ? <LoadingSpinner size="small" /> : 'Analyze Text'}
//       </motion.button>
      
//       {result && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="result-container"
//         >
//           <h3>Analysis Result</h3>
//           <EmotionDisplay emotion={result.sentiment} confidence={result.confidence} />
//           <div className="result-text">
//             <p>Detected Emotion: <strong>{result.sentiment}</strong></p>
//             <p>Confidence: <strong>{(result.confidence * 100).toFixed(1)}%</strong></p>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );



// };

// export default TextAnalysis;




// src/components/TextAnalysis.jsx
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import LoadingSpinner from './LoadingSpinner';
// import EmotionDisplay from './EmotionDisplay';
// import './../styles/global.css';

// const TextAnalysis = ({ onAnalysisComplete }) => {
//    const [text, setText] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const analyzeText = async () => {
//     if (!text.trim()) {
//       setError('Please enter some text to analyze');
//       return;
//     }

//     setIsAnalyzing(true);
//     setError(null);

//     try {
//       // Simulate API call
//       const response = await simulateTextAnalysis(text);
//       setResult(response);
//       onAnalysisComplete({ textAnalysis: response });
//     } catch (err) {
//       setError('Failed to analyze text. Please try again.');
//       console.error(err);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };


//     const simulateTextAnalysis = async (text) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         // Mock analysis based on keywords
//         const lowerText = text.toLowerCase();
//         let sentiment = 'neutral';
//         let confidence = 0.7;
        
//         if (lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('awesome')) {
//           sentiment = 'happy';
//           confidence = 0.9;
//         } else if (lowerText.includes('sad') || lowerText.includes('depressed') || lowerText.includes('unhappy')) {
//           sentiment = 'sad';
//           confidence = 0.85;
//         } else if (lowerText.includes('angry') || lowerText.includes('mad') || lowerText.includes('frustrated')) {
//           sentiment = 'angry';
//           confidence = 0.8;
//         }
        
//         resolve({
//           sentiment,
//           confidence,
//           text: text,
//           type: 'text'
//         });
//       }, 1500);
//     });
//   };

//   return (
//     <div className="analysis-container">
//       <h2>Text Emotion Analysis</h2>
//       <p>Enter your text below to analyze the emotional sentiment</p>
      
//       <div className="input-group">
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="How are you feeling today?"
//           rows="5"
//         />
//       </div>
      
//       {error && <div className="error-message">{error}</div>}
      
//       <motion.button
//         whileHover={{ scale: 1.03 }}
//         whileTap={{ scale: 0.98 }}
//         onClick={analyzeText}
//         disabled={isAnalyzing}
//         className="cta-button"
//       >
//         {isAnalyzing ? (
//           <>
//             <LoadingSpinner size="small" />
//             Analyzing...
//           </>
//         ) : (
//           'Analyze Text'
//         )}
//       </motion.button>
      
//       {result && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="result-container"
//         >
//           <div className="result-header">
//             <h3 className="result-title">Analysis Result</h3>
//             <div className="result-confidence">
//               Confidence: {(result.confidence * 100).toFixed(1)}%
//             </div>
//           </div>
          
//           <EmotionDisplay emotion={result.sentiment} confidence={result.confidence} />
          
//           <div className="confidence-meter">
//             <div 
//               className="confidence-fill"
//               style={{ width: `${result.confidence * 100}%` }}
//             ></div>
//           </div>
          
//           <div className="result-details">
//             <div className={`result-detail-card result-${result.sentiment}`}>
//               <div className="detail-title">Detected Emotion</div>
//               <div className="detail-value" style={{ 
//                 color: `var(--${result.sentiment}-color)` 
//               }}>
//                 {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
//               </div>
//             </div>
            
//             <div className="result-detail-card">
//               <div className="detail-title">Text Analyzed</div>
//               <div className="detail-value" style={{ fontStyle: 'italic' }}>
//                 "{result.text}"
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default TextAnalysis;



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import EmotionDisplay from './EmotionDisplay';
import './../styles/global.css';

const TextAnalysis = ({ onAnalysisComplete }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeText = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/analyze-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze text');
      }

      const data = await response.json();
      
      // Transform Azure response to match our expected format
      const transformedResult = {
        sentiment: data.sentiment.toLowerCase(),
        confidence: data.confidenceScores[data.sentiment.toLowerCase()],
        confidenceScores: data.confidenceScores,
        text: text,
        type: 'text'
      };

      setResult(transformedResult);
      onAnalysisComplete({ textAnalysis: transformedResult });

    } catch (err) {
      console.error('Analysis error:', err);
      
      let errorMessage = 'Failed to analyze text';
      
      if (err.message.includes('Invalid API key')) {
        errorMessage = 'Service configuration error - please contact support';
      } else if (err.message.includes('Azure resource not found')) {
        errorMessage = 'Service unavailable - please try again later';
      } else if (err.message.includes('Too many requests')) {
        errorMessage = 'Service busy - please wait a moment and try again';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentColor = (sentiment) => {
    switch(sentiment) {
      case 'positive': return 'var(--happy-color)';
      case 'negative': return 'var(--sad-color)';
      case 'neutral': return 'var(--neutral-color)';
      default: return 'var(--neutral-color)';
    }
  };

  const formatSentiment = (sentiment) => {
    return sentiment.charAt(0).toUpperCase() + sentiment.slice(1);
  };

  return (
    <div className="analysis-container">
      <h2>Text Emotion Analysis</h2>
      <p>Enter your text below to analyze the emotional sentiment</p>
      
      <div className="input-group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How are you feeling today?"
          rows="5"
        />
      </div>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="error-message"
        >
          {error}
        </motion.div>
      )}
      
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={analyzeText}
        disabled={isAnalyzing}
        className="cta-button"
      >
        {isAnalyzing ? (
          <>
            <LoadingSpinner size="small" />
            Analyzing...
          </>
        ) : (
          'Analyze Text'
        )}
      </motion.button>
      
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="result-container"
        >
          <div className="result-header">
            <h3 className="result-title">Analysis Result</h3>
            <div className="result-confidence">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </div>
          </div>
          
          <EmotionDisplay 
            emotion={result.sentiment} 
            confidence={result.confidence} 
          />
          
          <div className="confidence-meter">
            <div 
              className="confidence-fill"
              style={{ width: `${result.confidence * 100}%` }}
            ></div>
          </div>
          
          <div className="result-details">
            <div className={`result-detail-card result-${result.sentiment}`}>
              <div className="detail-title">Detected Emotion</div>
              <div className="detail-value" style={{ 
                color: getSentimentColor(result.sentiment)
              }}>
                {formatSentiment(result.sentiment)}
              </div>
            </div>
            
            <div className="result-detail-card">
              <div className="detail-title">Text Analyzed</div>
              <div className="detail-value" style={{ fontStyle: 'italic' }}>
                "{result.text}"
              </div>
            </div>
            
            <div className="result-detail-card">
              <div className="detail-title">Detailed Scores</div>
              <div className="detail-value">
                Positive: {(result.confidenceScores.positive * 100).toFixed(1)}%<br />
                Neutral: {(result.confidenceScores.neutral * 100).toFixed(1)}%<br />
                Negative: {(result.confidenceScores.negative * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TextAnalysis;