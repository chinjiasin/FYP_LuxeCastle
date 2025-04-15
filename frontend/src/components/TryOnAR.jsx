import React, { useEffect, useRef, useState } from "react";

const TryOnAR = ({ clothingItems }) => {
  const canvasRef = useRef(null);
  const labelContainerRef = useRef(null);

  const [isARReady, setIsARReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [webcam, setWebcam] = useState(null);
  const [model, setModel] = useState(null);

  const MODEL_URL = "https://teachablemachine.withgoogle.com/models/ByuzpFFdv/";

  useEffect(() => {
    const loadScripts = async () => {
      try {
        if (!window.tf) {
          const tfScript = document.createElement("script");
          tfScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1";
          tfScript.async = true;
          document.body.appendChild(tfScript);
          await new Promise((res, rej) => {
            tfScript.onload = res;
            tfScript.onerror = rej;
          });
        }

        if (!window.tmPose) {
          const tmPoseScript = document.createElement("script");
          tmPoseScript.src =
            "https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js";
          tmPoseScript.async = true;
          document.body.appendChild(tmPoseScript);
          await new Promise((res, rej) => {
            tmPoseScript.onload = res;
            tmPoseScript.onerror = rej;
          });
        }

        setIsLoading(false);
      } catch (e) {
        setError("Failed to load required scripts.");
        setIsLoading(false);
      }
    };

    loadScripts();
  }, []);

  const startAR = async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());

      const modelURL = MODEL_URL + "model.json";
      const metadataURL = MODEL_URL + "metadata.json";

      const loadedModel = await window.tmPose.load(modelURL, metadataURL);
      setModel(loadedModel);

      const webcamInstance = new window.tmPose.Webcam(300, 300, true);
      await webcamInstance.setup();
      await webcamInstance.play();
      setWebcam(webcamInstance);

      setIsARReady(true);
      setIsLoading(false);

      requestAnimationFrame(() => loop(webcamInstance, loadedModel));
    } catch (e) {
      setError("Unable to start AR experience: " + e.message);
      setIsLoading(false);
    }
  };

  const loop = async (webcamInstance, modelInstance) => {
    if (!webcamInstance) return;

    webcamInstance.update();
    await predict(webcamInstance, modelInstance);

    requestAnimationFrame(() => loop(webcamInstance, modelInstance));
  };

  const predict = async (webcamInstance, modelInstance) => {
    if (!canvasRef.current) return;

    const { pose, posenetOutput } = await modelInstance.estimatePose(webcamInstance.canvas);
    const prediction = await modelInstance.predict(posenetOutput);

    drawCanvas(pose, webcamInstance.canvas);
    updateLabels(prediction);
    displayClothing(pose);
  };

  const drawCanvas = (pose, sourceCanvas) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(sourceCanvas, 0, 0);

    if (pose && window.tmPose) {
      window.tmPose.drawKeypoints(pose.keypoints, 0.5, ctx);
      window.tmPose.drawSkeleton(pose.keypoints, 0.5, ctx);
    }
  };

  const updateLabels = (predictions) => {
    const labelDiv = labelContainerRef.current;
    if (!labelDiv) return;

    labelDiv.innerHTML = "";
    predictions.forEach((p) => {
      const pElem = document.createElement("p");
      pElem.textContent = `${p.className}: ${p.probability.toFixed(2)}`;
      pElem.className = "text-sm text-gray-700";
      labelDiv.appendChild(pElem);
    });
  };

  const displayClothing = (pose) => {
    if (!pose || !clothingItems) return;

    const ctx = canvasRef.current.getContext("2d");

    clothingItems.forEach((item) => {
      const clothingPosition = getClothingPosition(pose, item.type);
      if (clothingPosition && item.image.complete) {
        const { x, y, width, height } = clothingPosition;
        ctx.drawImage(item.image, x, y, width, height);
      }
    });
  };

  const getClothingPosition = (pose, clothingType) => {
    const keypoints = pose.keypoints;
    let x = 0,
      y = 0,
      width = 100,
      height = 100;

    const getKey = (name) => keypoints.find((k) => k.part === name);

    const leftShoulder = getKey("leftShoulder");
    const rightShoulder = getKey("rightShoulder");
    const leftHip = getKey("leftHip");
    const rightHip = getKey("rightHip");

    const center = (pointA, pointB) => ({
      x: (pointA.position.x + pointB.position.x) / 2,
      y: (pointA.position.y + pointB.position.y) / 2,
    });

    switch (clothingType) {
      case "top":
        if (leftShoulder && rightShoulder) {
          const { x: centerX, y: centerY } = center(leftShoulder, rightShoulder);
          const shoulderDist = Math.abs(leftShoulder.position.x - rightShoulder.position.x);
          width = shoulderDist * 1.5;
          height = width * 1.2;
          x = centerX - width / 2;
          y = centerY - height / 2 + 50;
        }
        break;

      case "pants":
      case "skirt":
        if (leftHip && rightHip) {
          const { x: centerX, y: centerY } = center(leftHip, rightHip);
          const hipDist = Math.abs(leftHip.position.x - rightHip.position.x);
          width = hipDist * 1.8;
          height = hipDist * 1.2;
          x = centerX - width / 2;
          y = centerY;
        }
        break;

      case "dress":
        if (leftShoulder && rightShoulder && leftHip && rightHip) {
          const { x: centerX, y: shoulderY } = center(leftShoulder, rightShoulder);
          const { y: hipY } = center(leftHip, rightHip);
          const shoulderDist = Math.abs(leftShoulder.position.x - rightShoulder.position.x);
          width = shoulderDist * 1.5;
          height = (hipY - shoulderY) * 1.4;
          x = centerX - width / 2;
          y = shoulderY;
        }
        break;

      default:
        return null;
    }

    return { x, y, width, height };
  };

  useEffect(() => {
    return () => {
      if (webcam) webcam.stop();
    };
  }, [webcam]);

  return (
    <div className="p-4 border rounded mt-4">
      <h2 className="text-lg font-semibold mb-2">Virtual Try-On</h2>

      {error && <div className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</div>}

      {isLoading && <p className="text-gray-500">Loading AR experience...</p>}

      {!isARReady && !isLoading && (
        <button
          onClick={startAR}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Start AR Try-On
        </button>
      )}

      {isARReady && (
        <>
          <canvas
            ref={canvasRef}
            width="300"
            height="300"
            className="border mt-4"
          />
          <div
            id="prediction-container"
            ref={labelContainerRef}
            className="mt-4"
          ></div>
        </>
      )}
    </div>
  );
};

export default TryOnAR;
