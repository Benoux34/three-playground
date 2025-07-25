import RAPIER from "@dimforge/rapier3d";
import Floor from "./Floor";
import Test from "./Test";
import { getMeshSize } from "../utils/getMeshSize";

export default class Physics {
  world!: RAPIER.World;
  cubeRigidBody!: RAPIER.RigidBody;

  constructor(private floor: Floor, private cube: Test) {
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
    const size = getMeshSize(this.cube.mesh);

    const cubeRigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(
      pos.x,
      pos.y,
      pos.z
    );
    this.cubeRigidBody = this.world.createRigidBody(cubeRigidBodyDesc);

    const colliderDesc = RAPIER.ColliderDesc.cuboid(size.x, size.y, size.z);
    this.world.createCollider(colliderDesc, this.cubeRigidBody);
  }

  update() {
    this.world.step();

    if (this.cubeRigidBody) {
      const pos = this.cubeRigidBody.translation();
      const rot = this.cubeRigidBody.rotation();

      this.cube.mesh.position.set(pos.x, pos.y, pos.z);
      this.cube.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);
    }
  }
}
