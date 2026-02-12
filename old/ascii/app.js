// DEC HEX BIN CHR
const table = document.getElementById("table");
const columns = [
  document.getElementById("a"),
  document.getElementById("b"),
  document.getElementById("c"),
  document.getElementById("d"),
  document.getElementById("e"),
  document.getElementById("f"),
  document.getElementById("g"),
  document.getElementById("h"),
];
const special = [
  "NUL",
  "SOH",
  "STX",
  "ETX",
  "EOT",
  "ENQ",
  "ACK",
  "BEL",
  "BS",
  "HT",
  "LF",
  "VT",
  "FF",
  "CR",
  "SO",
  "SI",
  "DLE",
  "DC1",
  "DC2",
  "DC3",
  "DC4",
  "NAK",
  "SYN",
  "ETB",
  "CAN",
  "EM",
  "SUB",
  "ESC",
  "FS",
  "GS",
  "RS",
  "US",
];
let c = -1;

const getRow = (dec) => {
  const chr = String.fromCharCode(dec);
  const hex = dec.toString(16).padStart(2, 0);
  const bin = dec.toString(2).padStart(8, 0);
  const e = document.createElement("div");

  e.id = "row";
  e.innerHTML = `${dec.toString().padStart(2, 0)} ${hex} ${bin} <b>${dec < 32 ? special[dec] : chr}</b>`;

  return e;
};

for (let i = 0; i < 256; i++) {
  if (i % 32 === 0) c++;
  columns[c].appendChild(getRow(i));
}
