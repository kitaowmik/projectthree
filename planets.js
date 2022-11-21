import * as THREE from './build/three.module.js';
import {FlyControls} from './src/FlyControls.js';
import { GLTFLoader } from './src/GLTFLoader.js';
import Stats from './src/stats.module.js';

let controls, stats, pointLight;


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();

const starGeo = new THREE.BufferGeometry();
const starMat = new THREE.PointsMaterial({color: 0xffffff});

const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

const starPos = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 5000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -(Math.random() - 0.5) * 2000
    starPos.push(x,y,z);
}

starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
renderer.setClearColor(0x000000);
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

camera.position.set(0,0.35,10);


let planetOne = new THREE.Object3D();
const loaderOne = new GLTFLoader().load(
    "./assets/grayplanet.glb",
    function(gltf) {
    planetOne = gltf.scene;
    planetOne.position.set(0,0,0);
    planetOne.rotation.set(0, 0, 0); 
    planetOne.scale.set(.3, .3, .3);
    scene.add(planetOne);
    },
    undefined,
    function(error) {
    console.error(error);
    }
);

let planetTwo = new THREE.Object3D();
const loaderTwo = new GLTFLoader().load(
    "./assets/grayplanetCopy.glb",
    function(gltftwo) {
    planetTwo = gltftwo.scene;
    planetTwo.position.set(-0.9,0,.5);
    planetTwo.rotation.set(0, .6, .2); 
    planetTwo.scale.set(0.2, .2, .2);
    scene.add(planetTwo);
    },
    undefined,
    function(error) {
    console.error(error);
    }
);

let planetThree = new THREE.Object3D();
const loaderThree = new GLTFLoader().load(
    "./assets/planetcrater.glb",
    function(gltfthree) {
    planetThree = gltfthree.scene;
    planetThree.position.set(-0.9,0,.5);
    planetThree.rotation.set(0, .6, .2); 
    planetThree.scale.set(0.2, .2, .2);
    scene.add(planetThree);
    },
    undefined,
    function(error) {
    console.error(error);
    }
);



/*et spaceDust = new THREE.Object3D();
const loaderThree = new GLTFLoader().load(
    "./assets/asteroids.glb",
    function(gltfthree) {
    spaceDust = gltfthree.scene;
    spaceDust.position.set(-0.9,0,.5);
    spaceDust.rotation.set(0, 0, 0); 
    spaceDust.scale.set(0.2, .2, .2);
    scene.add(spaceDust);
    },
    undefined,
    function(error) {
    console.error(error);
    }
);*/

controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 15;
controls.rollSpeed = Math.PI/15;

const light = new THREE.DirectionalLight( 0xFFFFFF, 3.5);
light.position.set( 200, 20, 10);
scene.add(light);


pointLight = new THREE.PointLight( 0xffffff, 1 );
scene.add( pointLight );

pointLight.add( new THREE.Mesh( new THREE.SphereGeometry( 2, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );

const ambientLight = new THREE.AmbientLight(0xD66868, 0.5);
scene.add(ambientLight);
 let t = 0;
function animate() {

    t += 0.005;
    const timer = 0.0001 * Date.now();

  
    planetOne.rotation.y += 0.005;
    planetTwo.rotation.y += 0.02;
    planetThree.rotation.y += 0.02;

    planetTwo.position.x = 5.5 * Math.cos(t) + 0;
    planetTwo.position.y = 2 * Math.cos(t) + 0;
    planetTwo.position.z = 5 * Math.sin(t) + 0;

    planetThree.position.x = -2 * Math.cos(t + 0.005) + 0;
    planetThree.position.y = 0.5 * Math.cos(t + 0.005) + 0;
    planetThree.position.z = 4 * Math.sin(t + 0.005) + 0;
    
    pointLight.position.x = Math.sin( timer * 7 ) * 300;
    pointLight.position.y = Math.cos( timer * 5 ) * 400;
    pointLight.position.z = Math.cos( timer * 3 ) * 300;

    requestAnimationFrame(animate);

    controls.update(clock.getDelta());
    renderer.render( scene, camera );
   
}
animate();