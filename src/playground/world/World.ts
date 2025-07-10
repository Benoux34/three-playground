import * as THREE from "three";
import Playground from "../Playground";
import Environment from "./Environment";
import Resources from "../utils/Resources";

export default class World {
  playground: Playground;
  scene: THREE.Scene;
  environment!: Environment;
  resources: Resources;

  constructor() {
    this.playground = window.playground!;
    this.scene = this.playground.scene;
    this.resources = this.playground.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      this.environment = new Environment();
    });

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );
    this.scene.add(testMesh);
  }
}
