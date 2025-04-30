// 2D_Drawing.js: Initializes 2D shape buttons, collects user input, and renders shapes on canvas

window.drawInputButtons = draw2DInputButtons;     // Globally available to Main.js  

function setInstructions(html) {
  const panel = document.getElementById('instructionContent');
  if (panel) panel.innerHTML = html;
}

window.setInstructions = setInstructions;


function draw2DInputButtons(is2D_Displayed) {  // Pushes buttons that offer 2D rendering options
  if (is2D_Displayed === true) {                      // Checks that the 2D button was pressed
    const shapeButtonsContainer = document.getElementById('shapeButtonsContainer');

    const buttons = [  // Define the shapes and their corresponding handler functions
      { label: "Point", handler: createPoint },
      { label: "Line", handler: createLine },
      { label: "Triangle", handler: chooseTriangle },
      { label: "Circle", handler: createCircle },
      { label: "Square", handler: createSquare },
      { label: "Rectangle", handler: createRectangle },
    ];

    // Creates and appends buttons for each shape type
    buttons.forEach(({ label, handler }) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.style.width = "70%";
      btn.addEventListener("click", handler);
      shapeButtonsContainer.appendChild(btn);
    });
  }
}

export function clear2DButtons() {  // Clears all input fields and shape buttons for 2D section
  document.getElementById("inputSection").innerHTML = '';
  document.getElementById("shapeButtonsContainer").innerHTML = '';
  drawGraph(canvas, ctx); // Resets the graph
}

function transformCoords(x, y) {  // Converts logical (x, y) to pixel coordinates based on center of canvas
  let canvas = document.getElementById("canvas");
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;
  return [centerX + x * 20, centerY - y * 20];
}

function initialInputs(callback) {  // Retrieves the initial position from the user and runs the callback with those values
  const inputSection = document.getElementById('inputSection');
  inputSection.innerHTML = `
   <p style="text-align: center;"><strong>Enter initial coordinates:</strong></p><br>
    <input type="number" style="margin-left: 40px;" id="xCoord" placeholder=" X coordinate" class="border rounded p-1 m-1">
    <input type="number" style="margin-left: 40px;" id="yCoord" placeholder=" Y coordinate" class="border rounded p-1 m-1"><br><br>
    <button id="nextBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px;" ><strong>Next</strong></button>
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

export function createCircle() {   // Retrieves radius from user and renders a circle at a given position
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Circle:</strong> Enter center coords, then specify radius.</li>
      <li>Radius in logical units (1 unit = 20px).</li>
    </ul>
  `);
    initialInputs((x, y) => { // Initialize a callback and wait for initial coordinates
    const inputSection = document.getElementById('inputSection');
    inputSection.innerHTML = `
      <p style="font-weight: bold; margin-left: 65px; margin-bottom: 15px;">Enter the radius</p>
      <input type="number" style="margin-left: 40px;" id="radius" placeholder=" Radius" class="border rounded p-1 m-1">
      <button id="drawBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px; margin-top: 20px;" ><strong>Draw</strong></button>
    `;

    // Waits for the draw button to be clicked to start drawing
    document.getElementById("drawBtn").addEventListener("click", () => {  
      const r = parseFloat(document.getElementById("radius").value);
      if (isNaN(r)) {
        alert("Please enter a valid radius");
        return;
      }

      const [cx, cy] = transformCoords(x, y);
      const ctx = document.getElementById("canvas").getContext("2d");
      ctx.beginPath();
      ctx.arc(cx, cy, r * 20, 0, Math.PI * 2);
      ctx.stroke();
    })
  });  
}

export function createSquare() {   // Retrieves side length and draws a square with labeled corners
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Square:</strong> Enter lower-left corner, then side length.</li>
      <li>Marks all four corners.</li>
    </ul>
  `);
    initialInputs((x, y) => { // Initialize a callback and wait for initial coordinates
    const inputSection = document.getElementById('inputSection');
    inputSection.innerHTML = `
      <p style="font-weight: bold; margin-left: 50px; margin-bottom: 10px;">Enter the side length</p>
      <input type="number" id="sideLength" style="margin-left: 40px;" placeholder=" Side Length" class="border rounded p-1 m-1"><br>
      <button id="drawBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px; margin-top: 20px;"><strong>Draw</strong></button>
    `;

    // Waits for the draw button to be clicked to start drawing
    document.getElementById("drawBtn").addEventListener("click", () => {
      const length = parseFloat(document.getElementById("sideLength").value);
      if (isNaN(length)) {
        alert("Please enter a valid radius");
        return;
      }

      const [cx, cy] = transformCoords(x, y);
      const ctx = document.getElementById("canvas").getContext("2d");
      ctx.beginPath();
      ctx.rect(cx, cy - length * 20, length * 20, length * 20);
      ctx.stroke();

      // Mark corners as dots
      ctx.fillStyle = "black";
      const corners = [
        [cx, cy - length * 20],
        [cx + length * 20, cy - length * 20],
        [cx, cy],
        [cx + length * 20, cy]
      ];
      corners.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    })
  });  
}

export function createRectangle() {  // Retrieves width and height and renders a rectangle
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Rectangle:</strong> Enter start corner, then width &amp; height.</li>
      <li>Width/height in logical units (1 unit = 20px).</li>
    </ul>
  `);
  initialInputs((x, y) => {
    const inputSection = document.getElementById('inputSection');
    inputSection.innerHTML = `
      <p style="font-weight: bold; margin-bottom: 10px; text-align: center;">Enter width and height of the rectangle:</p>
      <input type="number" id="width" style="margin-left: 40px;" placeholder=" Width" class="border rounded p-1 m-1">
      <input type="number" id="height" style="margin-left: 40px;" placeholder=" Height" class="border rounded p-1 m-1">
      <button id="drawBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px; margin-top: 20px;"><strong>Draw</strong></button>
    `;

    // Waits for the draw button to be clicked to start drawing
    document.getElementById("drawBtn").addEventListener("click", () => {
      const width = parseFloat(document.getElementById("width").value);
      const height = parseFloat(document.getElementById("height").value);
      if (isNaN(width) || isNaN(height)) {
        alert("Please enter valid width and height.");
        return;
      }

      const [cx, cy] = transformCoords(x, y);
      const ctx = document.getElementById("canvas").getContext("2d");
      ctx.beginPath();
      ctx.rect(cx, cy - height * 20, width * 20, height * 20);
      ctx.stroke();
    });
  });
}

