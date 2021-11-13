const canvasSketch = require('canvas-sketch');
const Color = require('canvas-sketch-util/color');
import {math, random} from "canvas-sketch-util";
import {Pane} from "tweakpane"

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
};

const params = {
  cols: 10,
  rows: 10,
  freq: 0.001,
  amp: 1,
  colorStyle: "randomColor",
  animate: true,
  frame: 0
};

const indexColor = (x, colors) => {
  const index = Math.floor(x * colors.length);
  return colors[index];
}

const blackAndWhite = ["black", "white"];

const allColors = ["Aquamarine",
                    "BlueViolet",
                    "Coral",
                    "CornflowerBlue",
                    "DarkOliveGreen",
                    "DarkSalmon",
                    "DarkSeaGreen",
                    "DarkSlateBlue",
                    "FloralWhite",
                    "GoldenRod",
                    "SteelBlue",
                    "SpringGreen",
                    "Silver",
                    "RoyalBlue",
                    "PowderBlue"]


const makeFunctionIndexer = (colours ,num) => {
  let cs = [];
  for(let i = 0; i < num; ++i) {
    cs.push(random.pick(colours))
  }

  const func = (x) => {
    return indexColor(x, cs);
  }

  return func;
}

var blacksAndWhites = []
for(let i = 0; i < 100; ++i) {
  blacksAndWhites.push(random.pick(["black", "white"]));
}

const mono = (x) => {
  return indexColor(x, blacksAndWhites);
}

const randomColor = (x) => {
  const colors = ["Aquamarine",
                  "BlueViolet",
                  "Coral",
                  "CornflowerBlue",
                  "DarkOliveGreen",
                  "DarkSalmon",
                  "DarkSeaGreen",
                  "DarkSlateBlue",
                  "FloralWhite",
                  "GoldenRod",
                  "SteelBlue",
                  "SpringGreen",
                  "Silver",
                  "RoyalBlue",
                  "PowderBlue"];

  return indexColor(x, colors);
};

const getColor = (f, name) => {
  switch (name) {
    case "random" : return randomColor(f);
    case "mono" : return mono(f);
  }
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const ncols = params.cols;
    const nrows = params.rows;
    const cellw = width / ncols;
    const cellh = height / nrows;

    const numCells = ncols * nrows;

    for(let i = 0; i < numCells; ++i) {
      const col = i % ncols;
      const row = Math.floor(i / ncols);

      const x = col * cellw;
      const y = row * cellh;

      frame = params.animate ? frame : params.frame;

      const n = random.noise3D(x, y, frame * params.amp, params.freq);
      const f = math.mapRange(n, -1, 1, 0, 1);

      context.save();
      context.translate(x, y);

      context.fillStyle = getColor(f, params.colorStyle);
      context.fillRect(0, 0, cellw + 1, cellh + 1);

      context.restore();
    }
  };
};

const createPane =() => {
  const pane = new Pane();
  let folder = pane.addFolder({ title: "Grid" });
  folder.addInput(params, 'cols', { min: 2, max: 500, step: 1});
  folder.addInput(params, 'rows', { min: 2, max: 500, step: 1});
  // folder.addInput(params, 'scaleMin', { min: 1, max: 100});
  // folder.addInput(params, 'scaleMax', { min: 1, max: 100});

  folder = pane.addFolder({ title: "Noise" });
  folder.addInput(params, "freq", {min: -0.01, max: 0.01 });
  folder.addInput(params, "amp", {min: 1, max: 10 });

  folder = pane.addFolder({ title: "Animate"});
  folder.addInput(params, "animate");
  folder.addInput(params, "frame", {min: 0, max: 999});

  folder = pane.addFolder({ title: "Colors"});
  folder.addInput(params,
                  "colorStyle",
                  {options: {mono: "mono",
                             random: "random",
                             blues: "blues"}}).on('change', (ev) => {
                               console.log(ev.value);
                             });
}

createPane();
canvasSketch(sketch, settings);