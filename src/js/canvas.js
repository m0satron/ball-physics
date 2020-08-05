import utils, { randomIntFromRange } from './utils';
import colors from './colors'

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const gravity = 1;
const friction = 0.9;

addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
});

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
});

function Ball(x, y, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
      false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  };
  this.update = function(){
    if(this.y + this.radius > canvas.height) this.dy = (-this.dy * friction);
    else this.dy += gravity;
    console.log(` velocity: ${this.dy}\n`,`position: ${this.y}\n`)
    this.y += this.dy;
    this.draw();
  };

}

// let ball;
let ballArray = []
function init() {
  // ball = new Ball(canvas.width / 2, canvas.height / 2, 1, 30, 'red')
  for (let i = 0; i < 100; i++) {
    const x = randomIntFromRange(0, canvas.width);
    const y = randomIntFromRange(0, canvas.height);
    ballArray.push(new Ball(x, y, 2, 30, 'red'));
  }
}

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}

init();
animate();