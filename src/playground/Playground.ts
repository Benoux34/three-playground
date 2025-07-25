import * as THREE from "three";
import Debug from "./utils/Debug";
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./world/World";
import Resources from "./utils/Resources";
import sources from "./sources";

let instance: Playground | null = null;

export default class Playground {
  canvas!: HTMLCanvasElement | OffscreenCanvas | undefined;
  debug!: Debug;
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
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
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
    this.world.update();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) this.debug.ui.destroy();
  }
}
