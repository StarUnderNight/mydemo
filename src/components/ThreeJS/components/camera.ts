import {PerspectiveCamera, Vector3} from "three";
import * as THREE from "three";


function createCamera() {
  let camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, -30, 0);
  camera.lookAt(new THREE.Vector3(0, 0 , 0));
  camera.up = new Vector3(0, 0, 1)  // 设置可以沿着x和z轴旋转

  return camera
}

export {createCamera}