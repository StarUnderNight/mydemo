import {DirectionalLight, PerspectiveCamera, Renderer, WebGLRenderer} from "three";
import {CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";

const setSize = (container: HTMLElement, camera: PerspectiveCamera, renderer:WebGLRenderer, labelRender:CSS2DRenderer) => {
  camera.aspect = container.clientWidth / container.clientHeight

  // 相机更新其四个属性值后，其平截头体不会自动更新，需要调用updateProjectionMatrix更新
  camera.updateProjectionMatrix()

  renderer.setSize(container.clientWidth, container.clientHeight)  // 更新canvas画布大小
  renderer.setPixelRatio(window.devicePixelRatio)  // 设置像素，保证匹配任何设备

  labelRender.setSize(container.clientWidth, container.clientHeight)
}

class Resizer {
  constructor(container: HTMLElement, camera:PerspectiveCamera, renderer:WebGLRenderer, labelRender:CSS2DRenderer) {
    setSize(container, camera, renderer, labelRender)

    window.addEventListener("resize", () => {
      setSize(container, camera, renderer, labelRender)

      // 回调函数 当更改窗口大小时，调用onResize方法，该方法已经在外部被World进行重新赋值
      this.onResize()
    })
  }

  onResize() {

  }



}



export {Resizer}