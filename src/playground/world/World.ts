import * as THREE from "three";
import Playground from "../Playground";
import Resources from "../utils/Resources";
import Floor from "./Floor";
import Environment from "./Environment";
import Physics from "./Physics";
import Test from "./Test";
import Keyboard from "../utils/Keyboard";

export default class World {
  playground: Playground;
  scene: THREE.Scene;
  resources: Resources;
  keyboard: Keyboard;
  floor!: Floor;
  environment!: Environment;
  cube!: Test;
  physics!: Physics;

  constructor() {
    this.playground = window.playground!;
    this.scene = this.playground.scene;
    this.resources = this.playground.resources;
    this.keyboard = this.playground.keyboard;

    // Wait for resources
    this.resources.on("ready", () => {
      this.floor = new Floor();
      this.environment = new Environment();
      this.cube = new Test();
      this.physics = new Physics(this.floor, this.cube);
    });
  }

  update() {
    if (this.physics) this.physics.update();
  }
}
