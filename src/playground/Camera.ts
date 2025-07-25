import * as THREE from "three";
import Playground from "./Playground";
import Sizes from "./utils/Sizes";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  playground: Playground;
  sizes: Sizes;
  scene: THREE.Scene;
  canvas: HTMLCanvasElement | null;
  instance!: THREE.PerspectiveCamera;
  controls!: OrbitControls;

  constructor() {
    this.playground = window.playground!;
    this.sizes = this.playground.sizes;
    this.scene = this.playground.scene;
    this.canvas = this.playground.canvas as HTMLCanvasElement | null;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
