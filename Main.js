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
    initialize3DDrawing,
  } from './3D_Drawing.js';
  
  import {
    plotlyCube,
    plotlyPyramid,
    plotlySphere,
    plotlyRectangularPrism
  } from './Plotly3D.js';
  
  window.clearCanvas = clearCanvas;
  window.toggle2DMode = toggle2DMode;
  window.toggle3DMode = toggle3DMode;
  window.createPoint = createPoint;
  window.createLine = createLine;
  window.chooseTriangle = chooseTriangle;
  window.createCircle = createCircle;
  window.createSquare = createSquare;
  window.createRectangle = createRectangle;
  
  // Updated 3D Shape buttons
  window.showCubeInput = showCubeInput;
  window.showPyramidInput = showPyramidInput;
  window.showSphereInput = showSphereInput;
  window.showPrismInput = showPrismInput;
  
  const canvas = document.getElementById('canvas');
  const ctx = canvas?.getContext('2d');
  const btn2D = document.getElementById('btn2D');
  const btn3D = document.getElementById('btn3D');
  const shape2D = document.getElementById('shapeButtons2D');
  const shape3D = document.getElementById('shapeButtons3D');
  const inputSection = document.getElementById('inputSection');
  const plot3d = document.getElementById('plot3d');
  
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
    canvas.classList.remove('hidden');
    plot3d.classList.add('hidden');
  }
  
  // 2D and 3D toggles
  function toggle2DMode() {
    is3D = false;
    is2D = !is2D;
    clearCanvas();
  
    if (is2D) {
      shape2D.classList.remove('hidden');
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
      shape2D.classList.add('hidden');
      initialize3DDrawing(true);
    } else {
      shape3D.classList.add('hidden');
    }
  }
  
  // ------------------------- //
  // Plotly 3D Button Handlers //
  // ------------------------- //
  
  function showCubeInput() {
    inputSection.innerHTML = `
      <p class="font-semibold my-2">Cube: Center + Side Length</p>
      <div class="grid grid-cols-2 gap-2 mb-2">
        <input type="number" id="xInput" placeholder="X" class="border p-1">
        <input type="number" id="yInput" placeholder="Y" class="border p-1">
        <input type="number" id="zInput" placeholder="Z" class="border p-1">
        <input type="number" id="sizeInput" placeholder="Side Length" class="border p-1">
      </div>
      <button onclick="drawCubePlotly()" class="bg-blue-600 text-white w-full py-2 rounded">Draw</button>
    `;
  }
  
  function showPyramidInput() {
    inputSection.innerHTML = `
      <p class="font-semibold my-2">Pyramid: Base Center + Size</p>
      <div class="grid grid-cols-2 gap-2 mb-2">
        <input type="number" id="xInput" placeholder="X" class="border p-1">
        <input type="number" id="yInput" placeholder="Y" class="border p-1">
        <input type="number" id="zInput" placeholder="Z" class="border p-1">
        <input type="number" id="sizeInput" placeholder="Base Size" class="border p-1">
      </div>
      <button onclick="drawPyramidPlotly()" class="bg-blue-600 text-white w-full py-2 rounded">Draw</button>
    `;
  }
  
  function showSphereInput() {
    inputSection.innerHTML = `
      <p class="font-semibold my-2">Sphere: Center + Radius</p>
      <div class="grid grid-cols-2 gap-2 mb-2">
        <input type="number" id="xInput" placeholder="X" class="border p-1">
        <input type="number" id="yInput" placeholder="Y" class="border p-1">
        <input type="number" id="zInput" placeholder="Z" class="border p-1">
        <input type="number" id="sizeInput" placeholder="Radius" class="border p-1">
      </div>
      <button onclick="drawSpherePlotly()" class="bg-blue-600 text-white w-full py-2 rounded">Draw</button>
    `;
  }
  
  function showPrismInput() {
    inputSection.innerHTML = `
      <p class="font-semibold my-2">Prism: Center + Size</p>
      <div class="grid grid-cols-2 gap-2 mb-2">
        <input type="number" id="xInput" placeholder="X" class="border p-1">
        <input type="number" id="yInput" placeholder="Y" class="border p-1">
        <input type="number" id="zInput" placeholder="Z" class="border p-1">
        <input type="number" id="sizeInput" placeholder="Size" class="border p-1">
      </div>
      <button onclick="drawPrismPlotly()" class="bg-blue-600 text-white w-full py-2 rounded">Draw</button>
    `;
  }
  
  // Functions to actually draw after input
  window.drawCubePlotly = function() {
    const x = parseFloat(document.getElementById('xInput').value);
    const y = parseFloat(document.getElementById('yInput').value);
    const z = parseFloat(document.getElementById('zInput').value);
    const size = parseFloat(document.getElementById('sizeInput').value);
    plotlyCube(x, y, z, size);
  };
  
  window.drawPyramidPlotly = function() {
    const x = parseFloat(document.getElementById('xInput').value);
    const y = parseFloat(document.getElementById('yInput').value);
    const z = parseFloat(document.getElementById('zInput').value);
    const size = parseFloat(document.getElementById('sizeInput').value);
    plotlyPyramid(x, y, z, size);
  };
  
  window.drawSpherePlotly = function() {
    const x = parseFloat(document.getElementById('xInput').value);
    const y = parseFloat(document.getElementById('yInput').value);
    const z = parseFloat(document.getElementById('zInput').value);
    const size = parseFloat(document.getElementById('sizeInput').value);
    plotlySphere(x, y, z, size);
  };
  
  window.drawPrismPlotly = function() {
    const x = parseFloat(document.getElementById('xInput').value);
    const y = parseFloat(document.getElementById('yInput').value);
    const z = parseFloat(document.getElementById('zInput').value);
    const size = parseFloat(document.getElementById('sizeInput').value);
    plotlyRectangularPrism(x, y, z, size);
  };
  