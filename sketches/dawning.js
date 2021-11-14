const canvasSketch = require('canvas-sketch');

import {math, random} from "canvas-sketch-util";

const settings = {
  dimensions: [ 1080, 1080 ]
};

const allColors = ["Aquamarine",
                    "BlueViolet",
                    "Coral",
                    // "CornflowerBlue",
                    // "DarkOliveGreen",
                    // "DarkSalmon",
                    // "DarkSeaGreen",
                    // "DarkSlateBlue",
                    // "FloralWhite",
                    // "GoldenRod",
                    // "SteelBlue",
                    "SpringGreen",
                    "Silver",
                    "RoyalBlue",
                    "PowderBlue"]

const randomCircle = (context, width, height) => {
  const radius = random.range(10, 100);
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.fill();
}

const randomLine = (context, width, height) => {
  let a, b;
  if(Math.random() > 0.5) {
    a = 50;
    b = 1000;
  } else {
    a = 1000;
    b = 50;
  }

  context.fillRect(0, 0, a, b);
}

const randomImage = (context, width, height) => {
  context.save();
  context.beginPath();
  context.fillStyle = random.pick(allColors);
  const func = random.pick([randomCircle]);
  func(context, width, height);
  context.restore();
}

const sketch = () => {
  return ({ context, width, height }) => {
    let num;
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.globalCompositeOperation = "source-atop";



    context.save()
    context.globalAlpha = 0.01;
    context.fillStyle = "LightCoral";
    num = 100;
    for(let i = 1; i < num; ++i) {
      context.beginPath();
        const radius = (i / num) * 400;
        context.arc(Math.random(), Math.random(), radius, 0, 2 * Math.PI);
        context.fill();
    }

    context.restore();

    num = 10000;
    context.globalAlpha = 0.005;
    for(let i = 0; i < num; ++i) {
      context.save();
      context.translate(Math.random()**2 * width, Math.random()**2 * height);
      randomImage(context, width, height);
      context.restore();
    }

    context.save();

    context.globalAlpha = 1;
    for(let i = 0; i < 10; ++i) {
      context.save();

      context.strokeStyle = "white";

      context.filter = 'blur(10px)';


      context.lineWidth = 1;



      context.rotate(- i / 10 * Math.PI / 2);

      console.log(i / 10 * Math.PI / 2);

      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0, width * 2);
      context.stroke();
      context.restore();
    }

    context.restore();


    context.save();
    context.globalAlpha = 0.02;
    context.translate(width * 0.3, height * 0.6);
    context.fillStyle = "MediumTurquoise";
    num = 100;
    for(let i = 1; i < num; ++i) {
      context.beginPath();
      const radius = (i / num) * 300;
      context.arc(Math.random(), Math.random(), radius, 0, 2 * Math.PI);
      // context.fill();
    }


  context.restore();


  };
};

canvasSketch(sketch, settings);
