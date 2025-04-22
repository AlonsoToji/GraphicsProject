// Main.js: Entry point that imports and initializes all modules

// Importing modules
import { draw2DInputButtons } from './2D_Drawing.js';
import { initialize3DDrawing } from './3D_Drawing.js';
import { clear2DButtons as clear2DButtons } from './2D_Drawing.js';

window.toggle2DMode = toggle2DMode;
window.toggle3DMode = toggle3DMode;
window.drawGraph = drawGraph;
window.clearCanvas = clearCanvas;  

var is2D_Displayed = false;
var is3D_Displayed = false;

// Shared canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas?.getContext("2d");  // Assures Canva 

// Initialize canvas once and keep it visible afterwards
function initCanvas() {
   if (!canvas || !ctx) {
     console.error("Bruh, canvas not found or context unavailable.");
     return;
   }
 
   canvas.style.display = "block";
   drawGraph(canvas, ctx);
 }
  
 // Set up application on page load
  function init() {
   console.log("App initialized");
   initCanvas();
 }
 window.addEventListener('load', init);

// Clears the canvas and redraws the graph grid
function clearCanvas() {
    if (!canvas || !ctx) {
      console.error("Canvas or context missing for clearing.");
      return;
    }
  
    console.log("Canvas cleared.");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Fully clear everything
    drawGraph(canvas, ctx); // Draw fresh grid and axes
    document.getElementById("inputSection").innerHTML = ''; // Clear inputs
  }
  

// Initialize the Graph
function drawGraph(canvas, ctx) {
    const width = canvas.width;
    const height = canvas.height;
    const step = 20;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "#ddd";
    // Draw vertical grid lines
    for (let x = step; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = step; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // Draw X and Y axes
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    return;
}

// Toggles 2D mode (controls visibility of 2D buttons only)
function toggle2DMode() {
    if (!canvas || !ctx) {
        console.error("Canvas element not found.");
        return;
    }

    is3D_Displayed = false;
    is2D_Displayed = !is2D_Displayed;
    console.log("2D Mode is now:", is2D_Displayed);

    if (is2D_Displayed) {
        draw2DInputButtons(true);       // Show 2D input buttons
    } else {
        clear2DButtons();               // Clear buttons and input fields
    }
}

// Toggles 3D mode (controls visibility of 3D buttons only)
function toggle3DMode() {
    if (!canvas) {
        console.error("Canvas element not found.");
        return;
    }

    is2D_Displayed = false;
    is3D_Displayed = !is3D_Displayed;
    console.log("3D Mode is now:", is3D_Displayed);

    if (is3D_Displayed) {
        clear2DButtons();              // Clear 2D elements
        clearCanvas();                 // Clears the graph
        initialize3DDrawing(true);     // Show 3D input options
    }
}
