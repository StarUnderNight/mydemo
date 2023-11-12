import {
  AxesHelper, Color,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from "three";
import {CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";
import {Loop} from "@/components/ThreeJS/sys/Loop.ts";
import {createCamera} from "@/components/ThreeJS/components/camera.ts";
import {createScene} from "@/components/ThreeJS/components/scene.ts";
import {createLabelRenderer, createRenderer} from "@/components/ThreeJS/sys/renderer.ts";
import {Resizer} from "@/components/ThreeJS/sys/Resizer.ts";
import {createControls} from "@/components/ThreeJS/sys/Controls.ts";
import {createAmbientLight, createDirectionLight} from "@/components/ThreeJS/components/light.ts";
import {PLYLoader} from "three/examples/jsm/loaders/PLYLoader";
import {createLabelWithLine} from "@/components/ThreeJS/components/label.ts";
import {createStats} from "@/components/ThreeJS/components/stats.ts";
import {createAxesHelper, createGridHelper} from "@/components/ThreeJS/components/helpers.ts";


let camera:PerspectiveCamera;
let scene:Scene;
let renderer:WebGLRenderer;
let labelRenderer:CSS2DRenderer
let loop:Loop;
let light: DirectionalLight;


class World {
  constructor(container: any) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    labelRenderer = createLabelRenderer()
    const stats = createStats()
    loop = new Loop(camera, scene, renderer, labelRenderer, stats)
    light = createDirectionLight()

    const controls = createControls(camera, labelRenderer.domElement, light)


    const resizer = new Resizer(container, camera, renderer, labelRenderer)

    container.appendChild(renderer.domElement)
    container.appendChild(labelRenderer.domElement)
    container.appendChild(stats.dom)
    loop.updateArr.push(controls)

    scene.add(light)

  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }

  async init() {
    this.initModel()
  }

  initModel() {
    let axesHelper = createAxesHelper();
    let gridHelper = createGridHelper();
    // scene.add(axesHelper);

    let loader = new PLYLoader();
    loader.load("/models/robot3.ply", function (geometry) {
      geometry.computeVertexNormals();  // 更新顶点的法向量

      // 创建纹理，并将模型添加到场景道中
      let material = new MeshStandardMaterial( { color: "white", flatShading: true } );
      let robot = new Mesh(geometry, material);
      robot.rotation.y = Math.PI;
      robot.scale.set(2, 2, 2);
      robot.position.x = -2
      robot.position.z = 4
      // robot.position.y = -2

      // 创建标签 (负前-正后，正左 负右，负上 正下)
      const rightLabel = createLabelWithLine(new Vector3(-6.8, -1.5, 1.8), new Vector3(-8, -2, 1), "右支腿", "收回");
      const leftLabel = createLabelWithLine(new Vector3(-7.2, 1.4, 1.8), new Vector3(-8, 2, 1), "左支腿", "收回");
      const leftWheel = createLabelWithLine(new Vector3(-4.2, 1, 4.1), new Vector3(-4, 3, 3), "左履带", "运行");
      const rightWheel = createLabelWithLine(new Vector3(-4.2, -1.5, 4), new Vector3(-4, -3, 3), "右履带", "运行");


      robot.add(rightLabel, leftLabel, leftWheel, rightWheel)
      scene.add( robot );
      scene.background = new Color((0x333333))
    });

      // const layers = {
      //     '启停标签': function () {
      //         camera.layers.toggle(1);
      //     }
      // };

      // let gui = new GUI();
      //
      // gui.title('操作');
      // gui.add(layers, '启停标签');
      // gui.open();

  }

}



export {World}