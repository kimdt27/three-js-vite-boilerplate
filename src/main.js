import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


const scene = new THREE.Scene()

//Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.z = 3

//Renderer setup
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//gray background
renderer.setClearColor(0x808080);

//Resize event
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

//Controls
new OrbitControls(camera, renderer.domElement)

// Stats (performance monitoring)
const stats = new Stats()
document.body.appendChild(stats.dom)


const geometry = new THREE.BoxGeometry(1, 1, 1); 
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); 
const cube = new THREE.Mesh(geometry, material); 
scene.add(cube);

//TODO-1 - Lights
// Create an ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 15); // Soft white light
scene.add(ambientLight)

// Create a hemisphere light

// Create a point light


//TODO-3: GUI setup
const gui = new GUI()
//Camera z position GUI
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 20)
cameraFolder.open()

//light intensity GUI

//Cube Color GUI


//TODO-2
//Use a Sphere as a skybox
//Texture

//Setup geometry

//add material


//add sphere to scene


//TODO-4 -  model loader
//Create a GLTF loader

//Load the 3D model

// Rotate the model in the animation
function animate() {
  requestAnimationFrame(animate)

  if (cube) {
    cube.rotation.y += 0.001
  }
  //FPS controller loop
  //const delta = clock.getDelta();
  //controls.update( delta );

  //Render loop
  renderer.render(scene, camera)

  stats.update()
}

animate()
