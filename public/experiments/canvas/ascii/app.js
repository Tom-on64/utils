const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image();
const loadImg = () => {
  image.src = document.getElementById("src").value;
  image.onload();
};

class Cell {
  constructor(x, y, symbol, color) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = "8px monospace"
    ctx.fillText(this.symbol, this.x, this.y);
  }
}

class AsciiEffect {
  #imageCells = [];
  #symbols = [];
  #pixels = [];
  #ctx;
  #width;
  #height;
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.#ctx.drawImage(image, 0, 0, this.#width, this.#height);
    this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
  }

  #convertToSymbol(g) {
    if (g > 210) return ".";
    else if (g > 200) return ",";
    else if (g > 190) return "'";
    else if (g > 180) return "-";
    else if (g > 170) return "~";
    else if (g > 160) return "!";
    else if (g > 150) return ":";
    else if (g > 140) return ";";
    else if (g > 130) return "!";
    else if (g > 120) return "|";
    else if (g > 110) return "$";
    else if (g > 100) return "%";
    else if (g > 90) return "&";
    else if (g > 80) return "@";
    else if (g > 70) return "#";
    else return " ";
  }

  #scanImage(cellSize) {
    this.#imageCells = [];
    for (let y = 0; y < this.#pixels.height; y += cellSize) {
      for (let x = 0; x < this.#pixels.width; x += cellSize) {
        const posX = x * 4;
        const posY = y * 4;
        const pos = posY * this.#pixels.width + posX;

        if (this.#pixels.data[pos + 3] > 128) {
          const red = this.#pixels.data[pos];
          const green = this.#pixels.data[pos + 1];
          const blue = this.#pixels.data[pos + 2];
          const total = red + green + blue;
          const avarageColorValue = total / 3;
          const color = `rgb(${red}, ${green}, ${blue})`;
          const symbol = this.#convertToSymbol(avarageColorValue);
          if (total > 100) this.#imageCells.push(new Cell(x, y, symbol, color));
        }
      }
    }
    console.log(this.#imageCells);
  }

  #drawAscii() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    for (let i in this.#imageCells) {
      this.#imageCells[i].draw(this.#ctx);
    }
  }

  draw(cellSize) {
    this.#scanImage(cellSize);
    this.#drawAscii();
  }
}

let effect;
image.onload = () => {
  canvas.width = image.width * 2;
  canvas.height = image.height * 2;
  effect = new AsciiEffect(ctx, image.width * 2, image.height * 2);
  effect.draw(10);
};

loadImg();
