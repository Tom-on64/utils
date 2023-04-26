const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight / 1.5;

let seed = 7363738;
let a = 1664525;
let c = 1013904223;
let m = Math.pow(2, 32);

const random = () => {
  seed = (seed * a + c) % m;

  document.getElementById("seedDisplay").textContent = seed;

  return seed / m;
};

const randomNumber = (max, min = 0) => {
  const r = random();

  return min + Math.floor(r * (max - min));
};

const generateNumber = () => {
  const min = parseInt(document.getElementById("min").value);
  const max = parseInt(document.getElementById("max").value);

  document.getElementById("num").innerText = randomNumber(max, min);
};

let y = 0;
let collisionCheck = [];

const render = () => {
  for (let x = 0; x < canvas.width; x++) {
    const r = random();
    ctx.fillStyle = r < 0.5 ? "white" : "black";

    if (collisionCheck[r * m]) {
      if (r < 0.5) ctx.fillStyle = "#FF6384";
      else ctx.fillStyle = "#BB0011";
    }
    collisionCheck[r * m] = true;

    ctx.fillRect(x, y, 1, 1);
  }
  if (y < canvas.height) y++;
  else return;

  requestAnimationFrame(render);
};

document.getElementById("generatorForm").onsubmit = (e) => {
  e.preventDefault();

  y = 0;
  collisionCheck = [];
  seed = parseInt(e.target[0].value);
  a = parseInt(e.target[1].value);
  c = parseInt(e.target[2].value);
  m = parseInt(e.target[3].value);

  render();
};

const reset = () => {
  document.getElementById("seed").value = 7363738;
  document.getElementById("a").value = 1664525;
  document.getElementById("c").value = 1013904223;
  document.getElementById("m").value = Math.pow(2, 32);

  seed = 7363738;
  a = 1664525;
  c = 1013904223;
  m = Math.pow(2, 32);

  document.getElementById("seedDisplay").textContent = seed;
};
