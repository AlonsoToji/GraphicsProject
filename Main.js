// Main.js

import {
  clear2DButtons,
  createPoint,
  createLine,
  chooseTriangle,
  createCircle,
  createSquare,
  createRectangle
} from './2D_Drawing.js';
import {
  drawCube,
  drawPyramid,
  drawSphere,
  drawPrism 
} from './3D_Drawing.js';

function setInstructions(html) {
  const panel = document.getElementById('instructionContent');
  if (panel) panel.innerHTML = html;
}

// expose toggles/globals
window.clearCanvas  = clearCanvas;
window.toggle2DMode = toggle2DMode;
window.toggle3DMode = toggle3DMode;
window.createPoint = createPoint;
window.createLine = createLine;
window.chooseTriangle = chooseTriangle;
window.createCircle = createCircle;
window.createSquare = createSquare;
window.createRectangle = createRectangle;

window.drawCube = drawCube;
window.drawPyramid = drawPyramid;
window.drawSphere = drawSphere;
window.drawPrism = drawPrism;


const canvas = document.getElementById('canvas');
const ctx    = canvas?.getContext('2d');
const btn2D  = document.getElementById('btn2D');
const btn3D  = document.getElementById('btn3D');
const shape2D= document.getElementById('shapeButtons2D');
const shape3D= document.getElementById('shapeButtons3D');
const inputSection = document.getElementById('inputSection');

let is2D = false;
let is3D = false;

document.addEventListener('DOMContentLoaded', () => {
  if (!canvas || !ctx) return console.error('Canvas missing');
  drawGraph();

  btn2D && btn2D.addEventListener('click', toggle2DMode);
  btn3D && btn3D.addEventListener('click', toggle3DMode);
});

function drawGraph() {
  const { width, height } = canvas;
  const step = 20;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#ddd';
  for (let x = step; x < width; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = step; y < height; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(width/2, 0);
  ctx.lineTo(width/2, height);
  ctx.moveTo(0, height/2);
  ctx.lineTo(width, height/2);
  ctx.stroke();

  setInstructions(`
    <ul class="list-disc list-inside text-gray-700 space-y-2 text-sm leading-relaxed">
        <li>Click <strong>2D</strong> to open 2D shape options.</li>
        <li>Select a shape from the list (e.g., Circle, Line, Triangle).</li>
        <li>Enter the required coordinates and dimensions in the input fields that appear.</li>
        <li>Click <strong>Draw</strong> to render the shape on the graph.</li>
        <li>Click <strong>Clear Graph</strong> to reset the canvas and remove all drawings.</li>
        <li>Switch to <strong>3D</strong> mode to visualize in 3D (WIP if not yet implemented).</li>
      </ul>
  `);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGraph();
  inputSection.innerHTML = '';

  const plot3d = document.getElementById("plot3d");
  if (plot3d) {
    Plotly.purge(plot3d);
  } 
}

function toggle2DMode() {
  is3D = false;
  is2D = !is2D;
  clearCanvas();

  if (is2D) {
    shape2D.classList.remove('hidden');
    shape3D.classList.add('hidden');
    canvas.classList.remove('hidden');
    document.getElementById('plot3d').classList.add('hidden');
  } else {
    clear2DButtons();
    shape2D.classList.add('hidden');
  }
}

function toggle3DMode() {
  is2D = false;
  is3D = !is3D;
  clearCanvas();

  if (is3D) {
    shape3D.classList.remove('hidden');
    shape2D.classList.add('hidden');
    canvas.classList.add('hidden');
    document.getElementById('plot3d').classList.remove('hidden');
  } else {
    shape3D.classList.add('hidden');
    canvas.classList.remove('hidden');
    document.getElementById('plot3d').classList.add('hidden');
  }
}