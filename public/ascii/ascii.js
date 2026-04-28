const table = document.getElementById("table");

const special = [
	[ "NUL", "Null" ],
	[ "SOH", "Start of Heading" ],
	[ "STX", "Start of Text" ],
	[ "ETX", "End of Text" ],
	[ "EOT", "End of Transmission" ],
	[ "ENQ", "Enquiry (request response)" ],
	[ "ACK", "Acknowledge" ],
	[ "BEL", "Bell (alert)" ],
	[ "BS",  "Backspace" ],
	[ "HT",  "Horizontal Tab" ],
	[ "LF",  "Line Feed (newline)" ],
	[ "VT",  "Vertical Tab" ],
	[ "FF",  "Form Feed (page break)" ],
	[ "CR",  "Carriage Return" ],
	[ "SO",  "Shift Out" ],
	[ "SI",  "Shift In" ],
	[ "DLE", "Data Link Escape" ],
	[ "DC1", "Device Control 1 (XON)" ],
	[ "DC2", "Device Control 2" ],
	[ "DC3", "Device Control 3 (XOFF)" ],
	[ "DC4", "Device Control 4" ],
	[ "NAK", "Negative Acknowledge" ],
	[ "SYN", "Synchronous Idle" ],
	[ "ETB", "End of Transmission Block" ],
	[ "CAN", "Cancel" ],
	[ "EM",  "End of Medium" ],
	[ "SUB", "Substitute" ],
	[ "ESC", "Escape" ],
	[ "FS",  "File Separator" ],
	[ "GS",  "Group Separator" ],
	[ "RS",  "Record Separator" ],
	[ "US",  "Unit Separator" ],
];

let selected;
const display = {
	lore: document.getElementById("lore"),
	chr: document.getElementById("chr"),
	hex: document.getElementById("hex"),
	dec: document.getElementById("dec"),
	bin: document.getElementById("bin"),
};

function getCell(c) {
	const cell = document.createElement("p");
	cell.classList.add("cell");

	const bin = document.createElement("span");
	bin.innerText = c.toString(2).padStart(8, '0');
	bin.classList.add("bin");
	cell.appendChild(bin);

	const dec = document.createElement("span");
	dec.innerText = c.toString().padStart(3, '0');
	dec.classList.add("dec");
	cell.appendChild(dec);

	const hex = document.createElement("span");
	hex.innerText = c.toString(16).padStart(2, '0');
	hex.classList.add("hex");
	cell.appendChild(hex);

	const chr = document.createElement("span");
	chr.innerText = c < 0x20 ? special[c][0] : String.fromCharCode(c);
	chr.classList.add("chr");
	cell.appendChild(chr);

	cell.addEventListener("click", () => {
		if (selected) selected.classList.remove("selected");
		cell.classList.add("selected");
		selected = cell;

		display.lore.innerText = c < 0x20 ? special[c][1] : '';
		display.bin.innerText = bin.innerText;
		display.dec.innerText = dec.innerText;
		display.hex.innerText = hex.innerText;
		display.chr.innerText = chr.innerText;
	})

	return cell;
}

for (let c = 0; c < 128; c++) table.appendChild(getCell(c));

table.childNodes[0].click();

