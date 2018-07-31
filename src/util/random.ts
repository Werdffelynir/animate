Animate.Util.random = function (min: number, max: number) {
  min = min || 0;
  max = max || 100;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

Animate.Util.randomColor = function () {
  let letters = '0123456789ABCDEF'.split(''),
    color = '#';
  for (let i = 0; i < 6; i++)
    color += letters[Math.floor(Math.random() * 16)];
  return color;
};

Animate.Util.randomItem = function (list: Array<any>) {
  return list[Animate.Util.random(0, list.length-1)];
};

