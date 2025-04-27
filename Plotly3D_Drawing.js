// Plotly3D_Drawing.js

export function drawCube() {
  const inputSection = document.getElementById('inputSection');
  inputSection.innerHTML = `
      <p class="mb-2 font-semibold">Cube: Enter center coordinates and side length</p>
      <input type="number" id="xCoord" placeholder="X" class="border rounded p-1 m-1">
      <input type="number" id="yCoord" placeholder="Y" class="border rounded p-1 m-1">
      <input type="number" id="zCoord" placeholder="Z" class="border rounded p-1 m-1">
      <input type="number" id="size" placeholder="Side Length" class="border rounded p-1 m-1">
      <button id="drawCubeBtn" class="bg-blue-600 text-white p-2 rounded mt-3 hover:bg-blue-700">Draw Cube</button>
  `;

  document.getElementById('drawCubeBtn').addEventListener('click', plotCube);
}

function plotCube() {
  let x = +document.getElementById("xCoord").value;
  let y = +document.getElementById("yCoord").value;
  let z = +document.getElementById("zCoord").value;
  let size = +document.getElementById("size").value / 2;

  let v = [
      [x - size, y - size, z - size],
      [x + size, y - size, z - size],
      [x + size, y + size, z - size],
      [x - size, y + size, z - size],
      [x - size, y - size, z + size],
      [x + size, y - size, z + size],
      [x + size, y + size, z + size],
      [x - size, y + size, z + size]
  ];
  let f = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];
  plotMesh(v, f, 'lightblue');
}

export function drawPyramid() {
  const inputSection = document.getElementById('inputSection');
  inputSection.innerHTML = `
      <p class="mb-2 font-semibold">Pyramid: Enter center coordinates, base size, and height</p>
      <input type="number" id="xCoord" placeholder="X" class="border rounded p-1 m-1">
      <input type="number" id="yCoord" placeholder="Y" class="border rounded p-1 m-1">
      <input type="number" id="zCoord" placeholder="Z" class="border rounded p-1 m-1">
      <input type="number" id="base" placeholder="Base Size" class="border rounded p-1 m-1">
      <input type="number" id="height" placeholder="Height" class="border rounded p-1 m-1">
      <button id="drawPyramidBtn" class="bg-blue-600 text-white p-2 rounded mt-3 hover:bg-blue-700">Draw Pyramid</button>
  `;

  document.getElementById('drawPyramidBtn').addEventListener('click', plotPyramid);
}

function plotPyramid() {
  let x = +document.getElementById("xCoord").value;
  let y = +document.getElementById("yCoord").value;
  let z = +document.getElementById("zCoord").value;
  let base = +document.getElementById("base").value / 2;
  let height = +document.getElementById("height").value;

  let v = [
      [x - base, y - base, z],
      [x + base, y - base, z],
      [x + base, y + base, z],
      [x - base, y + base, z],
      [x, y, z + height]
  ];
  let f = [[0,1,4],[1,2,4],[2,3,4],[3,0,4],[0,1,2,3]];
  plotMesh(v, f, 'lightcoral');
}

export function drawSphere() {
  const inputSection = document.getElementById('inputSection');
  inputSection.innerHTML = `
      <p class="mb-2 font-semibold">Sphere: Enter center coordinates and radius</p>
      <input type="number" id="xCoord" placeholder="X" class="border rounded p-1 m-1">
      <input type="number" id="yCoord" placeholder="Y" class="border rounded p-1 m-1">
      <input type="number" id="zCoord" placeholder="Z" class="border rounded p-1 m-1">
      <input type="number" id="radius" placeholder="Radius" class="border rounded p-1 m-1">
      <button id="drawSphereBtn" class="bg-blue-600 text-white p-2 rounded mt-3 hover:bg-blue-700">Draw Sphere</button>
  `;

  document.getElementById('drawSphereBtn').addEventListener('click', plotSphere);
}

function plotSphere() {
  let x0 = +document.getElementById("xCoord").value;
  let y0 = +document.getElementById("yCoord").value;
  let z0 = +document.getElementById("zCoord").value;
  let r = +document.getElementById("radius").value;

  let u = [], v = [];
  for (let i = 0; i < 50; i++) {
      u.push(i * Math.PI / 25);
      v.push(i * 2 * Math.PI / 50);
  }

  let x = [], y = [], z = [];
  for (let i = 0; i < u.length; i++) {
      let rowX = [], rowY = [], rowZ = [];
      for (let j = 0; j < v.length; j++) {
          rowX.push(x0 + r * Math.sin(u[i]) * Math.cos(v[j]));
          rowY.push(y0 + r * Math.sin(u[i]) * Math.sin(v[j]));
          rowZ.push(z0 + r * Math.cos(u[i]));
      }
      x.push(rowX);
      y.push(rowY);
      z.push(rowZ);
  }

  Plotly.newPlot('plot3d', [{
      type: 'surface',
      x, y, z,
      opacity: 0.8,
      colorscale: 'Viridis'
  }]);
}

export function drawPrism() {
  const inputSection = document.getElementById('inputSection');
  inputSection.innerHTML = `
      <p class="mb-2 font-semibold">Rectangular Prism: Enter center coordinates, width, height, and depth</p>
      <input type="number" id="xCoord" placeholder="X" class="border rounded p-1 m-1">
      <input type="number" id="yCoord" placeholder="Y" class="border rounded p-1 m-1">
      <input type="number" id="zCoord" placeholder="Z" class="border rounded p-1 m-1">
      <input type="number" id="width" placeholder="Width" class="border rounded p-1 m-1">
      <input type="number" id="height" placeholder="Height" class="border rounded p-1 m-1">
      <input type="number" id="depth" placeholder="Depth" class="border rounded p-1 m-1">
      <button id="drawPrismBtn" class="bg-blue-600 text-white p-2 rounded mt-3 hover:bg-blue-700">Draw Prism</button>
  `;

  document.getElementById('drawPrismBtn').addEventListener('click', plotPrism);
}

function plotPrism() {
  let x = +document.getElementById("xCoord").value;
  let y = +document.getElementById("yCoord").value;
  let z = +document.getElementById("zCoord").value;
  let w = +document.getElementById("width").value / 2;
  let h = +document.getElementById("height").value / 2;
  let d = +document.getElementById("depth").value / 2;

  let v = [
      [x - w, y - h, z - d],
      [x + w, y - h, z - d],
      [x + w, y + h, z - d],
      [x - w, y + h, z - d],
      [x - w, y - h, z + d],
      [x + w, y - h, z + d],
      [x + w, y + h, z + d],
      [x - w, y + h, z + d]
  ];
  let f = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];
  plotMesh(v, f, 'orange');
}

function plotMesh(vertices, faces, color) {
  let x = [], y = [], z = [], i = [], j = [], k = [];

  faces.forEach((face) => {
      if (face.length === 3) {
          i.push(face[0]); j.push(face[1]); k.push(face[2]);
      } else if (face.length === 4) {
          i.push(face[0]); j.push(face[1]); k.push(face[2]);
          i.push(face[0]); j.push(face[2]); k.push(face[3]);
      }
  });

  vertices.forEach(v => {
      x.push(v[0]);
      y.push(v[1]);
      z.push(v[2]);
  });

  Plotly.newPlot('plot3d', [{
      type: 'mesh3d',
      x, y, z,
      i, j, k,
      opacity: 0.7,
      color: color
  }]);
}
