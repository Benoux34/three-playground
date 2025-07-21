import * as THREE from "three";
import Playground from "../Playground";
import Resources from "../utils/Resources";
import Floor from "./Floor";
import Environment from "./Environment";

export default class World {
  playground: Playground;
  scene: THREE.Scene;
  resources: Resources;
  floor!: Floor;
  environment!: Environment;

  constructor() {
    this.playground = window.playground!;
    this.scene = this.playground.scene;
    this.resources = this.playground.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      this.floor = new Floor();
      this.environment = new Environment();
    });
  }
}
