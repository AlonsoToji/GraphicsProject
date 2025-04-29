// 3D_Drawing.js

// Global reference
let originX, originY, ctx, canvas;

function setInstructions(html) {
  const panel = document.getElementById('instructionContent');
  if (panel) panel.innerHTML = html; 
}

// Setup and draw 3D coordinate system + buttons
// Initialize 3D Drawing and render shapes and axes
export function initialize3DDrawing(is3D_Displayed) {
  if (!is3D_Displayed) return;  // Only proceed if 3D mode is enabled

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // Clear and re-center origin
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  originX = canvas.width / 2;
  originY = canvas.height / 2;

  // Draw the 3D grid and coordinate system
  draw3DGrid();
  draw3DShapeButtons();  // Draw 3D shape buttons
}

// Draw basic 3D coordinate system
function draw3DGrid() {
  const scale = 80;
  const angle = Math.PI / 6;

  const project3D = (x, y, z) => {
    const px = originX + scale * (x * Math.cos(angle) - y * Math.cos(angle));
    const py = originY - scale * (x * Math.sin(angle) + y * Math.sin(angle) - z);
    return [px, py];
  };

  function drawAxis(x, y, z, color, label) {
    const [xEnd, yEnd] = project3D(x, y, z);
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(xEnd, yEnd);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(xEnd, yEnd, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(label, xEnd + 8, yEnd + 5);
  }

  drawAxis(1, 0, 0, "red", "X");
  drawAxis(0, 1, 0, "green", "Y");
  drawAxis(0, 0, 1, "blue", "Z");
}

// Add 3D shape buttons dynamically
function draw3DShapeButtons() {
  const container = document.getElementById("shapeButtons3D");
  container.innerHTML = ''; // Clear any previous buttons

  const buttons = [
    { label: "Cube", handler: drawCube },
    { label: "Pyramid", handler: drawPyramid },
    { label: "Sphere", handler: drawSphere },
    { label: "Prism", handler: drawPrism },
  ];

  buttons.forEach(({ label, handler }) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.classList.add("w-4/5", "py-2", "my-2", "text-sm", "bg-blue-600", "text-white", "font-semibold", "rounded", "hover:bg-blue-700");
    btn.addEventListener("click", handler);
    container.appendChild(btn);
  });
}

// ---- Shape Drawing Helpers ---- //

function project3D(x, y, z) {
  const scale = 80;
  const angle = Math.PI / 6;
  const px = originX + scale * (x * Math.cos(angle) - y * Math.cos(angle));
  const py = originY - scale * (x * Math.sin(angle) + y * Math.sin(angle) - z);
  return [px, py];
}

// Draw cube centered at origin
export function drawCube() {
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Cube</strong> is centered at origin.</li>
      <li>Each side has length 2 units in 3D space.</li>
      <li>Edges are drawn using axonometric projection.</li>
    </ul>
  `);

  const size = 1;
  const corners = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ];

  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];

  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  edges.forEach(([i, j]) => {
    const [x1, y1] = project3D(...corners[i]);
    const [x2, y2] = project3D(...corners[j]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });
}

// Draw a pyramid with square base
export function drawPyramid() {
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Pyramid:</strong> Square base on XY-plane (2×2 units), apex at +1.5 units in Z.</li>
      <li>Edges connect each base corner to the apex.</li>
    </ul>
  `);

  const base = [
    [-1, -1, 0],
    [1, -1, 0],
    [1, 1, 0],
    [-1, 1, 0],
  ];
  const apex = [0, 0, 1.5];

  ctx.strokeStyle = "purple";
  ctx.lineWidth = 2;

  // Base square
  for (let i = 0; i < 4; i++) {
    const [x1, y1] = project3D(...base[i]);
    const [x2, y2] = project3D(...base[(i + 1) % 4]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Sides to apex
  base.forEach(corner => {
    const [x1, y1] = project3D(...corner);
    const [x2, y2] = project3D(...apex);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });
}

// Approximate sphere as a circle for now
export function drawSphere() {
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Sphere:</strong> Rendered as a circle + equatorial ellipse.</li>
      <li>Radius = 1 unit.</li>
    </ul>
  `);
  const radius = 1;
  const [cx, cy] = project3D(0, 0, 0);
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 80, 0, 2 * Math.PI);
  ctx.strokeStyle = "teal";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Add equator
  ctx.beginPath();
  ctx.ellipse(cx, cy, radius * 80, radius * 20, 0, 0, 2 * Math.PI);
  ctx.strokeStyle = "gray";
  ctx.stroke();
}

export function drawPrism() {
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Prism:</strong> Rendered as a circle + equatorial ellipse.</li>
      <li>Radius = 1 unit.</li>
    </ul>
  `);
  const radius = 1;
  const [cx, cy] = project3D(0, 0, 0);
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 80, 0, 2 * Math.PI);
  ctx.strokeStyle = "teal";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Add equator
  ctx.beginPath();
  ctx.ellipse(cx, cy, radius * 80, radius * 20, 0, 0, 2 * Math.PI);
  ctx.strokeStyle = "gray";
  ctx.stroke();
}