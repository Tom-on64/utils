const input = document.getElementById("code");
const emu = {
  registers: {
    A: "00000000",
    B: "00000000",
    F: "00000000",
    I: "00000000",
    O: "00000000",
    S: "00000000",
    P: "0000",
  },
  ram: [
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
  ],
  compiled: [
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
  ],
};
const ins = {
  HLT: "0000",
  OUT: "0001",
  LDA: "0010",
  STA: "0011",
  ADD: "0100",
  SUB: "0101",
  NOP: "0110",
  LDB: "0111",
  LSH: "1000",
  RSH: "1001",
  JMP: "1010",
  JNZ: "1011",
  INC: "1100",
  DEC: "1101",
  ATS: "1110",
  ATB: "1111",
  SET: "set",
};

const getRam = (add) => {
  return emu.ram[parseInt(add, 2)];
};

const setRam = (add, val) => {
  emu.ram[parseInt(add, 2)] = val;
};

const getReg = (reg) => {
  return emu.registers[reg.toUpperCase()];
};

const setReg = (reg, val) => {
  emu.registers[reg.toUpperCase()] = val;
};

const setFlag = (index, val) => {
  const f = getReg("F");
  nf = f.substring(0, index) + val + f.substring(index + 1);
  setReg("F", nf);
};

const reset = () => {
  const clearedRam = [];
  for (let i = 0; i < 16; i++) clearedRam.push("00000000");
  emu.ram = clearedRam;

  emu.registers.A = "00000000";
  emu.registers.B = "00000000";
  emu.registers.F = "00000000";
  emu.registers.I = "00000000";
  emu.registers.O = "00000000";
  emu.registers.P = "0000";
};

const step = () => {
  if (getReg("F")[7] == "1") {
    document.getElementById("warning").innerText =
      "WARNING: Processor is halted!";
    return;
  } else document.getElementById("warning").innerText = "";

  const fullI = getRam(emu.registers.P);
  setReg("I", fullI);
  const i = fullI.slice(0, 4);
  const o = fullI.slice(4, 8);

  console.log(i);

  if (i == "0000") {
    setFlag(7, "1");
    return;
  } else if (i == "0001") setReg("O", getRam(o));
  else if (i == "0010") setReg("A", getRam(o));
  else if (i == "0011") setRam(o, getReg("A"));
  else if (i == "0100")
    setReg(
      "A",
      (parseInt(getReg("A"), 2) + parseInt(getReg("B"), 2))
        .toString(2)
        .padStart(8, "0")
    );
  else if (i == "0101")
    setReg(
      "A",
      (parseInt(getReg("A"), 2) - parseInt(getReg("B"), 2))
        .toString(2)
        .padStart(8, "0")
    );
  else if (i == "0110") {
    // NOP
  } else if (i == "0111") setReg("B", getRam(o));
  else if (i == "1000")
    setReg("A", (parseInt(getReg("A"), 2) << 1).toString(2).padStart(8, "0"));
  else if (i == "1001")
    setReg("A", (parseInt(getReg("A"), 2) >> 1).toString(2).padStart(8, "0"));
  else if (i == "1010") {
    setReg("P", o);
    return;
  } else if (i == "1011") {
    if (getReg("F")[0] == 0) {
      setReg("P", o);
      return;
    }
  } else if (i == "1100")
    setReg("A", (parseInt(getReg("A"), 2) + 1).toString(2).padStart(8, "0"));
  else if (i == "1101")
    setReg("A", (parseInt(getReg("A"), 2) - 1).toString(2).padStart(8, "0"));
  else if (i == "1110") setReg("A", getReg("S"));
  else if (i == "1111") setReg("A", getReg("B"));
  else console.log("HELP");

  setFlag(0, parseInt(getReg("A"), 2) == 0 ? "1" : "0");
  setReg("P", (parseInt(getReg("P"), 2) + 1).toString(2).padStart(4, "0"));
  if (parseInt(getReg("P"), 2) > 15) setReg("P", "0000");
};

const compile = () => {
  const asm = input.value.split("\n");
  let p = 0;

  for (let i = 0; i < asm.length; i++) {
    const l = asm[i].split(" ");
    const o = ins[l[0].toUpperCase()];
    if (!o) continue;

    if (o === "set") {
      if (!l[1] || !l[2]) continue;
      emu.compiled[parseInt(l[1], 2)] = l[2];
      continue;
    }

    emu.compiled[p] = `${o}${
      l[1] ? parseInt(l[1], 2).toString(2).padStart(4, "0") : "0000"
    }`;
    p++;
  }
};

const reload = () => {
  reset();
  emu.ram = JSON.parse(JSON.stringify(emu.compiled));
};

const render = () => {
  requestAnimationFrame(render);

  const ram = document.querySelector("#ram table").children[0].children;
  for (let i = 0; i < emu.ram.length; i++) {
    a = emu.ram[i];
    ram[i + 1].children[1].innerText = a;
  }

  const reg = document.querySelector("#registers table").children[0].children;
  const regK = Object.keys(emu.registers);
  for (let i = 0; i < regK.length; i++) {
    a = emu.registers[regK[i]];
    reg[i + 1].children[1].innerText = a;
  }
};

render();
