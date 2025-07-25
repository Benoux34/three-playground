import RAPIER from "@dimforge/rapier3d";
import Playground from "../Playground";
import Keyboard from "../utils/Keyboard";
import Floor from "./Floor";
import Test from "./Test";
import { getMeshSize } from "../utils/getMeshSize";

export default class Physics {
  playground: Playground;
  keyboard: Keyboard;
  world!: RAPIER.World;
  cubeRigidBody!: RAPIER.RigidBody;

  constructor(private floor: Floor, private cube: Test) {
    this.playground = window.playground!;
    this.keyboard = this.playground.keyboard;

    this.world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });

    this.createFloorCollider();
    this.createCubeBody();
  }

  private createFloorCollider() {
    const pos = this.floor.mesh.position;
    const size = getMeshSize(this.floor.mesh);

    const floorCollider = RAPIER.ColliderDesc.cuboid(
      size.x,
      size.y,
      size.z
    ).setTranslation(pos.x, pos.y - size.y, pos.z);

    this.world.createCollider(floorCollider);
  }

  private createCubeBody() {
    const pos = this.cube.mesh.position;

    const cubeRigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(
      pos.x,
      pos.y,
      pos.z
    );
    this.cubeRigidBody = this.world.createRigidBody(cubeRigidBodyDesc);

    const colliderDesc = RAPIER.ColliderDesc.ball(0.5);
    this.world.createCollider(colliderDesc, this.cubeRigidBody);
  }

  private setControls() {
    const torqueStrength = 0.03;
    let torque = { x: 0, y: 0, z: 0 };

    if (this.keyboard.isPressed("KeyW")) torque.x -= torqueStrength;
    if (this.keyboard.isPressed("KeyS")) torque.x += torqueStrength;
    if (this.keyboard.isPressed("KeyA")) torque.z += torqueStrength;
    if (this.keyboard.isPressed("KeyD")) torque.z -= torqueStrength;

    this.cubeRigidBody.addTorque(torque, true);

    this.keyboard.on("keyup", () => {
      this.cubeRigidBody.resetTorques(true);
    });
  }

  update() {
    this.world.step();

    this.setControls();

    if (this.cubeRigidBody) {
      const pos = this.cubeRigidBody.translation();
      const rot = this.cubeRigidBody.rotation();

      this.cube.mesh.position.set(pos.x, pos.y, pos.z);
      this.cube.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);
    }
  }
}
