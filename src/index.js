import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

//场景
const scene = new THREE.Scene();
//透视镜头
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//移动镜头
// camera.position.z = 4;
//渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
//追加的页面
document.body.appendChild(renderer.domElement);


// 创建控制器
// const controls = new TrackballControls( camera, renderer.domElement );
// controls.minDistance = 0;
// controls.maxDistance = 100;
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(15, 0, 20);
controls.update();


//立方体
// const geometry = new THREE.BoxGeometry();
//材质
// const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

// let cube, mixer, action;
//渲染
function animate() {
    requestAnimationFrame(animate);
    controls.update();	//更新控制器.
    renderer.render(scene, camera);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

}

const loader = new GLTFLoader();
loader.load('../models/japanese_house/scene.gltf', function (gltf) {

    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.material.emissive = child.material.color;
            child.material.emissiveMap = child.material.map;
        }
    });

    //添加到场景
    scene.add(gltf.scene);
    //网格
    // cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    //模型动画
    // mixer = new THREE.AnimationMixer(gltf.scene);
    // action = mixer.clipAction(gltf.animations[0]);
    // action.play();


    animate();


}, undefined, function (error) {
    console.error(error);
});








