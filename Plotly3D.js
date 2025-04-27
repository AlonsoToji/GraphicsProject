// Plotly3D.js

function showPlotlyDiv() {
    document.getElementById('canvas').classList.add('hidden');
    document.getElementById('plot3d').classList.remove('hidden');
  }
  
  // --- Helper to plot any 3D mesh --- //
  function plotMesh(x, y, z, faces, color) {
    showPlotlyDiv();
  
    const mesh = {
      type: 'mesh3d',
      x: x,
      y: y,
      z: z,
      i: faces.map(f => f[0]),
      j: faces.map(f => f[1]),
      k: faces.map(f => f[2]),
      opacity: 0.5,
      color: color
    };
  
    const layout = {
      autosize: true,
      margin: { l: 0, r: 0, b: 0, t: 0 },
      scene: { aspectmode: "cube" }
    };
  
    Plotly.newPlot('plot3d', [mesh], layout);
  }
  
  // --- Cube --- //
  export function plotlyCube(x, y, z, size) {
    showPlotlyDiv();
  
    const v = [
      [x - size/2, y - size/2, z - size/2],
      [x + size/2, y - size/2, z - size/2],
      [x + size/2, y + size/2, z - size/2],
      [x - size/2, y + size/2, z - size/2],
      [x - size/2, y - size/2, z + size/2],
      [x + size/2, y - size/2, z + size/2],
      [x + size/2, y + size/2, z + size/2],
      [x - size/2, y + size/2, z + size/2],
    ];
  
    const faces = [
      [0,1,2], [0,2,3],
      [4,5,6], [4,6,7],
      [0,1,5], [0,5,4],
      [1,2,6], [1,6,5],
      [2,3,7], [2,7,6],
      [3,0,4], [3,4,7],
    ];
  
    plotMesh(
      v.map(p => p[0]),
      v.map(p => p[1]),
      v.map(p => p[2]),
      faces,
      'lightblue'
    );
  }
  
  // --- Pyramid --- //
  export function plotlyPyramid(x, y, z, size) {
    showPlotlyDiv();
  
    const v = [
      [x - size/2, y - size/2, z],
      [x + size/2, y - size/2, z],
      [x + size/2, y + size/2, z],
      [x - size/2, y + size/2, z],
      [x, y, z + size],
    ];
  
    const faces = [
      [0,1,2], [0,2,3],
      [0,1,4], [1,2,4],
      [2,3,4], [3,0,4]
    ];
  
    plotMesh(
      v.map(p => p[0]),
      v.map(p => p[1]),
      v.map(p => p[2]),
      faces,
      'plum'
    );
  }
  
  // --- Sphere --- //
  export function plotlySphere(x, y, z, r) {
    showPlotlyDiv();
  
    const theta = [];
    const phi = [];
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      theta.push(i * Math.PI / steps);
      phi.push(i * 2 * Math.PI / steps);
    }
  
    const spherePoints = [];
    for (let i = 0; i <= steps; i++) {
      for (let j = 0; j <= steps; j++) {
        const xp = x + r * Math.sin(theta[i]) * Math.cos(phi[j]);
        const yp = y + r * Math.sin(theta[i]) * Math.sin(phi[j]);
        const zp = z + r * Math.cos(theta[i]);
        spherePoints.push([xp, yp, zp]);
      }
    }
  
    Plotly.newPlot('plot3d', [{
      type: 'mesh3d',
      x: spherePoints.map(p => p[0]),
      y: spherePoints.map(p => p[1]),
      z: spherePoints.map(p => p[2]),
      opacity: 0.5,
      color: 'skyblue'
    }], { margin: { l: 0, r: 0, b: 0, t: 0 } });
  }
  
  // --- Rectangular Prism --- //
  export function plotlyRectangularPrism(x, y, z, size) {
    showPlotlyDiv();
  
    const v = [
      [x - size/2, y - size/2, z - size/4],
      [x + size/2, y - size/2, z - size/4],
      [x + size/2, y + size/2, z - size/4],
      [x - size/2, y + size/2, z - size/4],
      [x - size/2, y - size/2, z + size/4],
      [x + size/2, y - size/2, z + size/4],
      [x + size/2, y + size/2, z + size/4],
      [x - size/2, y + size/2, z + size/4],
    ];
  
    const faces = [
      [0,1,2], [0,2,3],
      [4,5,6], [4,6,7],
      [0,1,5], [0,5,4],
      [1,2,6], [1,6,5],
      [2,3,7], [2,7,6],
      [3,0,4], [3,4,7],
    ];
  
    plotMesh(
      v.map(p => p[0]),
      v.map(p => p[1]),
      v.map(p => p[2]),
      faces,
      'orange'
    );
  }
  