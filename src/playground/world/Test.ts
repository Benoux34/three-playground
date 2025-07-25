import * as THREE from "three";
import Playground from "../Playground";

export default class Test {
  playground: Playground;
  scene: THREE.Scene;
  mesh: THREE.Mesh;

  constructor() {
    this.playground = window.playground!;
    this.scene = this.playground.scene;

    let geometry = new THREE.SphereGeometry(0.5);
    let material = new THREE.MeshBasicMaterial({ wireframe: true });
    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.y = 2.0;

    this.scene.add(this.mesh);
  }
}
