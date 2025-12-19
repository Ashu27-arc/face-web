"use client";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface FaceRegisterProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
}

export default function FaceRegister({ userData }: FaceRegisterProps) {
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("Loading face recognition models...");
  const [capturing, setCapturing] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        setLoaded(true);
        setMessage("Ready to capture your face!");
      } catch (error) {
        console.error("Error loading models:", error);
        setMessage("Error loading models. Please refresh the page.");
      }
    };
    loadModels();
  }, []);

  const captureFaceData = async () => {
    if (!loaded) {
      alert("Models are still loading. Please wait.");
      return;
    }

    if (!webcamRef.current) {
      alert("Camera not ready");
      return;
    }

    setCapturing(true);
    setMessage("Capturing face data... Please stay still");

    try {
      const captures: string[] = [];
      const faceDescriptors: Float32Array[] = [];

      // Capture 3 images for better accuracy
      for (let i = 0; i < 3; i++) {
        setMessage(`Capturing image ${i + 1} of 3...`);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
          throw new Error("Failed to capture image");
        }

        const img = await faceapi.fetchImage(imageSrc);
        const detection = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({
            inputSize: 416,
            scoreThreshold: 0.3
          }))
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!detection) {
          setMessage("Face not detected. Please ensure good lighting and face the camera.");
          setCapturing(false);
          return;
        }

        captures.push(imageSrc);
        faceDescriptors.push(detection.descriptor);
      }

      // Save face data to backend
      const registrationData = {
        userData,
        faceDescriptors: faceDescriptors.map(desc => Array.from(desc)),
        capturedImages: captures
      };

      setMessage("Saving to server...");

      // Send to backend API
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      // Save to localStorage and trigger auth state change
      localStorage.setItem("faceAuth", "true");
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("userName", userData.name);
      
      // Trigger custom event for navbar update
      window.dispatchEvent(new Event("authStateChanged"));
      
      setCapturedImages(captures);
      setRegistrationComplete(true);
      setMessage("Registration successful! You are now logged in.");
      
      setTimeout(() => {
        router.push("/");
      }, 2500);

    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Error during registration. Please try again.");
      alert("Failed to register face. Please ensure:\n- Your face is clearly visible\n- Good lighting\n- Camera has permission\n- Face the camera directly");
    } finally {
      setCapturing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {!registrationComplete ? (
        <>
          <div className="relative">
            <Webcam 
              ref={webcamRef} 
              screenshotFormat="image/jpeg"
              width={400}
              height={300}
              className="rounded-xl shadow-2xl border-2 border-blue-500/30"
            />
            {capturing && (
              <div className="absolute inset-0 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <div className="bg-slate-900/90 px-6 py-3 rounded-lg">
                  <p className="text-white font-semibold">Capturing...</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <p className="text-lg font-medium mb-2">{message}</p>
            <p className="text-slate-400 text-sm">
              We'll capture 3 images to ensure accurate recognition
            </p>
          </div>
          
          <button
            onClick={captureFaceData}
            disabled={!loaded || capturing}
            className={`px-8 py-4 rounded-lg font-semibold text-lg shadow-lg ${
              loaded && !capturing
                ? "bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer hover:scale-105" 
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            {capturing ? "Capturing..." : "Register Face"}
          </button>
          
          {/* <div className="glass p-6 rounded-xl max-w-md">
            <h3 className="font-semibold mb-3 text-blue-400">Tips for best results:</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Ensure good, even lighting on your face</span>
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
                <span>Stay still during capture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Maintain a neutral expression</span>
              </li>
            </ul>
          </div> */}
        </>
      ) : (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">✓</div>
          <h3 className="text-3xl font-bold gradient-text">Registration Complete!</h3>
          <p className="text-slate-300 text-lg">
            Your face has been successfully registered
          </p>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            {capturedImages.map((img, idx) => (
              <div key={idx} className="glass p-2 rounded-lg">
                <img src={img} alt={`Capture ${idx + 1}`} className="rounded" />
                <p className="text-xs text-slate-400 mt-2">Capture {idx + 1}</p>
              </div>
            ))}
          </div>

          <div className="glass p-6 rounded-xl">
            <h4 className="font-semibold mb-2 text-green-400">Account Details</h4>
            <div className="text-left space-y-1 text-sm text-slate-300">
              <p><span className="text-slate-500">Name:</span> {userData.name}</p>
              <p><span className="text-slate-500">Email:</span> {userData.email}</p>
              <p><span className="text-slate-500">Phone:</span> {userData.phone}</p>
              {userData.company && (
                <p><span className="text-slate-500">Company:</span> {userData.company}</p>
              )}
            </div>
          </div>

          <p className="text-slate-400">Redirecting to home page...</p>
        </div>
      )}
    </div>
  );
}
