// 3D_Drawing.js

// Exported function called by toggle3DMode() in Main.js
export function initialize3DDrawing(is3D_Displayed) {
  if (!is3D_Displayed) return;

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Center of canvas = origin (0, 0, 0) in 3D
  const originX = canvas.width / 2;
  const originY = canvas.height / 2;

  // Axonometric projection multipliers
  const scale = 80; // Scale for line lengths
  const angle = Math.PI / 6; // 30 degrees for isometric projection

  // Projection helpers for 3D point → 2D canvas
  function project3D(x, y, z) {
    // Isometric-like projection
    const px = originX + scale * (x * Math.cos(angle) - y * Math.cos(angle));
    const py = originY - scale * (x * Math.sin(angle) + y * Math.sin(angle) - z);
    return [px, py];
  }

  // Draw axis with arrow and label
  function drawAxis(x, y, z, color, label) {
    const [xEnd, yEnd] = project3D(x, y, z);

    // Axis line
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(xEnd, yEnd);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arrowhead
    const headSize = 6;
    ctx.beginPath();
    ctx.arc(xEnd, yEnd, headSize, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    // Axis label
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(label, xEnd + 8, yEnd + 5);
  }

  // Draw X, Y, Z axes
  drawAxis(1, 0, 0, "red", "X");
  drawAxis(0, 1, 0, "green", "Y");
  drawAxis(0, 0, 1, "blue", "Z");

  // Optional: draw grid planes (light gray)
  drawGridPlane("XY");
  drawGridPlane("XZ");
  drawGridPlane("YZ");

  function drawGridPlane(plane) {
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;

    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        let p1, p2;
        switch (plane) {
          case "XY":
            p1 = project3D(i, -2, 0);
            p2 = project3D(i, 2, 0);
            ctx.beginPath();
            ctx.moveTo(...p1);
            ctx.lineTo(...p2);
            ctx.stroke();

            p1 = project3D(-2, j, 0);
            p2 = project3D(2, j, 0);
            ctx.beginPath();
            ctx.moveTo(...p1);
            ctx.lineTo(...p2);
            ctx.stroke();
            break;

          case "XZ":
            p1 = project3D(i, 0, -2);
            p2 = project3D(i, 0, 2);
            ctx.beginPath();
            ctx.moveTo(...p1);
            ctx.lineTo(...p2);
            ctx.stroke();

            p1 = project3D(-2, 0, j);
            p2 = project3D(2, 0, j);
            ctx.beginPath();
            ctx.moveTo(...p1);
            ctx.lineTo(...p2);
            ctx.stroke();
            break;

          case "YZ":
            p1 = project3D(0, i, -2);
            p2 = project3D(0, i, 2);
            ctx.beginPath();
            ctx.moveTo(...p1);
            ctx.lineTo(...p2);
            ctx.stroke();

            p1 = project3D(0, -2, j);
            p2 = project3D(0, 2, j);
            ctx.beginPath();
            ctx.moveTo(...p1);
            ctx.lineTo(...p2);
            ctx.stroke();
            break;
        }
      }
    }
  }
}
