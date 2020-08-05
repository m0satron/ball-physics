import { randomIntFromRange, randomColor } from './utils';
import { Ball } from './Ball'
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



let ballArray = []
function init() {
  
  for (let i = 0; i < 20; i++) {
    const properties = {
      color: randomColor(colors),
      radius: randomIntFromRange(10, 100)
    }
    const startingPoint = {
      x: randomIntFromRange(properties.radius, canvas.width - properties.radius),
      y: randomIntFromRange(0, canvas.height - properties.radius),
      dx: randomIntFromRange(-2, 2),
      dy: randomIntFromRange(-2, 2),
      
    }
    ballArray.push(new Ball(startingPoint, properties, limit, context, gravity, friction));
  }
}

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)
 ballArray.forEach(ball => ball.update())

}

init();
animate();