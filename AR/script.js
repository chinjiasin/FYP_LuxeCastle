import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';

const tryOnBtn = document.getElementById('tryOnBtn');
const video = document.getElementById('video');
const canvas = document.getElementById('arCanvas');

let renderer, scene, camera;

tryOnBtn.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();

    initThreeJS();
    loadClothingModel();
  } catch (error) {
    alert("Camera access denied or not supported.");
    console.error("Camera error:", error);
  }
});

function initThreeJS() {
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
  camera.position.z = 2;

  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  animate();
}

function loadClothingModel() {
  const loader = new GLTFLoader();
  loader.load('model/tshirt.glb', function (gltf) {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    scene.add(model);
  }, undefined, function (error) {
    console.error("Error loading model:", error);
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
