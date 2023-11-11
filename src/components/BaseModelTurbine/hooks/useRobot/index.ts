import * as THREE from "three"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

// 创建一个场景
const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// 创建一个摄像机
/**
 * 相机设置
 */

let width = window.innerWidth; //窗口宽度
let height = window.innerHeight; //窗口高度
let k = width / height; //窗口宽高比
let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

/**
 * 光源设置
 */
  //点光源
let point = new THREE.PointLight(0xffffff,3);
point.position.set(400, 200, 300); //点光源位置
scene.add(point); //点光源添加到场景中
//环境光
let ambient = new THREE.AmbientLight(0x444444,3);
scene.add(ambient);

const loader = new GLTFLoader();

loader.load( 'modal/e-tron_sportback.glb', function ( gltf ) {
  let model =  gltf.scene
  // model.position.set(0,0,0)
  model.scale.set(2,2,2)
  console.log(model)
  scene.add(model);

  // 执行一个渲染函数
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  renderer.render( scene, camera );

  // const controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.addEventListener('change', ()=>{
    renderer.render( scene, camera );
  });//监听鼠标、键盘事件



}, undefined, function ( error ) {

  console.error( error );

} );