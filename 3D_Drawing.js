// 3D_Drawing.js: Initializes 3D shape buttons, collects user input, and renders 3D shapes using Plotly

// Updates the instruction panel on the right-hand side
function setInstructions3D(html) {
  const panel = document.getElementById('instructionContent');
  if (panel) panel.innerHTML = html;
}

window.setInstructions3D = setInstructions3D;

// Prompts user to enter initial 3D coordinates before continuing to shape-specific input
function getInitial3DCoords(callback) {
  const inputSection = document.getElementById('inputSection');
  inputSection.innerHTML = `
    <p style="text-align: center;"><strong>Enter initial coordinates:</strong></p><br>
    <input type="number" style="margin-left: 40px;" id="xCoord" placeholder=" X coordinate">
    <input type="number" style="margin-left: 40px;" id="yCoord" placeholder=" Y coordinate">
    <input type="number" style="margin-left: 40px;" id="zCoord" placeholder=" Z coordinate"><br><br>
    <button id="nextBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px;">
      <strong>Next</strong>
    </button>
  `;

  document.getElementById('nextBtn').addEventListener('click', () => {
    const x = +document.getElementById("xCoord").value;
    const y = +document.getElementById("yCoord").value;
    const z = +document.getElementById("zCoord").value;
    if ([x, y, z].some(val => isNaN(val))) {
      alert("Please enter valid X, Y, and Z coordinates.");
      return;
    }
    callback(x, y, z); // Pass coordinates to next shape-specific input step
  });
}

// Returns standardized instruction content for all 3D shapes
function fullInstructions(title) {
  return `
    <ul class="list-disc list-inside space-y-1">
      <li><strong>${title}:</strong> Enter center coords, then specify radius.</li>
      <li>Radius in logical units (1 unit = 20px).</li>
      <br>
      <br>
      <br>
      <li><strong>Pan:</strong> Click and drag to shift the entire shape without rotating it.</li>
      <li><strong>Reset Camera:</strong> Returns the view to default position and zoom.</li>
      <li><strong>Orbital Rotation:</strong> Rotates shape around a fixed point for 360° view.</li>
      <li><strong>Turntable Rotation:</strong> Rotates shape around a vertical axis. View object from all sides without flipping.</li>
      <li><strong>Zoom:</strong> Use mouse wheel or trackpad scroll to zoom in and out.</li>                                                                  
    </ul>
  `;
}

//Cube
export function drawCube() {  // Prompts for coordinates, then side length of cube
  setInstructions3D(fullInstructions("Cube"));
  getInitial3DCoords((x, y, z) => {
    document.getElementById('inputSection').innerHTML = `
      <p style="font-weight: bold; margin-left: 65px; margin-bottom: 15px;">Enter the side length</p>
      <input type="number" id="size" class="ml-10 h-30" placeholder=" Side Length">
      <button id="drawCubeBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px; margin-top: 20px;">
        <strong>Draw</strong>
      </button>
    `;
    document.getElementById('drawCubeBtn').addEventListener('click', () => {
      const size = +document.getElementById("size").value;
      if (isNaN(size)) return alert("Please enter a valid side length.");
      plotCube(x, y, z, size);
    });
  });
}

function plotCube(x, y, z, size) {  // Calculates cube vertices and sends to plotMesh()
  size /= 2;
  const v = [
    [x - size, y - size, z - size], [x + size, y - size, z - size],
    [x + size, y + size, z - size], [x - size, y + size, z - size],
    [x - size, y - size, z + size], [x + size, y - size, z + size],
    [x + size, y + size, z + size], [x - size, y + size, z + size]
  ];
  const f = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];
  plotMesh(v, f, 'lightblue');
}

//Pyramid
export function drawPyramid() {  // Prompts for coordinates, then base size and height
  setInstructions3D(fullInstructions("Pyramid"));
  getInitial3DCoords((x, y, z) => {
    document.getElementById('inputSection').innerHTML = `
      <p style="font-weight: bold; margin-left: 50px; margin-bottom: 10px;">Enter base size and height:</p>
      <input type="number" id="base" class="ml-10 h-30" placeholder=" Base Size">
      <input type="number" id="height" class="ml-10 h-30" placeholder=" Height">
      <button id="drawPyramidBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px; margin-top: 20px;">
        <strong>Draw</strong>
      </button>
    `;
    document.getElementById('drawPyramidBtn').addEventListener('click', () => {
      const base = +document.getElementById("base").value;
      const height = +document.getElementById("height").value;
      if (isNaN(base) || isNaN(height)) return alert("Please enter valid values.");
      plotPyramid(x, y, z, base, height);
    });
  });
}

