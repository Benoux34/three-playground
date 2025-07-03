import type Playground from "./playground/Playground";

export {};

declare global {
  interface Window {
    playground: Playground;
  }
}
