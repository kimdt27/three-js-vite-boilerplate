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
//const controls = new FlyControls(camera, renderer.domElement);
//const controls = new FirstPersonControls(camera, renderer.domElement);

//FPS and FLY controls setup
/*controls.movementSpeed = 10;
controls.domElement = renderer.domElement;
controls.rollSpeed = Math.PI / 24;
controls.lookSpeed = 0.2;
controls.autoForward = false;
controls.dragToLook = true;*/

const clock = new THREE.Clock();

// Stats (performance monitoring)
const stats = new Stats()
document.body.appendChild(stats.dom)

//Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1); 
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); 
const cube = new THREE.Mesh(geometry, material); 
scene.add(cube);

//TODO-1 - Lights
// Create an ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 15); // Soft white light
scene.add(ambientLight)

// Create a hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
hemisphereLight.position.set(0, 5, 0);
scene.add(hemisphereLight)

// Create a point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 5, 5);
scene.add(pointLight)

//TODO-3: GUI setup
const gui = new GUI()
//Camera z position GUI
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 20)
cameraFolder.open()

//light intensity GUI
const lightFolder = gui.addFolder('Light')
lightFolder.add(ambientLight, 'intensity', 0, 10).name('Ambient Light Intensity')
lightFolder.add(hemisphereLight, 'intensity', 0, 10).name('Hemisphere Light Intensity')
lightFolder.add(pointLight, 'intensity', 0, 10).name('Point Light Intensity')
lightFolder.open()
//Cube Color GUI
const Boxcolor = { color: 0x00ff00 };
const cubeFolder = gui.addFolder('Cube')
cubeFolder.addColor(Boxcolor, 'color').name('Cube Color').onChange((value) => {
  cube.material.color.set(value);
});
cubeFolder.open();

//TODO-2
//Use a Sphere as a skybox
//Texture
const textureLoader = new THREE.TextureLoader()
const skyTexture = textureLoader.load('/360.jpg')

//Setup geometry
const skyGeometry = new THREE.SphereGeometry(100, 60, 40)
skyGeometry.scale(-1, 1, 1)

//add material
const skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture })
const skyMesh = new THREE.Mesh(skyGeometry, skyMaterial)
scene.add(skyMesh)

//add sphere to scene

//TODO-4 -  model loader
//Create a GLTF loader
const gltfLoader = new GLTFLoader()
let model

//Load the 3D model
gltfLoader.load('/gun.glb', (gltf) => {
  model = gltf.scene
  model.scale.setScalar(0.05);
  scene.add(model) // Scale the model down
})

// Rotate the model in the animation
function animate() {
  requestAnimationFrame(animate)

  if (model) {
    model.rotation.y += 0.001
  }
  //FPS controller loop
  //const delta = clock.getDelta();
  //controls.update( delta );

  //Render loop
  renderer.render(scene, camera)

  stats.update()
}

animate()
