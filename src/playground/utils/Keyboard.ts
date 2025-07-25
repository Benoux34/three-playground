import EventEmitter from "./EventEmitter";

export default class Keyboard extends EventEmitter {
  keys: Record<string, boolean> = {};

  constructor() {
    super();

    window.addEventListener("keydown", (event) => {
      if (this.keys[event.code]) return;
      this.keys[event.code] = true;
      this.trigger("keydown", [event.code]);
    });

    window.addEventListener("keyup", (event) => {
      this.keys[event.code] = false;
      this.trigger("keyup", [event.code]);
    });
  }

  isPressed(code: string): boolean {
    return !!this.keys[code];
  }
}
