// src/components/Recommendations.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './../styles/global.css';

Chart.register(...registerables);

const Recommendations = ({ emotionData }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [combinedEmotion, setCombinedEmotion] = useState(null);

  useEffect(() => {
    if (emotionData) {
      analyzeCombinedEmotion();
      getRecommendations();
    }
  }, [emotionData]);

  const analyzeCombinedEmotion = () => {
    // Simple logic to combine results from different analysis methods
    const emotions = [];
    const confidences = [];
    
    if (emotionData.textAnalysis) {
      emotions.push(emotionData.textAnalysis.sentiment);
      confidences.push(emotionData.textAnalysis.confidence);
    }
    
    if (emotionData.speechAnalysis) {
      emotions.push(emotionData.speechAnalysis.emotion);
      confidences.push(emotionData.speechAnalysis.confidence);
    }
    
    if (emotionData.facialAnalysis) {
      emotions.push(emotionData.facialAnalysis.emotion);
      confidences.push(emotionData.facialAnalysis.confidence);
    }
    
    if (emotions.length === 0) return;
    
    // Find the most frequent emotion
    const emotionCount = {};
    emotions.forEach(emotion => {
      emotionCount[emotion] = (emotionCount[emotion] || 0) + 1;
    });
    
    let dominantEmotion = emotions[0];
    let maxCount = 1;
    
    for (const emotion in emotionCount) {
      if (emotionCount[emotion] > maxCount) {
        dominantEmotion = emotion;
        maxCount = emotionCount[emotion];
      }
    }
    
    // Calculate average confidence
    const avgConfidence = confidences.reduce((a, b) => a + b, 0) / confidences.length;
    
    setCombinedEmotion({
      emotion: dominantEmotion,
      confidence: avgConfidence
    });
  };

  const getRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call your backend API here
      // For demo purposes, we'll simulate an API call
      const response = await simulateRecommendationRequest();
      setRecommendations(response);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateRecommendationRequest = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const dominantEmotion = combinedEmotion?.emotion || 'neutral';
        const recommendations = [];
        
        if (dominantEmotion === 'happy') {
          recommendations.push(
            "Keep up the positive attitude! Consider journaling about what's making you happy.",
            "Share your happiness with others - it can strengthen your relationships.",
            "Practice gratitude by listing things you're thankful for."
          );
        } else if (dominantEmotion === 'sad') {
          recommendations.push(
            "Consider talking to a friend or loved one about how you're feeling.",
            "Engage in activities you usually enjoy, even if you don't feel like it initially.",
            "Practice self-compassion and remind yourself that it's okay to feel sad sometimes."
          );
        } else if (dominantEmotion === 'angry') {
          recommendations.push(
            "Try deep breathing exercises to calm your mind and body.",
            "Take a short walk to clear your mind before responding to situations.",
            "Identify the source of your anger and consider if it's something you can change or need to accept."
          );
        } else {
          recommendations.push(
            "Practice mindfulness to become more aware of your current emotional state.",
            "Engage in a creative activity to explore your emotions.",
            "Consider talking to a mental health professional for a more in-depth analysis."
          );
        }
        
        resolve(recommendations);
      }, 1500);
    });
  };

  const getEmotionDataForChart = () => {
    const data = {
      neutral: 0,
      happy: 0,
      sad: 0,
      angry: 0
    };
    
    if (emotionData.textAnalysis) {
      data[emotionData.textAnalysis.sentiment] += emotionData.textAnalysis.confidence;
    }
    
    if (emotionData.speechAnalysis) {
      data[emotionData.speechAnalysis.emotion] += emotionData.speechAnalysis.confidence;
    }
    
    if (emotionData.facialAnalysis) {
      data[emotionData.facialAnalysis.emotion] += emotionData.facialAnalysis.confidence;
    }
    
    return {
      labels: ['Neutral', 'Happy', 'Sad', 'Angry'],
      datasets: [{
        label: 'Emotion Distribution',
        data: [data.neutral, data.happy, data.sad, data.angry],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="recommendations-container"
    >
      <h2>Your Emotional Analysis Summary</h2>
      
      {combinedEmotion && (
        <div className="summary-section">
          <h3>Dominant Emotion: <span className={`emotion-${combinedEmotion.emotion}`}>{combinedEmotion.emotion}</span></h3>
          <p>Overall Confidence: {(combinedEmotion.confidence * 100).toFixed(1)}%</p>
        </div>
      )}
      
      <div className="chart-container">
        <Bar 
          data={getEmotionDataForChart()} 
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 3
              }
            }
          }} 
        />
      </div>
      
      <div className="recommendations-section">
        <h3>Personalized Recommendations</h3>
        
        {isLoading ? (
          <div className="loading-recommendations">
            <p>Generating personalized recommendations...</p>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <ul className="recommendations-list">
          {recommendations.map((rec, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`recommendation-item recommendation-${combinedEmotion?.emotion || 'neutral'}`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="recommendation-badge">
                {index + 1}
              </div>
              <div className="recommendation-content">
                <p>{rec}</p>
                <div className="recommendation-emotion">
                  <span className={`emotion-pill emotion-${combinedEmotion?.emotion || 'neutral'}`}>
                    {combinedEmotion?.emotion || 'neutral'}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
        )}
      </div>
    </motion.div>
  );
};

export default Recommendations;