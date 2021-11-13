import canvasSketch from 'canvas-sketch';

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * (4 / 600);
    context.strokeStyle = "lightblue"

    const startingOffset = 0.15;

    const w = width / 10;
    const h = height / 10;
    const gap = width * 0.05;
    const ix = width * startingOffset;
    const iy = height * startingOffset;
    const off = height * (8 / 600)

    for(let i = 0; i < 5; ++i) {
      for(let j = 0; j < 5; ++j) {

          let x = ix + (w + gap) * i;
          let y = iy + (h + gap) * j;

          context.beginPath();
          context.rect(x, y, w, h);
          context.stroke();
          
          if(Math.random() > 0.5) {
              context.beginPath();
              context.rect(x + off, y + off, w - off * 2, h - off * 2);
              context.stroke();
          }
      }
  }
  };
};

canvasSketch(sketch, settings);
