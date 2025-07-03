import * as THREE from "three";
import Playground from "../Playground";
import Environment from "./Environment";

export default class World {
  playground: Playground;
  scene: THREE.Scene;
  environment: Environment;

  constructor() {
    this.playground = window.playground!;
    this.scene = this.playground.scene;

    // Setup
    this.environment = new Environment();

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );
    this.scene.add(testMesh);
  }
}
