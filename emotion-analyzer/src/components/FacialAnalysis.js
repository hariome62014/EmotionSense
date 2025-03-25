// // src/components/FacialAnalysis.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import LoadingSpinner from './LoadingSpinner';
// import EmotionDisplay from './EmotionDisplay';
// import './../styles/global.css';

// const FacialAnalysis = ({ onAnalysisComplete }) => {
//   const [isCapturing, setIsCapturing] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     return () => {
//       stopCamera();
//     };
//   }, []);

//   const startCamera = async () => {
//     setError(null);
//     setResult(null);
//     setImageSrc(null);
    
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//       setIsCapturing(true);
//     } catch (err) {
//       setError('Could not access camera. Please check permissions.');
//       console.error(err);
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     setIsCapturing(false);
//   };

//   const captureImage = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const context = canvas.getContext('2d');
      
//       // Set canvas dimensions to match video
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
      
//       // Draw video frame to canvas
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
//       // Get image data URL
//       const imageDataUrl = canvas.toDataURL('image/jpeg');
//       setImageSrc(imageDataUrl);
      
//       // Analyze the captured image
//       analyzeImage(imageDataUrl);
//     }
//   };

//   const analyzeImage = async (imageData) => {
//     setIsCapturing(false);
//     stopCamera();
//     setError(null);
    
//     try {
//       // In a real app, you would send the image to your backend API
//       // For demo purposes, we'll simulate an API call
//       const response = await simulateFacialAnalysis();
      
//       setResult(response);
//       onAnalysisComplete({ facialAnalysis: response });
//     } catch (err) {
//       setError('Failed to analyze image. Please try again.');
//       console.error(err);
//     }
//   };

//   const simulateFacialAnalysis = async () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         // Mock analysis with random emotion
//         const emotions = ['happy', 'sad', 'angry', 'neutral', 'surprised'];
//         const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
//         const confidence = 0.7 + Math.random() * 0.3; // Between 0.7 and 1.0
        
//         resolve({
//           emotion: randomEmotion,
//           confidence,
//           type: 'facial'
//         });
//       }, 2000);
//     });
//   };

//   return (
//     <div className="analysis-container">
//       <h2>Facial Emotion Analysis</h2>
//       <p>Capture your facial expression to analyze emotions</p>
      
//       <div className="camera-container">
//         {isCapturing ? (
//           <div className="camera-preview">
//             <video ref={videoRef} autoPlay playsInline muted />
//             <canvas ref={canvasRef} style={{ display: 'none' }} />
            
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={captureImage}
//               className="capture-button"
//             >
//               Capture Image
//             </motion.button>
            
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={stopCamera}
//               className="stop-camera-button"
//             >
//               Stop Camera
//             </motion.button>
//           </div>
//         ) : (
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={startCamera}
//             className="start-camera-button"
//           >
//             Start Camera
//           </motion.button>
//         )}
//       </div>
      
//       {imageSrc && (
//         <div className="captured-image">
//           <img src={imageSrc} alt="Captured face" />
//         </div>
//       )}
      
//       {error && <div className="error-message">{error}</div>}
      
//       {result && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="result-container"
//         >
//           <h3>Analysis Result</h3>
//           <EmotionDisplay emotion={result.emotion} confidence={result.confidence} />
//           <div className="result-text">
//             <p>Detected Emotion: <strong>{result.emotion}</strong></p>
//             <p>Confidence: <strong>{(result.confidence * 100).toFixed(1)}%</strong></p>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default FacialAnalysis;



// import React, { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import LoadingSpinner from './LoadingSpinner';
// import EmotionDisplay from './EmotionDisplay';
// import './../styles/global.css';

// const FacialAnalysis = ({ onAnalysisComplete }) => {
//   const [isCapturing, setIsCapturing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [faceDetected, setFaceDetected] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const detectionInterval = useRef(null);

