const canvasSketch = require('canvas-sketch');
import {math, random} from "canvas-sketch-util"

// random.setSeed(1000003);

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
  duration: 10
};

const drawTrapezoid = (context, base, height, top) => {

}

// context.save();
//         context.translate(cx, cy);
//         context.rotate(angle);
//         context.translate(0, radius* random.range(0.5, 1));
//         context.scale(random.range(0.1, 1), random.range(0.2, 3));
//         context.skew
    
//         context.beginPath();
//         context.rect(random.range(0, -w / 2), random.range(0, -h / 2), w, h);
//         context.fill();
    
//         context.restore();

class Radial {
  constructor(cx, cy,  w, h, radius, i, slice, colour) {
    this.offset = radius * random.range(0.5, 1);
    this.width = random.range(0.1, 1);
    this.height =  random.range(0.2, 3);
    this.cx = cx;
    this.cy = cy;
    this.w = w;
    this.h = h;
    this.radius = radius;
    this.baseRadius = this.radius;
    this.angle = i * slice;
    this.colour = colour;
    this.x = random.range(0, -this.w / 2);
    this.y = random.range(0, -this.h / 2);

    const angleChange = math.degToRad(1);
    this.angleUpdate = random.range(-angleChange, angleChange);

    this.offsetChange = random.range(-5, 5);
  }

  draw(context, width, height) {
    context.save();
    context.fillStyle = this.colour;
    context.translate(this.cx, this.cy);
    context.rotate(this.angle);
    context.translate(0, this.offset);
    context.scale(this.width, this.height);

    context.beginPath();
    context.rect(this.x, this.y, this.w, this.h);
    context.fill();

    context.restore();
  }

  update(playhead) {
    this.angle += this.angleUpdate;

    this.offset += this.offsetChange * Math.cos((Math.PI  / 2)+ playhead * 2 * Math.PI);

    this.width += 0.005 * Math.cos((3 * Math.PI / 2) + playhead * 2 * Math.PI);
    this.height += 0.01 * Math.cos(playhead * 2 * Math.PI);
  }
}

class Arc{
  constructor(cx, cy, radius, i, slice) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius * random.range(0, 1.3);
    this.baseRadius = this.radius;
    this.i = i;
    this.slice = slice;
    this.angle = i * slice;
    this.arcStart = slice * random.range(-50, 0);
    this.arcEnd = slice * random.range(0, 50);
    this.lineWidth = random.range(3, 10);
  }

  draw(context, width, height) {
    context.save()
    context.translate(this.cx, this.cy);
    context.rotate(-this.angle);


    var gradient = context.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("0", "white");
    gradient.addColorStop("1.0" ,"black");

    context.lineWidth = this.lineWidth;
    context.strokeStyle = gradient

    context.beginPath()
    context.arc(0, 0, this.radius, this.arcStart, this.arcEnd);

    context.stroke();
    context.restore();
  }

  update(playhead) {
    console.log(playhead);
    const angleChange = math.degToRad(1);
    const radiusChange = 1;
    this.arcStart += random.range(0, angleChange);
    this.arcEnd += random.range(-angleChange, 0);
    this.radius = this.baseRadius + 100 * (Math.sin(2 * Math.PI * playhead));
    this.radius = Math.max(radiusChange, this.radius);
  }
}

const width = 1080;
const height = 1080;
const num = 100;
const cx = width / 2;
const cy = height / 2;
const w = width * 0.01;
const h = height * 0.1;
const radius = height * 0.5;
const slice = math.degToRad(360 / num);
let radials = [];
let arcs = [];
for(let i = 0; i < num; ++i) {
  radials.push(new Radial(cx, cy, w, h, radius, i, slice, "tomato"));
  arcs.push(new Arc(cx, cy, radius, i, slice));
}

const sketch = () => {
  return ({ context, width, height, playhead }) => {

    context.save()
    var gradient = context.createLinearGradient(0, 0, 1000, 0);
        gradient.addColorStop("0", "white");
        gradient.addColorStop("1.0" ,"Gold");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    context.restore();

    arcs.forEach((arc) => {
      arc.draw(context);
      arc.update(playhead);
    });
    radials.forEach((radial) => {
      radial.draw(context);
      radial.update(playhead);
    });
  };
};

canvasSketch(sketch, settings);
