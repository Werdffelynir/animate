
Animate.Util.degreesToRadians = function (deg: number) {
  return (deg * Math.PI) / 180;
};


Animate.Util.radiansToDegrees = function (rad: number) {
  return (rad * 180) / Math.PI;
};

Animate.Util.distanceBetween = function (p1: any, p2: any) {
  const dx: number = p2.x - p1.x;
  const dy: number = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

Animate.Util.calculateAngle = function (p1: any, p2: any) {
  const dx: number = p2.x - p1.x;
  const dy: number = p2.y - p1.y;
  const angle: number = Math.atan2(dy, dx);
  return {
    angle: angle,
    x: Math.cos(angle),
    y: Math.sin(angle)
  };
};