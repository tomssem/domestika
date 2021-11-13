const canvasSketch = require('canvas-sketch');
import {math, random} from "canvas-sketch-util"

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const animate = () => {
  console.log("something");
  requestAnimationFrame(animate);
}

// animate();

const distance = (v1, v2) => {
  return Math.sqrt((v1.pos.x - v2.pos.x)**2 + (v1.pos.y - v2.pos.y)**2);
}


const sketch = ({ context, width, height }) => {
  const numAgents = 40;
  let agents = [];

  for(let i = 0; i < numAgents; ++i) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for(let i = 0; i < agents.length; ++i) {
      const agent = agents[i];

      for(let j = i + 1; j < agents.length; ++j) {
        const other = agents[j];

        const d = distance(agent, other);

        if(d < (width / 1)) {

          context.save();
          context.beginPath();
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          const width = 10 * (1 - d / height)**6;
          // context.strokeStyle = `rgba(0, 0, 0, ${alpha})`
          context.lineWidth = width;
          context.stroke();
          context.restore();
      }
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    if(this.pos.x <= this.radius || (this.pos.x >= (width - this.radius))) {
      this.vel.x *= -1;
    }
    if(this.pos.y <= this.radius || (this.pos.y >= (height - this.radius))) {
      this.vel.y *= -1;
    }
  }

  draw(context) {
    context.save();

    context.lineWidth = 4;
    context.translate(this.pos.x, this.pos.y);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2*Math.PI);
    context.fill();
    context.stroke();

    context.restore();
  }
}
