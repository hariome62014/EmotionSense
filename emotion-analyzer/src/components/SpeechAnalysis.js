// src/components/SpeechAnalysis.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import EmotionDisplay from './EmotionDisplay';
import axios from 'axios';
import './../styles/global.css';

const SpeechAnalysis = ({ onAnalysisComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder]);

  const startRecording = async () => {
    setError(null);
    setResult(null);
    setTranscript('');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];
      
      recorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };
      
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        analyzeAudio(audioBlob);
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      
      // Auto-stop after 10 seconds
      setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
          stream.getTracks().forEach(track => track.stop());
          setIsRecording(false);
        }
      }, 10000);
    } catch (err) {
      setError('Could not access microphone. Please check permissions.');
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const analyzeAudio = async (blob) => {
    setIsRecording(false);
    setError(null);
    
    try {
      // In a real app, you would upload the blob to your backend API
      // For demo purposes, we'll simulate an API call
      const response = await simulateSpeechAnalysis();
      
      setResult(response);
      setTranscript(response.transcript);
      onAnalysisComplete({ speechAnalysis: response });
    } catch (err) {
      setError('Failed to analyze speech. Please try again.');
      console.error(err);
    }
  };

  const simulateSpeechAnalysis = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock analysis with random emotion
        const emotions = ['happy', 'sad', 'angry', 'neutral'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        const confidence = 0.7 + Math.random() * 0.3; // Between 0.7 and 1.0
        
        resolve({
          emotion: randomEmotion,
          confidence,
          transcript: "This is a simulated transcript of what you said.",
          type: 'speech'
        });
      }, 2000);
    });
  };

  return (
    <div className="analysis-container">
      <h2>Voice Emotion Analysis</h2>
      <p>Record your voice to analyze emotional tone</p>
      
      <div className="recording-controls">
        {isRecording ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={stopRecording}
            className="stop-button"
          >
            Stop Recording
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startRecording}
            disabled={isRecording}
            className="record-button"
          >
            Start Recording
          </motion.button>
        )}
        
        {isRecording && (
          <div className="recording-indicator">
            <div className="pulse-animation"></div>
            <span>Recording... (10s max)</span>
          </div>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="result-container"
        >
          <h3>Analysis Result</h3>
          <div className="transcript">
            <p><strong>Transcript:</strong> {transcript}</p>
          </div>
          <EmotionDisplay emotion={result.emotion} confidence={result.confidence} />
          <div className="result-text">
            <p>Detected Emotion: <strong>{result.emotion}</strong></p>
            <p>Confidence: <strong>{(result.confidence * 100).toFixed(1)}%</strong></p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SpeechAnalysis;