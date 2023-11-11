import {Clock, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";
import Stats from "three/examples/jsm/libs/stats.module";

const clock = new Clock()

class Loop {
  private readonly camera:PerspectiveCamera
  private readonly scene:Scene
  private renderer:WebGLRenderer
  private labelRenderer: CSS2DRenderer
  private stats: Stats
  updateArr: Array<any>

  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer, labelRenderer: CSS2DRenderer, stats: Stats) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.labelRenderer = labelRenderer
    this.updateArr = []
    this.stats = stats
  }

  start() {
    // 给设置动画，让每个帧都调用这个方法，每秒60帧速度渲染输出帧
    this.renderer.setAnimationLoop(() => {
      this.tick()
      this.renderer.render(this.scene, this.camera)
      this.labelRenderer.render(this.scene, this.camera)
      this.stats.update();
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }

  tick() {
    const delta = clock.getDelta()
    for (const obj of this.updateArr) {
      obj.tick(delta)
    }
  }

}

export {Loop}