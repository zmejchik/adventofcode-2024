import { initialDate } from "./inputday8.js";

const data = initialDate.split("\n");
const rows = data.length;
const columns = data[0].length;
const antenas = [];
const uniqueAntinodes = new Set();

data.forEach((row, y) => {
  for (let x = 0; x < row.length; x++) {
    if (row[x] !== ".") {
      antenas.push({ x, y, antenaType: row[x] });
    }
  }
});

for (let i = 0; i < antenas.length; i++) {
  for (let j = i + 1; j < antenas.length; j++) {
    const a1 = antenas[i];
    const a2 = antenas[j];

    if (a1.antenaType !== a2.antenaType) continue;

    const dx = a2.x - a1.x;
    const dy = a2.y - a1.y;

    let ax1 = a1.x - dx;
    let ay1 = a1.y - dy;
    let ax2 = a2.x + dx;
    let ay2 = a2.y + dy;

    while (ax1 >= 0 && ay1 >= 0 && ax1 < columns && ay1 < rows) {
      if (data[ay1][ax1] === ".") {
        uniqueAntinodes.add(`${ax1},${ay1}`);
      }
      ax1 -= dx;
      ay1 -= dy;
    }

    while (ax2 >= 0 && ay2 >= 0 && ax2 < columns && ay2 < rows) {
      if (data[ay2][ax2] === ".") {
        uniqueAntinodes.add(`${ax2},${ay2}`);
      }
      ax2 += dx;
      ay2 += dy;
    }
  }
}

for (let i = 0; i < antenas.length; i++) {
  const a1 = antenas[i];
  uniqueAntinodes.add(`${a1.x},${a1.y}`);
}

const result = uniqueAntinodes.size;

console.log(result);
