import * as THREE from "three";
import Playground from "./Playground";
import Sizes from "./utils/Sizes";
import Camera from "./Camera";

export default class Renderer {
  playground: Playground;
  canvas: HTMLCanvasElement | OffscreenCanvas | undefined;
  sizes: Sizes;
  scene: THREE.Scene;
  camera: Camera;
  instance!: THREE.WebGLRenderer;

  constructor() {
    this.playground = window.playground!;
    this.canvas = this.playground.canvas;
    this.sizes = this.playground.sizes;
    this.scene = this.playground.scene;
    this.camera = this.playground.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