//   useEffect(() => {
//     return () => {
//       stopCamera();
//       clearDetectionInterval();
//     };
//   }, []);

//   const clearDetectionInterval = () => {
//     if (detectionInterval.current) {
//       clearInterval(detectionInterval.current);
//       detectionInterval.current = null;
//     }
//   };

//   const startCamera = async () => {
//     setError(null);
//     setResult(null);
//     setImageSrc(null);
//     setFaceDetected(false);
    
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { 
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//           facingMode: 'user' 
//         } 
//       });
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.onloadedmetadata = () => {
//           startFaceDetection();
//         };
//       }
//       setIsCapturing(true);
//     } catch (err) {
//       setError('Could not access camera. Please check permissions.');
//       console.error(err);
//     }
//   };

//   const startFaceDetection = () => {
//     clearDetectionInterval();
    
//     detectionInterval.current = setInterval(() => {
//       if (videoRef.current && canvasRef.current) {
//         const video = videoRef.current;
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');
        
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
//         // Simple face detection (in a real app, you would use a proper face detection library)
//         const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//         const faceDetected = detectFaceSimple(imageData);
//         setFaceDetected(faceDetected);
//       }
//     }, 500);
//   };

//   // Simple face detection (for demo purposes)
//   const detectFaceSimple = (imageData) => {
//     // This is a very basic implementation that looks for skin tones
//     // In a real app, you would use a proper face detection library like face-api.js
//     const data = imageData.data;
//     let skinPixels = 0;
    
//     for (let i = 0; i < data.length; i += 4) {
//       const r = data[i];
//       const g = data[i + 1];
//       const b = data[i + 2];
      
//       // Basic skin tone detection
//       if (r > 100 && g > 50 && b > 50 && r > g && r > b && Math.abs(r - g) > 15) {
//         skinPixels++;
//       }
//     }
    
//     const skinPercentage = skinPixels / (imageData.width * imageData.height);
//     return skinPercentage > 0.1; // At least 10% skin pixels
//   };

//   const stopCamera = () => {
//     clearDetectionInterval();
//     if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     setIsCapturing(false);
//     setFaceDetected(false);
//   };

//   const captureImage = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const context = canvas.getContext('2d');
      
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
//       const imageDataUrl = canvas.toDataURL('image/jpeg');
//       setImageSrc(imageDataUrl);
//       analyzeImage(imageDataUrl);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     setError(null);
//     setResult(null);
//     setIsLoading(true);
    
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const imageUrl = event.target.result;
//       setImageSrc(imageUrl);
//       analyzeImage(imageUrl);
//     };
//     reader.onerror = () => {
//       setError('Failed to read image file');
//       setIsLoading(false);
//     };
//     reader.readAsDataURL(file);
//   };

//   const analyzeImage = async (imageData) => {
//     setIsLoading(true);
//     stopCamera();
//     setError(null);
    
//     try {
//       // In a real app, you would send the image to your backend API
//       const response = await simulateFacialAnalysis();
      
//       setResult(response);
//       onAnalysisComplete({ facialAnalysis: response });
//     } catch (err) {
//       setError('Failed to analyze image. Please try again.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const simulateFacialAnalysis = async () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const emotions = ['happy', 'sad', 'angry', 'neutral', 'surprised'];
//         const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
//         const confidence = 0.7 + Math.random() * 0.3;
        
//         resolve({
//           emotion: randomEmotion,
//           confidence,
//           type: 'facial'
//         });
//       }, 2000);
//     });
//   };

//   return (
//     <div className="analysis-container">
//       <h2>Facial Emotion Analysis</h2>
//       <p>Capture your expression or upload an image to analyze emotions</p>
      
//       <div className="camera-container">
//         {isCapturing ? (
//           <div className="camera-preview">
//             <div className="video-wrapper">
//               <video 
//                 ref={videoRef} 
//                 autoPlay 
//                 playsInline 
//                 muted 
//                 className={faceDetected ? 'face-detected' : ''}
//               />
//               {!faceDetected && (
//                 <div className="face-detection-message">
//                   <p>Please position your face in the frame</p>
//                 </div>
//               )}
//             </div>
//             <canvas ref={canvasRef} style={{ display: 'none' }} />
            
//             <div className="camera-controls">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={captureImage}
//                 className="capture-button"
//                 disabled={!faceDetected}
//               >
//                 {faceDetected ? 'Capture Image' : 'No Face Detected'}
//               </motion.button>
              
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={stopCamera}
//                 className="stop-camera-button"
//               >
//                 Stop Camera
//               </motion.button>
//             </div>
//           </div>
//         ) : (
//           <div className="input-options">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={startCamera}
//               className="start-camera-button"
//             >
//               Start Camera
//             </motion.button>
            
//             <div className="or-divider">OR</div>
            
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => fileInputRef.current.click()}
//               className="upload-button"
//             >
//               Upload Image
//             </motion.button>
            
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileUpload}
//               accept="image/*"
//               style={{ display: 'none' }}
//             />
//           </div>
//         )}
//       </div>
      
