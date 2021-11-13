const canvasSketch = require('canvas-sketch');
import {math, random} from "canvas-sketch-util"
import {Pane} from "tweakpane"

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  animate: true,
  frame: 0,
  lineCap: "butt"
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    const gwidth = width;
    const gheight = height;
    const cellw = gwidth / cols;
    const cellh = gheight / rows;
    const margx = 0 * (width - gwidth) / 2;
    const margy = 0 * (height - gheight) / 2;

    for(let i = 0; i < numCells; ++i) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;

      const w = 0.8 * cellw;
      const h = 0.8 * cellh;

      const f = params.animate ? frame : params.frame;

      const n = random.noise3D(x, y, f * 10, params.freq);
      const angle = n * Math.PI * params.amp;
      const scale =  math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw / 2, cellh / 2);
      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;
      context.beginPath();
      context.moveTo(-0.5 * w, 0);
      context.lineTo(0.5 * w, 0)
      context.stroke();

      context.restore();
    }
  };
};

const createPane =() => {
  const pane = new Pane();
  let folder = pane.addFolder({ title: "Grid" });
  folder.addInput(params, "lineCap", {options: {butt: "butt", round: "round", square: "square"}});
  folder.addInput(params, 'cols', { min: 2, max: 50, step: 1});
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1});
  folder.addInput(params, 'scaleMin', { min: 1, max: 100});
  folder.addInput(params, 'scaleMax', { min: 1, max: 100});

  folder = pane.addFolder({ title: "Noise" });
  folder.addInput(params, "freq", {min: -0.01, max: 0.01 });
  folder.addInput(params, "amp", {min: 0, max: 1 });

  folder = pane.addFolder({ title: "Animate"});
  folder.addInput(params, "animate");
  folder.addInput(params, "frame", {min: 0, max: 999});
}

createPane();
canvasSketch(sketch, settings);
