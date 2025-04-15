let video;
let posenet;
let pose;
let canvas;
let ctx;
let shirtMesh;  // The 3D mesh representing the shirt

async function setup() {
  // Set up the video feed
  video = document.getElementById("video");
  video.width = 640;
  video.height = 480;

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  video.srcObject = stream;
  
  // Load PoseNet
  posenet = await posenet.load();
  
  // Set up the canvas for AR overlay
  canvas = document.getElementById("webcamCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = video.width;
  canvas.height = video.height;

  // Load your shirt model (3D object)
  loadShirtModel();

  // Start the pose detection loop
  detectPose();
}

async function detectPose() {
  // Get the pose of the person in the video
  pose = await posenet.estimateSinglePose(video, {
    flipHorizontal: false,
  });

  // Draw the pose on the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPose(pose);

  // Update the AR 3D object position based on the pose
  updateShirtPosition(pose);

  // Keep detecting pose
  requestAnimationFrame(detectPose);
}

function drawPose(pose) {
  // Draw keypoints
  pose.keypoints.forEach((keypoint) => {
    if (keypoint.score > 0.5) {
      ctx.beginPath();
      ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  });
}

function loadShirtModel() {
  // Initialize a 3D scene and camera using Three.js (or another 3D rendering library)
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 640 / 480, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(640, 480);
  document.body.appendChild(renderer.domElement);

  // Load a shirt 3D model (This is just an example, you can use any model)
  const loader = new THREE.GLTFLoader();
  loader.load('shirt_model.glb', (gltf) => {
    shirtMesh = gltf.scene;
    scene.add(shirtMesh);
  });

  // Update the shirt position based on the detected pose
  function updateShirtPosition(pose) {
    if (!shirtMesh) return;

    const shirtPosition = pose.keypoints.find((keypoint) => keypoint.part === "leftShoulder");
    if (shirtPosition) {
      // Position the shirt on the detected shoulder
      shirtMesh.position.set(shirtPosition.position.x, shirtPosition.position.y, 0);
    }

    // Render the 3D scene
    renderer.render(scene, camera);
  }
}

setup();
