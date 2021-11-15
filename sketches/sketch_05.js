const canvasSketch = require('canvas-sketch');
import {random} from "canvas-sketch-util"

const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager;

let text = "囍";
let fontsize = 1000;
let fontfamily = "comic sans";

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {
  const cell = 40;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;
  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    fontsize = cols * 1;

    typeContext.fillStyle = "white";
    typeContext.font = `${fontsize}px ${fontfamily}`;
    typeContext.textBaseline = "top";
    // context.textAlign = "center";

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) / 2 - mx;
    const ty = (rows - mh) / 2 - my;

    typeContext.save();
    typeContext.translate(tx, ty);
    typeContext.filter = 'blur(0.1px)';
    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    // context.drawImage(typeCanvas, 0, 0);

    context.fillStyle = "black";
    context.fillRect(0, 0, width,height);

    context.textBaseline = "middle";
    context.textAlign = "center";

    for(let i = 0; i < numCells; ++i) {
      const col = i % cols;
      const row = Math.floor(i / cols);

     const x = col * cell;
     const y = row * cell; 

     const r = typeData[i * 4];
     const g = typeData[i * 4 + 1];
     const b = typeData[i * 4 + 2];
     const a = typeData[i * 4 + 3];

     const glyph = getGlyph(r);

     const fontSize = cell * 1.8 * (r / 255) * random.range(0.6, 1.4);

     context.font = `${fontSize}px ${fontfamily}`;

     context.fillStyle = "DarkRed";
     context.strokeStyle = "Ivory";
     if(Math.random() < 0.3) {
      context.fillStyle = "Ivory";
      context.strokeStyle = "DarkRed";
     }

     context.save();
     context.translate(x, y);
     context.translate(cell / 2, cell / 2);
     context.rotate(random.range(-Math.PI, Math.PI));
     // context.fillRect(0, 0, cell, cell);

     context.fillText(glyph, 0, 0);
     context.strokeText(glyph, 0, 0);

     context.restore();
    }
  };
};

const getGlyph = (v) => {
  if(v < 50) {
    return "";
  }

  const glyphs = "♥".split("");

  return random.pick(glyphs);
};

const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();
};

// document.addEventListener("keyup", onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();

/*
const url = "https://picsum.photos/200/300";

const loadSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

// const start = () => {
//   loadSomeImage(url).then(img => {
//     console.log("image width", img.width);
//   });
//   console.log("this line");
// };

const start = async () => {
  const img = await loadSomeImage(url);
  console.log("image width", img.width);
  console.log("this line");
};

start();
*/