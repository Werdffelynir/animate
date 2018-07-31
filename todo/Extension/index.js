/**
 * Getter|Setter
 * Storage for static modules
 *
 * @param name    String
 * @param func    Function | Object
 * @constructor
 */
export class ExtensionsState {

  static instance;
  private extensions = [];

  constructor() {
    if (!ExtensionsState.instance) {
      ExtensionsState.instance = this;
    }
    return ExtensionsState.instance;
  }

  push(func) {
    this.extensions.push(func);
  }

  pull() {
    return this.extensions;
  }

}

export function Extension (func) {
  (new ExtensionsState()).push(func);
}
