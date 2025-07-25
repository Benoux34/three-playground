import { Mesh, Vector3 } from "three";

const getMeshSize = (mesh: Mesh) => {
  // Récupère la taille du floor
  let geometrySize = new Vector3();
  mesh.geometry.computeBoundingBox();
  mesh.geometry.boundingBox!.getSize(geometrySize);

  // Calcule les demi-tailles (Rapier attend des "half extents")
  return geometrySize.clone().multiplyScalar(0.5);
};

export { getMeshSize };
