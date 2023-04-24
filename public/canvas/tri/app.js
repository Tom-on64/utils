const canvas = document.getElementById("art");
const ctx = canvas.getContext("2d");

canvas.width = window.innerHeight / 2;
canvas.height = window.innerHeight / 2;

let num = 0;
let timeStamp = 0;
let timer = 0;
let buffer = 10;

const render = (time) => {
  const deltaTime = time - timeStamp;
  timeStamp = time;
  requestAnimationFrame(render);

  // Timer
  if (timer < buffer) {
    timer += deltaTime;
    return;
  }

  // Vars
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  // setup
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 4

  // Unit Circle
  ctx.strokeStyle = "#0F0";
  ctx.beginPath();
  ctx.arc(x, y, 100, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#F00";
  ctx.beginPath();
  ctx.moveTo(x - 100, y);
  ctx.lineTo(x + 100, y);
  ctx.stroke();

  ctx.strokeStyle = "#00F";
  ctx.beginPath();
  ctx.moveTo(x, y - 100);
  ctx.lineTo(x, y + 100);
  ctx.stroke();

  // X/Y Lines
  ctx.strokeStyle = "#00F";
  ctx.beginPath();
  ctx.moveTo(x + Math.sin(num) * 100, 0);
  ctx.lineTo(x + Math.sin(num) * 100, canvas.height);
  ctx.stroke();

  ctx.strokeStyle = "#F00";
  ctx.beginPath();
  ctx.moveTo(0, y + Math.cos(num) * 100);
  ctx.lineTo(canvas.width, y + Math.cos(num) * 100);
  ctx.stroke();

  // Main Line
  ctx.beginPath();
  ctx.strokeStyle = "#0FF";
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(x + Math.sin(num) * 100, y + Math.cos(num) * 100);
  ctx.stroke();

  // Text Updates
  document.getElementById("sin").textContent = `Sin: ${Math.sin(num).toFixed(2)}`
  document.getElementById("cos").textContent = `Cos: ${Math.cos(num).toFixed(2)}`

  // End
  num += 0.1;
  timer = 0;
};

render(0);
