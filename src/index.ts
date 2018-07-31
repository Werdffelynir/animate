
interface AnimateEvent {
  onFrame: Function;
  onClick: Function;
  onMousemove: Function;
  onMousedown: Function;
  onMouseup: Function;
  onKeydown: Function;
  onKeyup: Function;
}

class Animate {

  static Util: any = {};
  static Extension: any = {};
  static Modules: any = {};

  public version: any = 1.54;
  public config: any;


  private _events: AnimateEvent | any = {};

  constructor (config = {}) {

    this.config = config;

    const gp: Function = (name: string) => {
      return { [name]: { set: (cb: Function) => { this._events[name] = cb }} }
    };

    Object.defineProperties(this, {
    ...gp('onFrame') ,
    ...gp('onClick') ,
    ...gp('onMousemove') ,
    ...gp('onMousedown') ,
    ...gp('onMouseup') ,
    ...gp('onKeydown') ,
    ...gp('onKeyup') ,
    });

    let c = new Clip();
    let m = new Movieclip();

  }

  loop () {}

  draw () {}

  drawframe () {}

}