//       {(imageSrc || isLoading) && (
//         <motion.div 
//           className="image-preview-container"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <h3>{isLoading ? 'Analyzing...' : 'Captured Image'}</h3>
//           {isLoading ? (
//             <div className="loading-overlay">
//               <LoadingSpinner size="medium" />
//             </div>
//           ) : (
//             <div className="captured-image">
//               <img src={imageSrc} alt="Captured face for analysis" />
//             </div>
//           )}
//         </motion.div>
//       )}
      
//       {error && (
//         <motion.div 
//           className="error-message"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           {error}
//         </motion.div>
//       )}
      
//       {result && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="result-container"
//         >
//           <h3>Analysis Result</h3>
//           <EmotionDisplay emotion={result.emotion} confidence={result.confidence} />
//           <div className="result-text">
//             <p>Detected Emotion: <strong>{result.emotion}</strong></p>
//             <p>Confidence: <strong>{(result.confidence * 100).toFixed(1)}%</strong></p>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default FacialAnalysis;


// import React, { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import LoadingSpinner from './LoadingSpinner';
// import EmotionDisplay from './EmotionDisplay';
// import './../styles/global.css';

// const FacialAnalysis = ({ onAnalysisComplete }) => {
//   const [isCapturing, setIsCapturing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [faceDetected, setFaceDetected] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const detectionInterval = useRef(null);

//   useEffect(() => {
//     return () => {
//       stopCamera();
//       clearDetectionInterval();
//     };
//   }, []);

//   const clearDetectionInterval = () => {
//     if (detectionInterval.current) {
//       clearInterval(detectionInterval.current);
//       detectionInterval.current = null;
//     }
//   };

