// 3D_Drawing.js

window.drawInputButtons = initialize3DDrawing;

export function initialize3DDrawing() {
  const shapeButtonsContainer = document.getElementById('shapeButtonsContainer');

  const buttons = [
    { label: "Pyramid", handler: createPyramid },
    { label: "Sphere", handler: createSphere },
    { label: "Cube", handler: createCube },
    { label: "Prism", handler: createPrism },
  ];

  shapeButtonsContainer.innerHTML = ''; // Clear previous buttons if any

  // Creates and appends buttons for each shape type
  buttons.forEach(({ label, handler }) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.style.width = "70%";
    btn.addEventListener("click", handler);
    shapeButtonsContainer.appendChild(btn);
  });
}

export function clear3DButtons() {
  document.getElementById("inputSection").innerHTML = '';
  document.getElementById("shapeButtonsContainer").innerHTML = '';
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  drawGraph(canvas, ctx); // Resets the graph (you must have drawGraph defined elsewhere)
}

// Helper Functions

function transformCoords(x, y) {
  const canvas = document.getElementById("canvas");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  return [centerX + x * 20, centerY - y * 20];
}

function initialInputs(callback) {
  const inputSection = document.getElementById('inputSection');
  inputSection.innerHTML = `
    <p>Enter initial coordinates:</p>
    <input type="number" id="xCoord" placeholder="X coordinate">
    <input type="number" id="yCoord" placeholder="Y coordinate">
    <button id="nextBtn">Next</button>
  `;

  document.getElementById("nextBtn").addEventListener("click", () => {
    const x = parseFloat(document.getElementById("xCoord").value);
    const y = parseFloat(document.getElementById("yCoord").value);
    if (isNaN(x) || isNaN(y)) {
      alert("Please enter valid x and y values.");
      return;
    }
    callback(x, y); // Pass x/y back to the shape creation function
  });
}

// 3D Shape Placeholder Functions

function createPyramid() {
  alert("Pyramid drawing function placeholder.");
  // TODO: Add pyramid drawing logic here
}

function createCube() {
  alert("Cube drawing function placeholder.");
  // TODO: Add cube drawing logic here
}

function createSphere() {
  alert("Sphere drawing function placeholder.");
  // TODO: Add sphere drawing logic here
}

function createPrism() {
  alert("Prism drawing function placeholder.");
  // TODO: Add prism drawing logic here
}
