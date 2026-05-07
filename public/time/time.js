const current_time = document.getElementById("current-time");
const timers = [];

function pad(s, n = 2, c = '0') {
	return s.toString().padStart(n, c);
}

function unix_to_string(time) {
	const ts = new Date(time);
	return `${pad(ts.getUTCHours())}:${pad(ts.getUTCMinutes())}:${pad(ts.getUTCSeconds())}.${pad(ts.getUTCMilliseconds(), 3)}`;
}

const prompt_wrap = document.getElementById("prompt-wrapper");
const prompt_text = document.getElementById("prompt-text");
const prompt_form = document.getElementById("prompt-form");
const prompt_exit = document.getElementById("prompt-exit");

function time_prompt(prompt, callback) {
	prompt_wrap.style.display = "flex";
	prompt_text.innerHTML = prompt;

	prompt_form.onsubmit = (e) => {
		e.preventDefault();

		prompt_wrap.style.display = "none";

		let t = 0
		for (let i = 0; i < 3; i++) {
			t = t * 60 + parseInt(e.target[i].value);
			e.target[i].value = 0;
		}
		t *= 1000;

		callback(t);
	}

	prompt_exit.onclick = () => {
		prompt_wrap.style.display = "none";
		callback(null);
	}
}

class TimeDisplay {
	constructor(el) {
		this.el = el;
		this.el.classList.add("timer");

		this.disp = document.createElement("p");
		this.disp.classList.add("disp");

		this.el.appendChild(this.disp);

		this.disp_time = 0;
	}

	update_disp() {
		this.disp.innerText = unix_to_string(this.disp_time);
	}
}

class Stopwatch extends TimeDisplay {
	constructor(el) {
		super(el);

		this.el.classList.add("stopwatch");

		const btns = document.createElement("div");
		btns.classList.add("buttons");


		this.buttons = [
			[ "broom",	this.clear.bind(this) ],
			[ "play",	this.run.bind(this) ],
			[ "x",		this.delete.bind(this) ],
		];

		for (const b of this.buttons) {
			const btn = document.createElement("button");
			
			btn.innerHTML = `<i class="ph ph-${b[0]}"></i>`;
			btn.addEventListener("click", b[1]);
			btn.classList.add("tall");
			b[2] = btn;

			btns.appendChild(btn);
		}

		this.el.appendChild(btns);

		this.running = false;
	}

	run(e) {
		this.running = !this.running;

		const i = e.target.querySelector(".ph");

		if (this.running) {
			i.classList.remove("ph-play");
			i.classList.add("ph-pause");
		} else {
			i.classList.add("ph-play");
			i.classList.remove("ph-pause");
		}

	}
	
	clear(_e) {
		this.disp_time = 0;
	}

	delete(_e) {
		this.el.remove();
	}

	update(delta) {
		if (this.running) this.disp_time += delta;
		this.update_disp();
	}
}

class Countdown extends TimeDisplay {
	constructor(el) {
		super(el);

		this.el.classList.add("countdown");

		const btns = document.createElement("div");
		btns.classList.add("buttons");


		this.buttons = [
			[ "plus",	this.increment.bind(this) ],
			[ "pencil",	this.set.bind(this) ],
			[ "play",	this.run.bind(this) ],
			[ "minus",	this.decrement.bind(this) ],
			[ "x",		this.delete.bind(this) ],
		];

		for (const b of this.buttons) {
			const btn = document.createElement("button");
			
			btn.innerHTML = `<i class="ph ph-${b[0]}"></i>`;
			btn.addEventListener("click", b[1]);
			b[2] = btn;

			btns.appendChild(btn);
		}
		this.buttons[2][2].classList.add("tall");

		this.el.appendChild(btns);

		this.running = false;
	}

	increment(_e) {
		this.disp_time += 1000;
	}

	decrement(_e) {
		this.disp_time -= 1000;
	}

	run(e) {
		this.running = !this.running;

		const i = e.target.querySelector(".ph");

		if (this.running) {
			i.classList.remove("ph-play");
			i.classList.add("ph-pause");
		} else {
			i.classList.add("ph-play");
			i.classList.remove("ph-pause");
		}

	}

	set(_e) {
		time_prompt("New countdown:", (t) => {
			if (t) this.disp_time = t;
		});
	}

	delete(_e) {
		this.el.remove();
	}

	update(delta) {
		if (this.running) this.disp_time -= delta;
		if (this.disp_time < 0) this.disp_time = 0;

		this.update_disp();
	}
}

let timestamp = performance.now();
function update(time) {
	let delta = (time - timestamp);
	timestamp = time;

	for (const t of timers) t.update(delta);

	current_time.innerText = unix_to_string(Date.now());

	requestAnimationFrame(update);
}

const grid = document.getElementById("timer-grid");

document.getElementById("add-stopwatch").addEventListener("click", () => {
	const el = document.createElement("section");
	timers.push(new Stopwatch(el));
	grid.appendChild(el);
});

document.getElementById("add-countdown").addEventListener("click", () => {
	const el = document.createElement("section");
	timers.push(new Countdown(el));
	grid.appendChild(el);
});

requestAnimationFrame(update);

// Easter egg :p
const pink = document.querySelector(".pink")
let e_counter = 0, e_timestamp = Date.now();
document.getElementById("easter-egg").addEventListener("click", () => {
	const now = Date.now();

	console.log(e_counter);

	if (now - e_timestamp > 2000) e_counter = 0;
	else e_counter++;

	e_timestamp = now;

	if (e_counter > 3) {
		pink.classList.add("active");
		e_counter = 0;
	} else {
		pink.classList.remove("active");
	}
});

