import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "three"

import { setupModel } from './setupModel.js';
function processCallback(){

}

async function loadBirds() {
  const manager = new THREE.LoadingManager()
  const loader = new GLTFLoader(manager);

  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync('/models/Parrot.glb', processCallback),
    loader.loadAsync('/models/Flamingo.glb', processCallback),
    loader.loadAsync('/models/Stork.glb', processCallback),
  ]);

  console.log('Squaaawk!', parrotData);

  const parrot = setupModel(parrotData);
  parrot.position.set(0, 0, 2.5);

  const flamingo = setupModel(flamingoData);
  flamingo.position.set(7.5, 0, -10);

  const stork = setupModel(storkData);
  stork.position.set(0, -2.5, -10);

  return {
    parrot,
    flamingo,
    stork,
  };
}

export { loadBirds };
