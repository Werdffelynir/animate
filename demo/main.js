
/*const an = new Animate({
  selector: '#canvas',
  fps: 1,
});

an.onFrame = function frame () {};
an.onMousedown = function md () {};

an.frame({
  x: 100,
  y: 100,
  w: 200,
  h: 100,
  r: 1
}, function (context, iter)  {
  /!** @type CanvasRenderingContext2D *!/
  const ctx = context;
  const {x, y, w, h, r} = this;
  const rad = Animate.Util.degreesToRadians(45);
  let dx = x;
  let dy = y;

  ctx.fillStyle = '#ddd';

  ctx.save();
  ctx.translate(dx, dy);
  ctx.rotate(rad);
  ctx.fillRect(0, 0, w, h);

  ctx.restore();

  ctx.save();
  ctx.translate(x, y);
  ctx.strokeRect(0, 0, w, h);
  ctx.restore();
});

an.start();*/


/*
console.log(an);
ctx.font = '52px/52px sans';
ctx.fillText('RTX:' + iter + '  ' + an.fps, 100, 200);
console.log('iter', iter, an.fps)*/
