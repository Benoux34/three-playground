import * as THREE from "three";
import Playground from "../Playground";
import Resources from "../utils/Resources";

type TexturesConfig = {
  color: THREE.Texture;
  normal: THREE.Texture;
};

export default class Floor {
  playground: Playground;
  scene: THREE.Scene;
  resources: Resources;
  geometry!: THREE.CircleGeometry;
  textures!: TexturesConfig;
  material!: THREE.MeshStandardMaterial;
  mesh!: THREE.Mesh;

  constructor() {
    this.playground = window.playground!;
    this.scene = this.playground.scene;
    this.resources = this.playground.resources;

    // Setup
    this.setGeometry();
    this.setTextures();

    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.CircleGeometry(5, 64);
  }

  setTextures() {
    this.textures = {
      color: this.resources.items.grassColorTexture as THREE.Texture,
      normal: this.resources.items.grassNormalTexture as THREE.Texture,
    };

    this.textures.color.colorSpace = THREE.SRGBColorSpace;
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;

    this.scene.add(this.mesh);
  }
}
