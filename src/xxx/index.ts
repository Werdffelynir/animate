
/////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function(event) {

  const an = new Animate({
    selector: '#canvas',
    fps: 60,
  });

  const clip = (cb: Function) => {
    const ctx: CanvasRenderingContext2D = an.getContext();
    ctx.save();
    cb(ctx);
    ctx.restore();
  };

  an.frame({
    x: 100,
    y: 100,
    w: 200,
    h: 100,
    r: 45
  }, function (ctx: CanvasRenderingContext2D, iter: number)  {

    const {x, y, w, h, r} = this;
    const rad = Animate.Util.degreesToRadians(r);

    // work v2
    ctx.save();
    ctx.translate(x, y);

    clip((ctx: CanvasRenderingContext2D) => {
      ctx.translate(0, 0);
      ctx.strokeRect(0, 0, w, h);
    });

    clip((ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.translate( w/2,  h/2);
      ctx.rotate(rad);
      ctx.fillRect(-w/2, -h/2, w, h);
    });

    ctx.restore();


    this.r ++;

    if (this.r > 360) {
      this.r = 0;
    }

    /* // work v1
    clip((ctx: CanvasRenderingContext2D) => {
      ctx.translate(x, y);
      ctx.strokeRect(0, 0, w, h);
    });

    clip((ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.translate(x + w/2, y + h/2);
      ctx.rotate(rad);
      ctx.fillRect(-w/2, -h/2, w, h);
    });*/

  });

  an.start();

});
