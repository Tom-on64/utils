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

const render = () => {
  for (let x = 0; x < canvas.width; x++) {
    const r = random();

    ctx.fillStyle = r < 0.5 ? "white" : "black";
    ctx.fillRect(x, y, 1, 1);
  }
  if (y < canvas.height) y++;
  else return;
  requestAnimationFrame(render);
};

document.getElementById("generatorForm").onsubmit = (e) => {
  e.preventDefault();

  seed = e.target[0].value;
  a = e.target[1].value;
  c = e.target[2].value;
  m = e.target[3].value;

  render();

  seed = e.target[0].value;
};
