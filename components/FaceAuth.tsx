"use client";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function FaceAuth() {
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("Loading models...");

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        setLoaded(true);
        setMessage("Models loaded. Ready to verify!");
      } catch (error) {
        console.error("Error loading models:", error);
        setMessage("Error loading models");
      }
    };
    loadModels();
  }, []);

  const verifyFace = async () => {
    if (!loaded) {
      alert("Models are still loading. Please wait.");
      return;
    }

    if (!webcamRef.current) {
      alert("Camera not ready");
      return;
    }

    setMessage("Detecting face...");

    try {
      // Try multiple times with different settings
      for (let attempt = 0; attempt < 3; attempt++) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
          setMessage("Failed to capture image");
          continue;
        }

        const img = await faceapi.fetchImage(imageSrc);
        
        // Try with very low threshold first
        const thresholds = [0.2, 0.15, 0.1];
        const inputSizes = [416, 320, 224];
        
        const detection = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({
            inputSize: inputSizes[attempt],
            scoreThreshold: thresholds[attempt]
          }))
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection) {
          setMessage("Face detected! Authenticating...");
          
          // Send to backend for authentication
          const authResponse = await fetch("/api/authenticate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              faceDescriptor: Array.from(detection.descriptor),
            }),
          });

          const authResult = await authResponse.json();

          if (authResponse.ok && authResult.success) {
            setMessage(`Welcome back, ${authResult.user.name}!`);
            localStorage.setItem("faceAuth", "true");
            localStorage.setItem("userId", authResult.user.id);
            localStorage.setItem("userName", authResult.user.name);
            
            // Trigger custom event for navbar update
            window.dispatchEvent(new Event("authStateChanged"));
            
            setTimeout(() => router.push("/"), 1000);
            return;
          } else {
            setMessage("Face not recognized. Please try again or register.");
            alert("Authentication failed: " + (authResult.error || "Face not recognized"));
            return;
          }
        }
        
        setMessage(`Attempt ${attempt + 1}/3... Adjusting settings...`);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // If all attempts fail, try detecting all faces
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const img = await faceapi.fetchImage(imageSrc);
        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions({
            inputSize: 224,
            scoreThreshold: 0.1
          }))
          .withFaceLandmarks()
          .withFaceDescriptors();

        if (detections && detections.length > 0) {
          setMessage("Face detected! Authenticating...");
          
          // Try authentication with first detected face
          const authResponse = await fetch("/api/authenticate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              faceDescriptor: Array.from(detections[0].descriptor),
            }),
          });

          const authResult = await authResponse.json();

          if (authResponse.ok && authResult.success) {
            setMessage(`Welcome back, ${authResult.user.name}!`);
            localStorage.setItem("faceAuth", "true");
            localStorage.setItem("userId", authResult.user.id);
            localStorage.setItem("userName", authResult.user.name);
            
            // Trigger custom event for navbar update
            window.dispatchEvent(new Event("authStateChanged"));
            
            setTimeout(() => router.push("/"), 1000);
            return;
          } else {
            setMessage("Face not recognized. Please try again or register.");
            alert("Authentication failed: " + (authResult.error || "Face not recognized"));
            return;
          }
        }
      }
      
      setMessage("No face detected. Please try again.");
      alert("Face not detected after multiple attempts. Please ensure:\n- Your face is clearly visible\n- Good lighting\n- Camera has permission\n- Face the camera directly");
    } catch (error) {
      console.error("Detection error:", error);
      setMessage("Error during detection");
      alert("Error detecting face. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <Webcam 
          ref={webcamRef} 
          screenshotFormat="image/jpeg"
          width={400}
          height={300}
          className="rounded-xl shadow-2xl border-2 border-blue-500/30"
        />
      </div>
      
      <div className="text-center">
        <p className="text-lg font-medium mb-2">{message}</p>
        <p className="text-slate-400 text-sm">
          Position your face in the camera frame
        </p>
      </div>
      
      <button
        onClick={verifyFace}
        disabled={!loaded}
        className={`px-8 py-4 rounded-lg font-semibold text-lg shadow-lg ${
          loaded 
            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer hover:scale-105" 
            : "bg-slate-700 text-slate-400 cursor-not-allowed"
        }`}
      >
        {loaded ? "Verify Face" : "Loading..."}
      </button>
      
      {/* <div className="glass p-6 rounded-xl max-w-md">
        <h3 className="font-semibold mb-3 text-blue-400">Tips for better detection:</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>Ensure good lighting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>Face the camera directly</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>Remove glasses if possible</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>Stay still when clicking verify</span>
          </li>
        </ul>
      </div> */}
    </div>
  );
}