//   const startCamera = async () => {
//     setError(null);
//     setResult(null);
//     setImageSrc(null);
//     setFaceDetected(false);
    
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { 
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//           facingMode: 'user' 
//         } 
//       });
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.onloadedmetadata = () => {
//           // Ensure video is properly displayed
//           videoRef.current.play().catch(err => {
//             console.error("Error playing video:", err);
//             setError("Could not start camera feed");
//           });
//           startFaceDetection();
//         };
//       }
//       setIsCapturing(true);
//     } catch (err) {
//       setError('Could not access camera. Please check permissions.');
//       console.error(err);
//     }
//   };

//   const startFaceDetection = () => {
//     clearDetectionInterval();
    
//     detectionInterval.current = setInterval(() => {
//       if (videoRef.current && canvasRef.current && videoRef.current.readyState === 4) {
//         const video = videoRef.current;
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');
        
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
//         // Simple face detection (in a real app, use a proper face detection library)
//         const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//         const faceDetected = detectFaceSimple(imageData);
//         setFaceDetected(faceDetected);
//       }
//     }, 500);
//   };

//   const detectFaceSimple = (imageData) => {
//     const data = imageData.data;
//     let skinPixels = 0;
    
//     for (let i = 0; i < data.length; i += 4) {
//       const r = data[i];
//       const g = data[i + 1];
//       const b = data[i + 2];
      
//       // Basic skin tone detection
//       if (r > 100 && g > 50 && b > 50 && r > g && r > b && Math.abs(r - g) > 15) {
//         skinPixels++;
//       }
//     }
    
//     const skinPercentage = skinPixels / (imageData.width * imageData.height);
//     return skinPercentage > 0.1; // At least 10% skin pixels
//   };

//   const stopCamera = () => {
//     clearDetectionInterval();
//     if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     setIsCapturing(false);
//     setFaceDetected(false);
//   };

//   const captureImage = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const context = canvas.getContext('2d');
      
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
//       const imageDataUrl = canvas.toDataURL('image/jpeg');
//       setImageSrc(imageDataUrl);
//       analyzeImage(imageDataUrl);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     setError(null);
//     setResult(null);
//     setIsLoading(true);
    
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const imageUrl = event.target.result;
//       setImageSrc(imageUrl);
//       analyzeImage(imageUrl);
//     };
//     reader.onerror = () => {
//       setError('Failed to read image file');
//       setIsLoading(false);
//     };
//     reader.readAsDataURL(file);
//   };

//   const analyzeImage = async (imageData) => {
//     setIsLoading(true);
//     stopCamera();
//     setError(null);
    
//     try {
//       const response = await simulateFacialAnalysis();
//       setResult(response);
//       onAnalysisComplete({ facialAnalysis: response });
//     } catch (err) {
//       setError('Failed to analyze image. Please try again.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const simulateFacialAnalysis = async () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const emotions = ['happy', 'sad', 'angry', 'neutral', 'surprised'];
//         const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
//         const confidence = 0.7 + Math.random() * 0.3;
        
//         resolve({
//           emotion: randomEmotion,
//           confidence,
//           type: 'facial'
//         });
//       }, 2000);
//     });
//   };

//   return (
//     <div className="analysis-container">
//       <h2>Facial Emotion Analysis</h2>
//       <p>Capture your expression or upload an image to analyze emotions</p>
      
//       <div className="camera-container">
//         {isCapturing ? (
//           <div className="camera-preview">
//             <div className="video-wrapper">
//               <video 
//                 ref={videoRef} 
//                 autoPlay 
//                 playsInline 
//                 muted 
//                 className={faceDetected ? 'face-detected' : ''}
//               />
//               {!faceDetected && (
//                 <div className="face-detection-message">
//                   <p>Please position your face in the frame</p>
//                 </div>
//               )}
//             </div>
//             <canvas ref={canvasRef} style={{ display: 'none' }} />
            
//             <div className="camera-controls">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={captureImage}
//                 className="capture-button"
//                 disabled={!faceDetected}
//               >
//                 {faceDetected ? 'Capture Image' : 'No Face Detected'}
//               </motion.button>
              
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={stopCamera}
//                 className="stop-camera-button"
//               >
//                 Stop Camera
//               </motion.button>
//             </div>
//           </div>
//         ) : (
//           <div className="input-options">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={startCamera}
//               className="start-camera-button"
//             >
//               Start Camera
//             </motion.button>
            
//             <div className="or-divider">OR</div>
            
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => fileInputRef.current.click()}
//               className="upload-button"
//             >
//               Upload Image
//             </motion.button>
            
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileUpload}
//               accept="image/*"
//               style={{ display: 'none' }}
//             />
//           </div>
//         )}
//       </div>
      
//       {(imageSrc || isLoading) && (
//         <motion.div 
//           className="image-preview-container"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <h3>{isLoading ? 'Analyzing...' : 'Captured Image'}</h3>
//           {isLoading ? (
//             <div className="loading-overlay">
//               <LoadingSpinner size="medium" />
//             </div>
//           ) : (
//             <div className="captured-image">
//               <img src={imageSrc} alt="Captured face for analysis" />
//             </div>
//           )}
//         </motion.div>
//       )}
      
