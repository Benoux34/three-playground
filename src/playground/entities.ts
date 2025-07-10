type CubeTexturePath = [
  string, // px
  string, // nx
  string, // py
  string, // ny
  string, // pz
  string // nz
];

type GLTFSource = {
  name: string;
  type: "gltfModel";
  path: string;
};

type TextureSource = {
  name: string;
  type: "texture";
  path: string;
};

type CubeTextureSource = {
  name: string;
  type: "cubeTexture";
  path: CubeTexturePath;
};

type Source = GLTFSource | TextureSource | CubeTextureSource;

type Sources = ReadonlyArray<Source>;

export type { Sources, Source, CubeTexturePath };
