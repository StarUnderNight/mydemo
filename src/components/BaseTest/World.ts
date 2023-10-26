import { loadBirds } from './birds/birds.ts';
import { createCamera } from './tool/camera.ts';
import { createLights } from './tool/lights.ts';
import { createScene } from './tool/scene.ts';

import { createControls } from './sys/controls.ts';
import { createRenderer } from './sys/renderer.ts';
import { Resizer } from './sys/Resizer.ts';
import { Loop } from './sys/Loop.ts';

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds();

    // move the target to the center of the front bird
    controls.target.copy(parrot.position);

    scene.add(parrot, flamingo, stork);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
