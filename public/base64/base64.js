const text = document.getElementById("text");
const base64 = document.getElementById("base64");

// TODO: Live updating
document.getElementById("conv-to").addEventListener("click", () => {
	base64.value = btoa(text.value);
});
document.getElementById("conv-from").addEventListener("click", () => {
	text.value = atob(base64.value);
});

