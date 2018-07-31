
class Movieclip {

  public visibility: boolean = false;

  constructor () {
    this.visibility = true;
  }

  create (options: any, callback: any, thisInstance?: any) {
    return (...args: any[]) => {
      return callback.bind(options).apply(thisInstance || {}, args)
    };
  }

}
