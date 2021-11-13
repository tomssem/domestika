const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
  duration: 30
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Radial {
  constructor(pos, radius, vel, radials, colour) {
    this.pos = pos;
    this.radius = radius;
    this.vel = vel;
    this.radials = radials;
    this.angle = 0;
    this.colour = colour;
  }
  
  draw(context, width, height) {
    context.save();
    context.strokeStyle = this.colour;
    this.lineWidth = 1000;
    context.translate(this.pos.x, this.pos.y);
    context.rotate(this.angle); 

    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.stroke();

    const angle = (2 * Math.PI) / this.radials;
    for(let i = 0; i < this.radials; ++i) {
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0, -this.radius);
      context.lineWidth = 1;
      context.stroke();
      context.rotate(angle);
    }

    context.restore();
  }

  update(time) {
    this.angle += (Math.PI * time * this.vel);
    if(time < 0.5) {
      this.radials = Math.max(1, time * 400);
    } else {
      this.radials = Math.max(1, (1 - time) * 400);
    }
  }
}

const sketch = () => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const offset = 200;
    const radius = 10000;
    let radial1 = new Radial(new Point(width / 2 - offset, height / 2 + 100), radius * 2, -1, 4000, "red");
    let radial2 = new Radial(new Point(width / 2 + offset, height / 2 - 100), radius, 1, 4000, "green");
    radial1.update(playhead);
    radial1.draw(context, width, height);
    radial2.update(playhead);
    radial2.draw(context, width, height);
  };
};

canvasSketch(sketch, settings);
