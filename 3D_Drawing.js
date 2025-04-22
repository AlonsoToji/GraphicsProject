export function initialize3DDrawing(is3D_Displayed) {
  if (is3D_Displayed == true) {
      const canvas = document.getElementById("canvas");
      if (!canvas) {
        console.error("Canvas element not found for 2D drawing.");
        return;
      }
      const ctx = canvas.getContext("2d");
  
      drawGraph(canvas, ctx);
  }
}