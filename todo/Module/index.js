
/**
 * Getter|Setter
 * Storage for static modules
 *
 * @param name    String
 * @param func    Function | Object
 * @constructor
 */

export class Module {

  static instance;
  private modules = {};

  constructor(name, func) {
    if (!Module.instance) {
      Module.instance = this;
    }

    if (arguments.length === 1)
      return this.modules[name];
    if (arguments.length === 2)
      return this.modules[name] = func;

    return Module.instance;
  }

}