//       {error && (
//         <motion.div 
//           className="error-message"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           {error}
//         </motion.div>
//       )}
      
//       {result && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="result-container"
//         >
//           <h3>Analysis Result</h3>
//           <EmotionDisplay emotion={result.emotion} confidence={result.confidence} />
//           <div className="result-text">
//             <p>Detected Emotion: <strong>{result.emotion}</strong></p>
//             <p>Confidence: <strong>{(result.confidence * 100).toFixed(1)}%</strong></p>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default FacialAnalysis;


// import React, { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import LoadingSpinner from './LoadingSpinner';
// import EmotionDisplay from './EmotionDisplay';
// import './../styles/global.css';

// const FacialAnalysis = ({ onAnalysisComplete }) => {
//   const [isCapturing, setIsCapturing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     return () => {
//       stopCamera();
//     };
//   }, []);

//   const startCamera = async () => {
//     setError(null);
//     setResult(null);
//     setImageSrc(null);
    
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { 
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//           facingMode: 'user' 
//         } 
//       });
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//       setIsCapturing(true);
//     } catch (err) {
//       setError('Could not access camera. Please check permissions.');
//       console.error(err);
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     setIsCapturing(false);
//   };

//   const captureImage = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const context = canvas.getContext('2d');
      
//       // Set canvas dimensions to match video
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
      
//       // Draw video frame to canvas
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
//       // Get image data URL
//       const imageDataUrl = canvas.toDataURL('image/jpeg');
//       setImageSrc(imageDataUrl);
      
//       // Stop camera after capture
//       stopCamera();
      
//       // Analyze the captured image
//       analyzeImage(imageDataUrl);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     setError(null);
//     setResult(null);
//     setIsLoading(true);
    
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const imageUrl = event.target.result;
//       setImageSrc(imageUrl);
//       analyzeImage(imageUrl);
//     };
//     reader.onerror = () => {
//       setError('Failed to read image file');
//       setIsLoading(false);
//     };
//     reader.readAsDataURL(file);
//   };

//   const analyzeImage = async (imageData) => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       // In a real app, you would send the image to your backend API
//       const response = await simulateFacialAnalysis();
      
//       setResult(response);
//       onAnalysisComplete({ facialAnalysis: response });
//     } catch (err) {
//       setError('Failed to analyze image. Please try again.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const simulateFacialAnalysis = async () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const emotions = ['happy', 'sad', 'angry', 'neutral', 'surprised'];
//         const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
//         const confidence = 0.7 + Math.random() * 0.3;
        
//         resolve({
//           emotion: randomEmotion,
//           confidence,
//           type: 'facial'
//         });
//       }, 2000);
//     });
//   };

//   return (
//     <div className="analysis-container">
//       <h2>Facial Emotion Analysis</h2>
//       <p>Capture your expression or upload an image to analyze emotions</p>
      
//       <div className="camera-container">
//         {isCapturing ? (
//           <div className="camera-preview">
//             <div className="video-wrapper">
//               <video 
//                 ref={videoRef} 
//                 autoPlay 
//                 playsInline 
//                 muted 
//               />
//             </div>
//             <canvas ref={canvasRef} style={{ display: 'none' }} />
            
//             <div className="camera-controls">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={captureImage}
//                 className="capture-button"
//               >
//                 Capture Photo
//               </motion.button>
              
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={stopCamera}
//                 className="stop-camera-button"
//               >
//                 Stop Camera
//               </motion.button>
//             </div>
//           </div>
//         ) : (
//           <div className="input-options">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={startCamera}
//               className="start-camera-button"
//             >
//               Start Camera
//             </motion.button>
            
//             <div className="or-divider">OR</div>
            
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => fileInputRef.current.click()}
//               className="upload-button"
//             >
//               Upload Image
//             </motion.button>
            
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileUpload}
//               accept="image/*"
//               style={{ display: 'none' }}
//             />
//           </div>
//         )}
//       </div>
      
