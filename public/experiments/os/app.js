const canvas = document.getElementById("os");
const ctx = canvas.getContext("2d");
const screen = [];
// Setup Screen
for (let y = 0; y < 16; y++) {
  const row = [];
  for (let x = 0; x < 9; x++) row.push("#000");
  screen.push(row);
}
"a".padStart()
// 16:9 res
tileSize = 64;
canvas.width = tileSize * 16;
canvas.height = tileSize * 9;

const render = () => {
  for (let y = 0; y < screen.length; y++) {
    for (let x = 0; x < screen.length; x++) {
      ctx.fillStyle = screen[x][y];
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
  requestAnimationFrame(render);
};

render();
