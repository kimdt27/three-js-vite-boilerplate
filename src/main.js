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
renderer.setClearColor(0xE08080);

//Resize event
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

//Controls
new OrbitControls(camera, renderer.domElement)
//const controls = new FirstPersonControls( camera, renderer.domElement );
//const controls = new FlyControls( camera, renderer.domElement );

//FPS and Fly control settings
/*controls.movementSpeed = 10;
controls.domElement = renderer.domElement;
//controls.rollSpeed = Math.PI / 2;
controls.lookSpeed = 0.2;
controls.autoForward = false;
//controls.dragToLook = true;

const clock = new THREE.Clock();
*/

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
const ambientLight = new THREE.AmbientLight(0x404040, 8); // Soft white light
scene.add(ambientLight)

// Create a hemisphere light
const hemiLight = new THREE.HemisphereLight(0x00ddff, 0xdd9900, 1) // Sky color, ground color, intensity
hemiLight.position.set(0, 5, 0)  // Light position
scene.add(hemiLight)

// Create a point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 5, 5); // Place the light closer to the object
scene.add(pointLight)

// GUI setup
const gui = new GUI()
//Camera z position GUI
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 20)
cameraFolder.open()


//light intensity GUI
const lightFolder = gui.addFolder('Lighting');
lightFolder.add(ambientLight, 'intensity', 0, 50, 0.1).name('Ambient Light');
lightFolder.add(hemiLight, 'intensity', 0, 50, 0.1).name('Hemi Light');
lightFolder.add(pointLight, 'intensity', 0, 50, 0.1).name('Point Light');
lightFolder.open();

//Cube Color GUI
const BoxColor = {
  color: 0x00ff00, // Initial color (green)
};
const cubeFolder = gui.addFolder('Cube');
cubeFolder.addColor(BoxColor, 'color').name('Color').onChange((value) => {
  cube.material.color.set(value);
});
cubeFolder.open();

//TODO-2
//Use a Sphere as a skybox
//Texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/360.jpg');

//Setup geometry
const sphereGeometry = new THREE.SphereGeometry(100, 60, 40);
sphereGeometry.scale(-1, 1, 1);  // Invert geometry so the camera can look inside the sphere

//add material
const bgmaterial = new THREE.MeshBasicMaterial({
  map: texture,
  //side: THREE.BackSide,  // Alt way to look at inside of the sphere
});

//add sphere to scene
const sphere = new THREE.Mesh(sphereGeometry, bgmaterial);
scene.add(sphere);

//TODO-4 -  model loader
// Create a GLTF loader
const loader = new GLTFLoader()
let model

// Load the 3D model
loader.load('/gun.glb', (gltf) => {
  model = gltf.scene
  model.scale.setScalar(0.05);
  scene.add(model)
})

// Rotate the model in the animation
function animate(){
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
