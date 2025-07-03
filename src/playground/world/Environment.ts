import * as THREE from "three";
import Playground from "../Playground";

export default class Environment {
  playground: Playground;
  scene: THREE.Scene;
  sunLight!: THREE.DirectionalLight;

  constructor() {
    this.playground = window.playground!;
    this.scene = this.playground.scene;

    // Setup
    this.setSunLight();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3, 3, -2.25);
    this.scene.add(this.sunLight);
  }
}
