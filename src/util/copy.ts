Animate.Util.copy = function (srcBase: any, src: any) {
  if (Animate.Util.typeOf(srcBase, 'function')) {
    return srcBase.bind({}, src);
  } else if (Animate.Util.typeOf(src, 'object') || Animate.Util.typeOf(src, 'array')) {
    const coping = JSON.parse(JSON.stringify(srcBase));
    for (let i in src) coping[i] = src[i];
    return coping;
  }
};
