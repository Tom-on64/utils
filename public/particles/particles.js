const mobile_warning = document.getElementById("warning");
mobile_warning.addEventListener("click", () => { mobile_warning.style.display = "none"; })

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const G = 100;

const frametime = 1 / 60; // 60 FPS 

class Particle {
	constructor(x, y, vx, vy, mass) {
		console.log(`${x} ${y} ${vx} ${vy} ${mass}`)
		this.pos = { x, y };
		this.vel = { x: vx, y: vy };
		this.mass = mass;
		this.radius = Math.sqrt(this.mass) * 2;
	}

	render(ctx) {
		ctx.lineWidth = 4;
		ctx.fillStyle = "#0f0";
		ctx.strokeStyle = "#000";

		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	}

	update(delta) {
		this.gravity();

		this.vel.x *= 0.99999;
		this.vel.y *= 0.99999;

		this.pos.x += this.vel.x * delta;
		this.pos.y += this.vel.y * delta;
	}

	gravity() {
		for (let p of particles) {
			if (p === this) continue;

			const dx = p.pos.x - this.pos.x;
			const dy = p.pos.y - this.pos.y;
			const dist_sq = dx * dx + dy * dy;
			const dist = Math.sqrt(dist_sq);

			const min_dist = this.radius + p.radius;

			if (dist > min_dist) {
				const force = (G * p.mass) / dist_sq;
				this.vel.x += force * (dx / dist);
				this.vel.y += force * (dy / dist);
			}
		}
	}
}

/** @type {Particle[]} */
let particles = [];

let timestamp = performance.now();
function update(time = 0) {
	let delta = (time - timestamp) / 1000;
	timestamp = time;
	if (delta >= 1) delta = 1;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (const p of particles) {
		p.update(delta);
		p.render(ctx);
	}

	if (click.yeah) {
		ctx.strokeStyle = "#c00";
		ctx.fillStyle = "#aaaa";
		ctx.beginPath();
		ctx.arc(click.x, click.y, Math.sqrt((Date.now() - click.time) / 10 + 10) * 2, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(click.x, click.y);
		ctx.lineTo(click.px, click.py);
		ctx.stroke();
	}
	
	requestAnimationFrame(update);
}

function resize() {
	const rect = canvas.getBoundingClientRect();
	console.log(rect);
	canvas.width = rect.width * 1.5;
	canvas.height = rect.height * 1.5;
}

const click = { x: 0, y: 0, px: 0, py: 0, time: 0, yeah: false };
canvas.addEventListener("mousedown", (e) => {
	click.x = e.offsetX * 1.5;
	click.y = e.offsetY * 1.5;
	click.time = Date.now();
	click.yeah = true;
});

canvas.addEventListener("mousemove", (e) => {
	click.px = e.offsetX * 1.5;
	click.py = e.offsetY * 1.5;
})

canvas.addEventListener("mouseup", () => {
	click.yeah = false;
	const dx = click.x - click.px;
	const dy = click.y - click.py;
	const mass = (Date.now() - click.time) / 10 + 10;

	const p = new Particle(click.x, click.y, dx, dy, mass);
	particles.push(p);
})

window.addEventListener("resize", resize);

resize();
update();