function plotPyramid(x, y, z, base, height) {  // Builds a square-based pyramid with center apex
  base /= 2;
  const v = [
    [x - base, y - base, z], [x + base, y - base, z],
    [x + base, y + base, z], [x - base, y + base, z],
    [x, y, z + height] // Apex point
  ];
  const f = [[0,1,4],[1,2,4],[2,3,4],[3,0,4],[0,1,2,3]];
  plotMesh(v, f, 'lightcoral');
}

//Sphere
export function drawSphere() {  // Prompts for coordinates, then radius of sphere
  setInstructions3D(fullInstructions("Sphere"));
  getInitial3DCoords((x, y, z) => {
    document.getElementById('inputSection').innerHTML = `
      <p style="font-weight: bold; margin-left: 65px; margin-bottom: 15px;">Enter the radius</p>
      <input type="number" id="radius" class="ml-10 h-30" placeholder=" Radius">
      <button id="drawSphereBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px; margin-top: 20px;">
        <strong>Draw</strong>
      </button>
    `;
    document.getElementById('drawSphereBtn').addEventListener('click', () => {
      const r = +document.getElementById("radius").value;
      if (isNaN(r)) return alert("Please enter a valid radius.");
      plotSphere(x, y, z, r);
    });
  });
}

function plotSphere(x0, y0, z0, r) {  // Uses parametric surface formulas to render sphere in Plotly
  const u = Array.from({ length: 50 }, (_, i) => i * Math.PI / 25);
  const v = Array.from({ length: 50 }, (_, i) => i * 2 * Math.PI / 50);
  const x = [], y = [], z = [];

  for (let i = 0; i < u.length; i++) {
    const rowX = [], rowY = [], rowZ = [];
    for (let j = 0; j < v.length; j++) {
      rowX.push(x0 + r * Math.sin(u[i]) * Math.cos(v[j]));
      rowY.push(y0 + r * Math.sin(u[i]) * Math.sin(v[j]));
      rowZ.push(z0 + r * Math.cos(u[i]));
    }
    x.push(rowX); y.push(rowY); z.push(rowZ);
  }

  Plotly.newPlot('plot3d', [{ type: 'surface', x, y, z, opacity: 0.8, colorscale: 'Viridis' }]);
}

//Prism
export function drawPrism() {  // Prompts for coordinates, then width, height, and depth of prism
  setInstructions3D(fullInstructions("Prism"));
  getInitial3DCoords((x, y, z) => {
    document.getElementById('inputSection').innerHTML = `
      <p style="font-weight: bold; margin-left: 30px; margin-bottom: 10px;">Enter width, height, and depth:</p>
      <input type="number" id="width" class="ml-10 h-30" placeholder=" Width">
      <input type="number" id="height" class="ml-10 h-30" placeholder=" Height">
      <input type="number" id="depth" class="ml-10 h-30" placeholder=" Depth">
      <button id="drawPrismBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px; margin-top: 20px;">
        <strong>Draw</strong>
      </button>
    `;
    document.getElementById('drawPrismBtn').addEventListener('click', () => {
      const w = +document.getElementById("width").value;
      const h = +document.getElementById("height").value;
      const d = +document.getElementById("depth").value;
      if ([w, h, d].some(val => isNaN(val))) return alert("Please enter valid dimensions.");
      plotPrism(x, y, z, w, h, d);
    });
  });
}

function plotPrism(x, y, z, w, h, d) {  // Constructs rectangular prism centered at (x, y, z)
  w /= 2; h /= 2; d /= 2;
  const v = [
    [x - w, y - h, z - d], [x + w, y - h, z - d],
    [x + w, y + h, z - d], [x - w, y + h, z - d],
    [x - w, y - h, z + d], [x + w, y - h, z + d],
    [x + w, y + h, z + d], [x - w, y + h, z + d]
  ];
  const f = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];
  plotMesh(v, f, 'orange');
}

//Shared Rendering Utility
function plotMesh(vertices, faces, color) {
  // Prepares vertex positions and face indices for Plotly mesh3d
  let x = [], y = [], z = [], i = [], j = [], k = [];

  faces.forEach(face => {
    if (face.length === 3) {
      i.push(face[0]); j.push(face[1]); k.push(face[2]);
    } else if (face.length === 4) {
      i.push(face[0]); j.push(face[1]); k.push(face[2]);
      i.push(face[0]); j.push(face[2]); k.push(face[3]);
    }
  });

  vertices.forEach(v => {
    x.push(v[0]); y.push(v[1]); z.push(v[2]);
  });

  Plotly.newPlot('plot3d', [{
    type: 'mesh3d',
    x, y, z, i, j, k,
    opacity: 0.7,
    color: color
  }]);
}
