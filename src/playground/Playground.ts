import * as THREE from "three";
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./world/World";
import Resources from "./utils/Resources";

let instance: Playground | null = null;

export default class Playground {
  canvas!: HTMLCanvasElement | OffscreenCanvas | undefined;
  sizes!: Sizes;
  time!: Time;
  scene!: THREE.Scene;
  resources!: Resources;
  camera!: Camera;
  renderer!: Renderer;
  world!: World;

  constructor(canvas: HTMLCanvasElement | OffscreenCanvas | undefined) {
    // Singleton
    if (instance) return instance;
    instance = this;

    // Global Access
    window.playground = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources();
    this.camera = new Camera();

    this.renderer = new Renderer();

    this.world = new World();

    // Resize Event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time Tick Event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }
}
