const canvas = document.querySelector("canvas");
export const c = canvas.getContext("2d");

if (window.innerWidth < 500) {
  canvas.width = 320;
  canvas.height = 288;
} else {
  canvas.width = 480;
  canvas.height = 432;
}

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

// redraws the canvas
export function reDraw() {
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

// resizes the canvas and pokemon
function reSizeCanvas() {
  if (window.innerWidth < 500) {
    canvas.width = 320;
    canvas.height = 288;
  } else {
    canvas.width = 480;
    canvas.height = 432;
  }

  reDraw();
}

// listens for change of window size
window.addEventListener("resize", reSizeCanvas, false);
