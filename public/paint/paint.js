const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const status_pos = document.getElementById("status-pos");

canvas.height = 600;
canvas.width = 800;
ctx.fillStyle = "#FFFFFF"

let is_painting = false;
let color = "#000";

function get_canvas_pos(e) {
	const r = canvas.getBoundingClientRect();
	return [
		Math.round(e.clientX - r.left), 
		Math.round(e.clientY - r.top)
	];
}

function draw(x, y) {
	if (!is_painting) return;
	ctx.strokeStyle = color;
	ctx.lineWidth = 4;
	ctx.lineCap = "square";

	ctx.lineTo(x, y);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(x, y);
};

const palette = [
	"#000","#888","#800","#880","#080","#088","#008","#808","#884","#044",
	"#08f","#048","#80f","#840","#f00","#f80","#ff0","#8f0","#0f0","#0f8",
	"#fff","#ccc","#f88","#ff8","#8f8","#0ff","#8df","#f8f","#ff4","#8ff",
	"#00f","#66f","#f0f","#848","#f8c","#fcf","#ffc","#cfc","#ccf","#cff",
];

const grid = document.querySelector('.tools.color');
grid.innerHTML = "";

for (let col of palette) {
	const c = document.createElement("button");
	c.style.background = col;
	c.addEventListener("click", () => {
		color = col;
	})
	grid.appendChild(c);
}

canvas.addEventListener("mousedown", (e) => {
	is_painting = true;
	draw(e);
});

canvas.addEventListener("mouseup", () => {
	is_painting = false;
	ctx.beginPath();
});

canvas.addEventListener("mousemove", (e) => {
	const [ x, y ] = get_canvas_pos(e);
	status_pos.innerText = `${x}, ${y}`;
	draw(x, y);
});
