import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TryOnAR = ({ clothingItems }) => {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const MODEL_URL = "https://teachablemachine.withgoogle.com/models/ByuzpFFdv/";

  useEffect(() => {
    const loadScriptsAndStart = async () => {
      try {
        if (!window.tf) {
          await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1");
        }
        if (!window.tmPose) {
          await loadScript("https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js");
        }
        await startAR();
      } catch (err) {
        console.error(err);
        setError("Failed to load AR libraries.");
        setIsLoading(false);
      }
    };

    loadScriptsAndStart();

    return () => {
      stopAR();
    };
  }, []);

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });

  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());

      const model = await window.tmPose.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
      modelRef.current = model;

      const webcam = new window.tmPose.Webcam(640, 480, true);
      await webcam.setup();
      await webcam.play();
      webcamRef.current = webcam;

      setIsLoading(false);
      animationRef.current = requestAnimationFrame(loop);
    } catch (err) {
      setError("Failed to access camera: " + err.message);
      setIsLoading(false);
    }
  };

  const stopAR = async () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (webcamRef.current) {
      try {
        await webcamRef.current.stop();
        webcamRef.current = null;
      } catch (err) {
        console.warn("Error stopping webcam:", err);
      }
    }
  };

  const loop = async () => {
    const webcam = webcamRef.current;
    const model = modelRef.current;

    if (!webcam || !model) return;

    webcam.update();
    await predict(webcam, model);
    animationRef.current = requestAnimationFrame(loop);
  };

  const predict = async (webcam, model) => {
    if (!canvasRef.current) return;
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    await model.predict(posenetOutput);
    drawCanvas(pose, webcam.canvas);
    displayClothing(pose);
  };

  const drawCanvas = (pose, sourceCanvas) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(sourceCanvas, 0, 0);
  };

  const displayClothing = (pose) => {
    if (!pose || !clothingItems) return;
    const ctx = canvasRef.current.getContext("2d");

    clothingItems.forEach((item) => {
      const pos = getClothingPosition(pose, item.type);
      if (pos && item.image.complete) {
        ctx.drawImage(item.image, pos.x, pos.y, pos.width, pos.height);
      }
    });
  };

  const getClothingPosition = (pose, type) => {
    const getKey = (name) => pose.keypoints.find((k) => k.part === name);
    const center = (a, b) => ({
      x: (a.position.x + b.position.x) / 2,
      y: (a.position.y + b.position.y) / 2,
    });

    const leftShoulder = getKey("leftShoulder");
    const rightShoulder = getKey("rightShoulder");
    const leftHip = getKey("leftHip");
    const rightHip = getKey("rightHip");
    const leftKnee = getKey("leftKnee");
    const rightKnee = getKey("rightKnee");

    let x = 0, y = 0, width = 100, height = 100;

    switch (type) {
      case "top":
        if (leftShoulder && rightShoulder) {
          const c = center(leftShoulder, rightShoulder);
          const dist = Math.abs(leftShoulder.position.x - rightShoulder.position.x);
          width = dist * 1.5;
          height = width * 1.2;
          x = c.x - width / 2;
          y = c.y - height / 2 + 50;
        }
        break;
      case "pants":
        if (leftKnee && rightKnee) {
          const c = center(leftKnee, rightKnee);
          const dist = Math.abs(leftKnee.position.x - rightKnee.position.x);
          width = dist * 1.5;
          height = dist * 2;
          x = c.x - width / 2;
          y = c.y + 30;
        }
        break;
      case "skirt":
        if (leftHip && rightHip) {
          const c = center(leftHip, rightHip);
          const dist = Math.abs(leftHip.position.x - rightHip.position.x);
          width = dist * 2.2;
          height = dist * 2.2;
          x = c.x - width / 2;
          y = c.y + 40;
        }
        break;
      case "dress":
        if (leftShoulder && rightShoulder && leftHip && rightHip) {
          const cTop = center(leftShoulder, rightShoulder);
          const cBot = center(leftHip, rightHip);
          const dist = Math.abs(leftShoulder.position.x - rightShoulder.position.x);
          width = dist * 1.5;
          height = (cBot.y - cTop.y) * 2.2;
          x = cTop.x - width / 2;
          y = cTop.y + 30;
        }
        break;
      default:
        return null;
    }

    return { x, y, width, height };
  };

  const handleBack = async () => {
    await stopAR();
    navigate(-1); // go back to previous page
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
      >
        ← Back
      </button>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {isLoading ? (
        <p className="text-white text-lg">Loading AR...</p>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            className="rounded shadow-lg"
          />
          <p className="text-white mt-4">Please stand 1 meter away from the camera</p>
        </>
      )}
    </div>
  );
};

export default TryOnAR;