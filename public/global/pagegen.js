const nav = document.getElementById("nav");
const footer = document.getElementById("footer");

const navbar = [
	{ name: "My Utils", path: "/", icon: "toolbox" },
	{ name: "Paint", path: "/paint", icon: "paint-brush" },
	{ name: "Ascii", path: "/ascii", icon: "binary" },
	{ name: "Base64", path: "/base64", icon: "file-code" },
	{ name: "RNG", path: "/rng", icon: "dice-five" },
	{ name: "Text", path: "/text", icon: "cursor-text" },
	{ name: "Time", path: "/time", icon: "clock" },
];

if (nav) {
	const navlist = document.createElement("ul");
	navlist.classList.add("navlist");
	navbar.forEach(({ name, path, icon }) => {
		const navEl = document.createElement("li");
		const isActive = window.location.pathname.includes(path);
		navEl.innerHTML = `<a href="${path}" ${isActive ? 'class="current"' : ''}><i class="ph ph-${icon}"></i><p>${name}</p></a>`;
		navlist.appendChild(navEl);
	})
	nav.appendChild(navlist);
}

if (footer) {
	footer.innerHTML = `Made by <a href="https://tomon.web.app">Tom-on</a> | &copy; 2026`;
}

// Stop annoying navbar flicker
setTimeout(() => { nav.classList.add("enabled") }, 500); 

