window.addEventListener("load", () => {
  const canvas = document.querySelector("#paintCanvas");
  const ctx = canvas.getContext("2d");

  //* Setup
  //TODO: Add An Event Listener On Resize To Auto Resize
  canvas.height = window.innerHeight - 8;
  canvas.width = window.innerWidth - 6;
  ctx.fillStyle = "#FFFFFF"

  //* Variables
  let isPainting = false;

  //* Functions
  const draw = (e) => {
    if (!isPainting) return;
    ctx.strokeStyle = document.querySelector("#paintColor").value
    ctx.lineWidth = document.querySelector("#paintThickness").value;
    ctx.lineCap = "round";

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  };

  // EventListeners
  canvas.addEventListener("mousedown", (e) => {
    isPainting = true;
    draw(e);
  });
  canvas.addEventListener("mouseup", () => {
    isPainting = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mousemove", draw);
});
