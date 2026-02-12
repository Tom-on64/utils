/** @type {HTMLCanvasElement} */

// DOM
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// basic setup
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isStopped = false;
let checkBounds = false;
let speed = 1;

// particle setup
let particles = [];
let particleColor = "lime";
let particleOutline = "black";
let particleRadius = 10;

// basic particle
class Particle {
  constructor(x = 0, y = 0, color = "lime", radius = 10, outline = "black") {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.radius = radius;
    this.color = color;
    this.outline = outline;
    this.gravity = 1;
  }

  update() {
    this.addGravity();
    this.move();
    this.draw();
  }

  move() {
    this.position.x += this.velocity.x * speed;
    this.position.y += this.velocity.y * speed;
  }

  addGravity() {
    if (this.position.x < mouseX) this.velocity.x += this.gravity;
    if (this.position.x > mouseX) this.velocity.x -= this.gravity;
    if (this.position.y < mouseY) this.velocity.y += this.gravity;
    if (this.position.y > mouseY) this.velocity.y -= this.gravity;
    if (checkBounds) this.boundCheck();
  }

  boundCheck() {
    if (this.position.x < 0) this.position.x = 0 + this.radius;
    if (this.position.x > canvas.width)
      this.position.x = canvas.width + this.radius;
    if (this.position.y < 0) this.position.y = 0 + this.radius;
    if (this.position.y > canvas.height)
      this.position.y = canvas.height + this.radius;
  }

  draw() {
    ctx.lineWidth = "5";
    ctx.strokeStyle = this.outline;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  }
}

const render = () => {
  requestAnimationFrame(render);
  document.getElementById("boundsButton").style.backgroundColor = checkBounds
    ? "lime"
    : "red";
  document.getElementById("stopButton").innerText = isStopped
    ? "Start (Space)"
    : "Stop  (Space)";
  if (isStopped) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => particle.update());
};

window.addEventListener("keydown", (e) => {
  if (e.key == " ") isStopped = !isStopped;
});

canvas.addEventListener("mousedown", (e) => {
  particles.push(
    new Particle(
      e.clientX,
      e.clientY,
      particleColor,
      particleRadius,
      particleOutline
    )
  );
  particles.forEach((particle) => particle.draw());
});

canvas.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

render();
