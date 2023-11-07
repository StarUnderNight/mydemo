import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DirectionalLight, PerspectiveCamera} from "three";

function createControls(camera:PerspectiveCamera, canvas:HTMLElement, light:DirectionalLight) {
  const controls = new OrbitControls(camera, canvas)

  // 如果使用animate方法时，将此函数删除
  //controls.addEventListener( 'change', render );
  // 使动画循环使用时阻尼或自转 意思是否有惯性
  controls.enableDamping = true
  //动态阻尼系数 就是鼠标拖拽旋转灵敏度
  //controls.dampingFactor = 0.25;
  //是否可以缩放
  controls.enableZoom = false
  //是否自动旋转
  controls.autoRotate = false
  controls.autoRotateSpeed = 0.5

  //是否开启右键拖拽
  controls.enablePan = true;

  // controls.minPolarAngle = Math.PI / 2;
  // controls.maxPolarAngle = Math.PI / 2;

  // 调用相机轨迹插件的更新函数
  (controls as any).tick = (delta) => {
    const vector = camera.position.clone()
    light.position.copy(vector)
    controls.update();
  }

  return controls
}

export {createControls}