import Playground from "./playground/Playground";

const playground = new Playground(
  document.querySelector("canvas.webgl") as
    | HTMLCanvasElement
    | OffscreenCanvas
    | undefined
);
