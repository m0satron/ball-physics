import { 
  randomIntFromRange,
  randomColor,
  distance,
  rotate,
  resolveCollision
} from './utils';
import {colors} from './colors'

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

const limit = canvas.width && canvas.height;

addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
});

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
});

function Ball(x, y, radius, color)  {
    this.x = x
    this.y = y
    this.velocity = {
      x: Math.random() - 20,
      y: Math.random() - 20
    };
    this.radius = radius
    this.color = color
    this.mass = 1;
  
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
    context.stroke();
    context.closePath();
  };
  this.update = function() {
    this.draw();
    for(let i = 0; i < particles.length; i++) {
      if(this === particles[i]) continue;
      if(distance(this.x, this.y, particles[i].x, particles[i].y) - (this.radius * 2) < 0) {
        this.color = particles[i].color;
        if(this.radius > 0) {this.radius -= 1;}
        particles[i].radius += 1;
        resolveCollision(this, particles[i]);
      }
    }
    if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
        this.velocity.x = -this.velocity.x;
      }
    if(this.y - this.radius <= 0 ||this.y + this.radius >= innerHeight) {
        this.velocity.y = -this.velocity.y;
      }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };

}



let particles = [];
// let ball1 = new Ball(300, 300, 100, 'black')
// let ball2 = new Ball(undefined, undefined, 20, 'red')
function init() {
  for (let i = 0; i < 50; i++) {
    const color = randomColor(colors)
    const radius =  randomIntFromRange(10, 100)
    const x = randomIntFromRange(radius, canvas.width - radius)
    const y = randomIntFromRange(0, canvas.height - radius)

    if(i !== 0) {
      for(let j = 0; j < particles.length; j++){
        if(distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, canvas.width - radius)
          y = randomIntFromRange(0, canvas.height - radius)

          j = -1;
        }
      }
    }

    particles.push(new Ball(x, y, radius, color));
    }
  }



function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)
  // ball1.update();
  // ball2.x = mouse.x;
  // ball2.y = mouse.y;
  // ball2.update();
  particles.forEach(ball => ball.update());
  // if(distance(ball1.x, ball1.y, ball2.x, ball2.y) < ball1.radius + ball2.radius) ball1.color = 'green';
  // else ball1.color = 'black'; 

}

init();
animate();