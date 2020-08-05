export function Ball(position, properties, limit, context, gravity, friction) {
  let {x, y, dx, dy} = position;
  const { radius, color } = properties

  this.draw = function() {
    context.beginPath();
    context.arc(
      x,
      y,
      radius,
      0,
      Math.PI * 2,
      false);
    context.fillStyle = color;
    context.fill();
    context.stroke();
    context.closePath();
  };
  this.update = function(){
    if(y + radius + dy > limit) dy = (-dy * friction);
    else dy += gravity;
    if(x + radius + dx > limit || x - radius < 0) dx = (-dx * friction);
    x += dx;
    y += dy;
    this.draw();
  };

}