export function createPoint() {    // Draws a point using the initial coordinates
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Point:</strong> Enter X and Y to place a point.</li>
      <li>Coordinates map 1 unit → 20px.</li>
    </ul>
  `);
  initialInputs((x, y) => {
    const ctx = document.getElementById("canvas").getContext("2d");
    const [px, py] = transformCoords(x, y);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  });  
}

export function createLine() {   // Retrieves a second point and draws a line from initial to second point
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Line:</strong> First pick the start point, then the end point.</li>
      <li>Endpoints are marked with dots.</li>
    </ul>
  `);
    initialInputs((x1, y1) => {
    const inputSection = document.getElementById('inputSection');
    inputSection.innerHTML = `
      <p style="font-weight: bold; margin-bottom: 10px; text-align: center;">Enter the second point for the line:</p>
      <input type="number" id="x2" style="margin-left: 40px;" placeholder=" X2" class="border rounded p-1 m-1">
      <input type="number" id="y2" style="margin-left: 40px;" placeholder=" Y2" class="border rounded p-1 m-1"><br>
      <button id="drawBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px; margin-top: 20px;"><strong>Draw</strong></button>
    `;

    // Waits for the draw button to be clicked to start drawing
    document.getElementById("drawBtn").addEventListener("click", () => {
      const x2 = parseFloat(document.getElementById("x2").value);
      const y2 = parseFloat(document.getElementById("y2").value);
      if (isNaN(x2) || isNaN(y2)) {
        alert("Please enter valid coordinates for the second point.");
        return;
      }

      const [cx1, cy1] = transformCoords(x1, y1);
      const [cx2, cy2] = transformCoords(x2, y2);
      const ctx = document.getElementById("canvas").getContext("2d");

      ctx.beginPath();
      ctx.moveTo(cx1, cy1);
      ctx.lineTo(cx2, cy2);
      ctx.stroke();

      // Mark endpoints
      [cx1, cy1, cx2, cy2].forEach((val, i, arr) => {
        if (i % 2 === 0) {
          ctx.beginPath();
          ctx.arc(arr[i], arr[i + 1], 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    });
  });
}

export function chooseTriangle() {   // Displays triangle type options for the user to select from
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Triangle:</strong> Choose equilateral, isosceles, or scalene.</li>
      <li>Follow prompts for lengths or vertices.</li>
    </ul>
  `);
  const inputSection = document.getElementById('inputSection');
  inputSection.innerHTML = `<p class="text-center font-bold mb-3">Choose the type of triangle you'd like to create</p>`;

  const buttons = [ // Define the triangle options with their corresponding event handler functions
    { label: "Equilateral Triangle", handler: equilateralTriangle },
    { label: "Isosceles Triangle", handler: isoscelesTriangle },
    { label: "Scalene Triangle", handler: scaleneTriangle },
  ];

   // Creates and appends buttons for each triangle type
  buttons.forEach(({ label, handler }) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.style.width = "80%";
    btn.style.color = "white";
    btn.style.marginLeft = "25px";
    btn.style.marginBottom = "5px";
    btn.style.paddingBottom = "5px";
    btn.style.borderRadius = "10px";
    btn.style.backgroundColor = "#BE185D";
    btn.addEventListener("click", handler);
    inputSection.appendChild(btn);
  });
}

function equilateralTriangle() {  // Creates an equilateral triangle based on one point and a side length
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Equilateral Triangle:</strong> Enter one vertex, then side length.</li>
      <li>Height = (√3 / 2) × side.</li>
    </ul>
  `);
    initialInputs((x, y) => {
    const inputSection = document.getElementById('inputSection');
    inputSection.innerHTML = `
      <p style="font-weight: bold; margin-bottom: 10px; text-align: center;">Enter side length:</p>
      <input type="number" id="side" style="margin-left: 40px;" placeholder=" Side length" class="border rounded p-1 m-1">
      <button id="drawBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px; margin-top: 20px;"><strong>Draw</strong></button>
    `;

    // Waits for the draw button to be clicked to start drawing
    document.getElementById("drawBtn").addEventListener("click", () => {
      const side = parseFloat(document.getElementById("side").value);
      if (isNaN(side)) {
        alert("Please enter a valid side length.");
        return;
      }

      // Bottom-left point
      const [x1, y1] = [x, y];
      // Bottom-right point
      const x2 = x1 + side;
      const y2 = y1;
      // Top point (equilateral height = (√3 / 2) * side)
      const x3 = x1 + side / 2;
      const y3 = y1 + (Math.sqrt(3) / 2) * side;

      drawTriangleFromPoints([x1, y1], [x2, y2], [x3, y3]);
    });
  });
}

function isoscelesTriangle() {  // Creates an isosceles triangle from one base point, a base length, and height
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Isosceles Triangle:</strong> Enter base start, then base &amp; height.</li>
      <li>Apex is centered above base.</li>
    </ul>
  `);
    initialInputs((x, y) => {
    const inputSection = document.getElementById('inputSection');
    inputSection.innerHTML = `
      <p style="font-weight: bold; margin-bottom: 10px; text-align: center;">Enter base and height:</p>
      <input type="number" id="base" style="margin-left: 40px;" placeholder=" Base" class="border rounded p-1 m-1">
      <input type="number" id="height" style="margin-left: 40px;" placeholder=" Height" class="border rounded p-1 m-1">
      <button id="drawBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px; margin-top: 20px;"><strong>Draw</strong></button>
    `;

    // Waits for the draw button to be clicked to start drawing
    document.getElementById("drawBtn").addEventListener("click", () => {
      const base = parseFloat(document.getElementById("base").value);
      const height = parseFloat(document.getElementById("height").value);
      if (isNaN(base) || isNaN(height)) {
        alert("Please enter valid base and height.");
        return;
      }

      // Bottom-left and bottom-right points
      const [x1, y1] = [x, y];
      const x2 = x1 + base;
      const y2 = y1;
      // Top vertex (centered above base)
      const x3 = x1 + base / 2;
      const y3 = y1 + height;

      drawTriangleFromPoints([x1, y1], [x2, y2], [x3, y3]);
    });
  });
}

function scaleneTriangle() {  // Creates a scalene triangle by collecting 3 separate vertices from user input
  setInstructions(`
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Scalene Triangle:</strong> Enter three distinct vertices.</li>
      <li>All sides may differ.</li>
    </ul>
  `);
    initialInputs((x1, y1) => {
    const inputSection = document.getElementById('inputSection');
    inputSection.innerHTML = `
      <p style="font-weight: bold; margin-bottom: 5px; text-align: center;">Enter two more points:</p>
      <input type="number" id="x2" style="margin-left: 40px;" placeholder=" X2" class="border rounded p-1 m-1">
      <input type="number" id="y2" style="margin-left: 40px;" placeholder=" Y2" class="border rounded p-1 m-1">
      <input type="number" id="x3" style="margin-left: 40px;" placeholder=" X3" class="border rounded p-1 m-1">
      <input type="number" id="y3" style="margin-left: 40px;" placeholder=" Y3" class="border rounded p-1 m-1">
      <button id="drawBtn" style="margin-left: 100px; background-color: #92400E; height: 30px; width: 60px; border-radius: 10px; margin-top: 10px;"><strong>Draw</strong></button>
    `;

    // Waits for the draw button to be clicked to start drawing
    document.getElementById("drawBtn").addEventListener("click", () => {
      const x2 = parseFloat(document.getElementById("x2").value);
      const y2 = parseFloat(document.getElementById("y2").value);
      const x3 = parseFloat(document.getElementById("x3").value);
      const y3 = parseFloat(document.getElementById("y3").value);

      if ([x2, y2, x3, y3].some(v => isNaN(v))) {
        alert("Please enter valid coordinates for the remaining points.");
        return;
      }

      drawTriangleFromPoints([x1, y1], [x2, y2], [x3, y3]);
    });
  });
}

// Shared function: takes 3 coordinate pairs and renders a triangle on the canvas
function drawTriangleFromPoints([x1, y1], [x2, y2], [x3, y3]) {
  const [cx1, cy1] = transformCoords(x1, y1);
  const [cx2, cy2] = transformCoords(x2, y2);
  const [cx3, cy3] = transformCoords(x3, y3);
  const ctx = document.getElementById("canvas").getContext("2d");

  ctx.beginPath();
  ctx.moveTo(cx1, cy1);
  ctx.lineTo(cx2, cy2);
  ctx.lineTo(cx3, cy3);
  ctx.closePath();
  ctx.stroke();

  [[cx1, cy1], [cx2, cy2], [cx3, cy3]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}