import {WebGLRenderer} from "three";
import {CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";


function createRenderer() {
  const renderer = new WebGLRenderer({antialias: true})  //  启用抗锯齿
  renderer.setSize(window.innerWidth, window.innerHeight);
  //告诉渲染器需要阴影效果
  renderer.setClearColor(0xffffff, 0.0);  // 第二个参数表示透明度0
  return renderer
}

function createLabelRenderer() {
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize( window.innerWidth, window.innerHeight );
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';

  return labelRenderer
}

export {createRenderer, createLabelRenderer}