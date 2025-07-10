import * as THREE from "three";
import Playground from "../Playground";
import Resources from "../utils/Resources";

type EnvironmentMapConfig = {
  intensity: number;
  texture: THREE.Texture;
};

export default class Environment {
  playground: Playground;
  scene: THREE.Scene;
  resources: Resources;
  sunLight!: THREE.DirectionalLight;
  environmentMap!: EnvironmentMapConfig;

  constructor() {
    this.playground = window.playground!;
    this.scene = this.playground.scene;
    this.resources = this.playground.resources;

    // Setup
    this.setSunLight();
    this.setEnvironmentMap();
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

  setEnvironmentMap() {
    this.environmentMap = {
      intensity: 0.4,
      texture: this.resources.items.environmentMapTexture as THREE.Texture,
    };

    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;
    this.scene.environment = this.environmentMap.texture;
  }
}
