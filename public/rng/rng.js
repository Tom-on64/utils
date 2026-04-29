/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const render_btn = document.getElementById("render");

const display = {
	number: document.getElementById("number"),
	min: document.getElementById("min"),
	max: document.getElementById("max"),
	seed: document.getElementById("seed"),
	a: document.getElementById("a"),
	c: document.getElementById("c"),
	m: document.getElementById("m"),
	tester: document.getElementById("tester"),
	number_count: document.getElementById("number-count"),
	collision_count: document.getElementById("collision-count"),
}

canvas.width = 1024;
canvas.height = 800;

let seed = 0;
let min = 0;
let max = 0;
let a = 0;
let c = 0;
let m = 0;

const random = () => {
	seed = (seed * a + c) % m;
	display.seed.textContent = seed;
	return seed / m;
};

const random_number = (max, min = 0) => {
	const r = random();
	return min + Math.floor(r * (max - min));
};

const generate_number = () => {
	const min = parseInt(display.min.value);
	const max = parseInt(display.max.value);
	display.number.innerText = random_number(max, min);
};

let y = 0;
let number_count = 0;
let collision_count = 0;
let collisionCheck = [];
const render = () => {
	for (let x = 0; x < canvas.width; x++) {
		const r = random();
		number_count++;
		ctx.fillStyle = r < 0.5 ? "white" : "black";

		if (collisionCheck[r * m]) {
			if (r < 0.5) ctx.fillStyle = "#FF6384";
			else ctx.fillStyle = "#BB0011";
			collision_count++;
			
		}
		collisionCheck[r * m] = true;

		ctx.fillRect(x, y, 1, 1);
	}

	display.number_count.innerText = number_count;
	display.collision_count.innerText = collision_count;

	if (y < canvas.height) y++;
	else {
		setTimeout(() => { display.tester.style.display = "none"; }, 2000);
		return;
	}

	requestAnimationFrame(render);
};

render_btn.addEventListener("click", (e) => {
	e.preventDefault();

	collisionCheck = [];
	number_count = 0;
	collision_count = 0;
	y = 0;

	seed = parseInt(display.seed.value);
	a = parseInt(display.a.value);
	c = parseInt(display.c.value);
	m = parseInt(display.m.value);

	display.tester.style.display = "flex";

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	render();
});

document.getElementById("generate").addEventListener("click", () => {
	generate_number();
})

const reset = () => {
	seed = 7363738;
	min = 0;
	max = 100;
	a = 1664525;
	c = 1013904223;
	m = Math.pow(2, 32);

	display.seed.value = seed;
	display.min.value = min;
	display.max.value = max;
	display.a.value = a;
	display.c.value = c;
	display.m.value = m;
};

reset();

