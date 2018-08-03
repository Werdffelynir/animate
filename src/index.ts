
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

  public configuration: any = {
    selector: null,
    width: 800,
    height: 600,
    fps: 30,
    fullscreen: false,
  };

  private _frames: any = { default: <Array<any>> [] };
  private _events: AnimateEvent | any = {};
  private _canvas: HTMLCanvasElement | any;
  private _context: CanvasRenderingContext2D | any;

  private _fpsTimeNow: number;
  private _fpsTimeThen: number;
  private _fpsTimeFirst: number;
  private _fpsDelta: number;
  private _fpsInterval: number;
  private _requestanimationframeid: any;

  private _paused: boolean = false;
  private _iteration: number = 0;

  constructor (config: any) {

    const eventSetter: Function = (name: string) => {
      return { [name]: { set: (cb: Function) => { this._events[name] = cb }} }
    };

    this.configuration = {
      ...this.configuration,
      ...config
    };

    Object.defineProperties(this, {
      ...eventSetter('onFrame') ,
      ...eventSetter('onClick') ,
      ...eventSetter('onMousemove') ,
      ...eventSetter('onMousedown') ,
      ...eventSetter('onMouseup') ,
      ...eventSetter('onKeydown') ,
      ...eventSetter('onKeyup') ,
      fps: { get: () => Math.ceil(this._iteration / ( (this._fpsTimeThen - this._fpsTimeFirst) / 1000)) },
      canvas: { get: () => this._canvas },
      context: { get: () => this._context },
      config: { writable: false, value: this.configuration },
      width: { writable: false, value: this.configuration.width },
      height: { writable: false, value: this.configuration.height },
    });

    try {
      this._canvas = document.querySelector(this.configuration.selector);

      this._canvas.width = this.configuration.width;
      this._canvas.height = this.configuration.height;

      this._context = this._canvas.getContext('2d');
      this._fpsInterval = 1000 / this.configuration.fps;

    } catch (e) {
      throw new Error('Error of query canvas. Selector [' +  this.configuration.selector + '] is not type of HTMLCanvasElement');
    }

    let c = new Clip();
    let m = new Movieclip();

  }

  getFPS ():number {
    return Math.ceil(this._iteration / ( (this._fpsTimeThen - this._fpsTimeFirst) / 1000));
  }

  getCanvas ():HTMLCanvasElement {
    return this._canvas;
  }

  getContext ():CanvasRenderingContext2D {
    return this._context;
  }
  getConfig (param?: string) {
    return param ? this.configuration[param] : this.configuration ;
  }

  getSize (side?: string) {
    switch (side) {
      case 'w': case 'width': return this.configuration.width;
      case 'h': case 'height': return this.configuration.height;
      default:
        return {width: this.configuration.width, height: this.configuration.height}
    }
  }

  loop () {

    if (!this._paused) {
      this._requestanimationframeid = requestAnimationFrame( () => this.loop() );
      this._fpsTimeNow = Date.now();
      this._fpsDelta = this._fpsTimeNow - this._fpsTimeThen;
      if (this._fpsDelta > this._fpsInterval) {
        this._fpsTimeThen = this._fpsTimeNow - ( this._fpsDelta % this._fpsInterval );
        this._iteration ++;
        this.clear();
        this.draw();
      }
    }
  }

  draw (frameName: string = 'default') {
    this._frames[frameName].map((cb: Function) =>
      cb.bind(this)(this._context as CanvasRenderingContext2D, this._iteration as number));
  }

  stop () {
    this._paused = true;
    window.cancelAnimationFrame(this._requestanimationframeid)
  }

  pause () {
    this._paused = ! this._paused;
  }

  start () {
    this._fpsTimeThen = Date.now();
    this._fpsTimeFirst = this._fpsTimeThen;
    this.loop();
  }

  clear () {
    this._context.clearRect(0, 0, this.configuration.width, this.configuration.height );
  }

  frame (params: any, cb: Function) {
    this._frames.default.push(cb.bind(params));
  }

}