//       {(imageSrc || isLoading) && (
//         <motion.div 
//           className="image-preview-container"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <h3>{isLoading ? 'Analyzing...' : 'Captured Photo'}</h3>
//           {isLoading ? (
//             <div className="loading-overlay">
//               <LoadingSpinner size="medium" />
//             </div>
//           ) : (
//             <div className="captured-image">
//               <img src={imageSrc} alt="Captured for analysis" />
//             </div>
//           )}
//         </motion.div>
//       )}
      
//       {error && (
//         <motion.div 
//           className="error-message"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           {error}
//         </motion.div>
//       )}
      
//       {result && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="result-container"
//         >
//           <h3>Analysis Result</h3>
//           <EmotionDisplay emotion={result.emotion} confidence={result.confidence} />
//           <div className="result-text">
//             <p>Detected Emotion: <strong>{result.emotion}</strong></p>
//             <p>Confidence: <strong>{(result.confidence * 100).toFixed(1)}%</strong></p>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default FacialAnalysis;



import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import EmotionDisplay from './EmotionDisplay';
import './../styles/global.css';

const FacialAnalysis = ({ onAnalysisComplete }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    setResult(null);
    setImageSrc(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user' 
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(err => {
          setError('Could not start camera feed');
          console.error(err);
        });
      }
      setIsCapturing(true);
    } catch (err) {
      setError('Could not access camera. Please check permissions.');
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturing(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data URL
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setImageSrc(imageDataUrl);
      
      // Analyze the captured image
      analyzeImage(imageDataUrl);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setError(null);
    setResult(null);
    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setImageSrc(imageUrl);
      analyzeImage(imageUrl);
    };
    reader.onerror = () => {
      setError('Failed to read image file');
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (imageData) => {
    setIsLoading(true);
    stopCamera();
    setError(null);
    
    try {
      // In a real app, you would send the image to your backend API
      const response = await simulateFacialAnalysis();
      
      setResult(response);
      onAnalysisComplete({ facialAnalysis: response });
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateFacialAnalysis = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const emotions = ['happy', 'sad', 'angry', 'neutral', 'surprised'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        const confidence = 0.7 + Math.random() * 0.3;
        
        resolve({
          emotion: randomEmotion,
          confidence,
          type: 'facial'
        });
      }, 2000);
    });
  };

  return (
    <div className="analysis-container">
      <h2>Facial Emotion Analysis</h2>
      <p>Capture your expression or upload an image to analyze emotions</p>
      
      <div className="camera-container">
        {isCapturing ? (
          <div className="camera-preview">
            <div className="video-wrapper">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="camera-feed"
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            
            <div className="camera-controls">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={captureImage}
                className="capture-button"
              >
                Capture Photo
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={stopCamera}
                className="stop-camera-button"
              >
                Stop Camera
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="input-options">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startCamera}
              className="start-camera-button"
            >
              Start Camera
            </motion.button>
            
            <div className="or-divider">OR</div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current.click()}
              className="upload-button"
            >
              Upload Image
            </motion.button>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
        )}
      </div>
      
      {(imageSrc || isLoading) && (
        <motion.div 
          className="image-preview-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>{isLoading ? 'Analyzing...' : 'Captured Photo'}</h3>
          {isLoading ? (
            <div className="loading-overlay">
              <LoadingSpinner size="medium" />
            </div>
          ) : (
            <div className="captured-image">
              <img src={imageSrc} alt="Captured for analysis" />
            </div>
          )}
        </motion.div>
      )}
      
      {error && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="result-container"
        >
          <h3>Analysis Result</h3>
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

export default FacialAnalysis;