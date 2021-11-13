const canvasSketch = require('canvas-sketch');
import {math, random} from "canvas-sketch-util"

// random.setSeed(1000003);

const settings = {
  dimensions: [ 1080, 1080 ]
};

const drawTrapezoid = (context, base, height, top) => {

}

const sketch = () => {
  return ({ context, width, height }) => {


    const cx = height / 2;
    const cy = height / 2;
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;


    context.save()
    var gradient = context.createLinearGradient(0, 0, width * 2, 0);
        gradient.addColorStop("0", "white");
        gradient.addColorStop("1.0" ,"Gold");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    context.restore();

    const num = 80;
    const radius = height * 0.3;

      for(let i = 0; i < num; ++i) {
        const slice = math.degToRad(360 / num);
      const angle = i * slice;

        const arcStart = slice * random.range(-50, 0);
        const arcEnd = slice * random.range(0, 50);
        context.save()
        context.translate(cx, cy);
        context.rotate(-angle);


        var gradient = context.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop("0", "white");
        gradient.addColorStop("1.0" ,"black");

        context.lineWidth = random.range(3, 10);
        context.strokeStyle = gradient

        context.beginPath()
        context.arc(0, 0, radius * random.range(0, 1.3), arcStart, arcEnd);

        context.stroke();
        context.restore();
    }

    for(let i = 0; i < num; ++i) {
      if (Math.random() > 0.6) {
        context.fillStyle = "Tomato";
        const slice = math.degToRad(360 / num);
        const angle = i * slice;
        context.save();
        context.translate(cx, cy);
        context.rotate(angle);
        context.translate(0, radius* random.range(0.5, 1));
        context.scale(random.range(0.1, 1), random.range(0.2, 3));
        context.skew
    
        context.beginPath();
        context.rect(random.range(0, -w / 2), random.range(0, -h / 2), w, h);
        context.fill();
    
        context.restore();
      }
    }
  };
};

canvasSketch(sketch, settings);
