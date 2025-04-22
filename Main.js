// Main.js

import { clear2DButtons } from './2D_Drawing.js';
import { initialize3DDrawing } from './3D_Drawing.js';

// expose toggles/globals
window.clearCanvas  = clearCanvas;
window.toggle2DMode = toggle2DMode;
window.toggle3DMode = toggle3DMode;

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
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGraph();
  inputSection.innerHTML = '';
}

function toggle2DMode() {
  is3D = false;
  is2D = !is2D;
  clearCanvas();

  if (is2D) {
    shape2D.classList.remove('hidden');
    // remove any lingering 3D buttons
    shape3D.classList.add('hidden');
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
    // hide 2D panel
    shape2D.classList.add('hidden');
    initialize3DDrawing(true);
  } else {
    shape3D.classList.add('hidden');
  }
}
