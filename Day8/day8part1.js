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

    const ax1 = a1.x - dx;
    const ay1 = a1.y - dy;
    const ax2 = a2.x + dx;
    const ay2 = a2.y + dy;

    if (ax1 >= 0 && ay1 >= 0 && ax1 < columns && ay1 < rows) {
      uniqueAntinodes.add(`${ax1},${ay1}`);
    }

    if (ax2 >= 0 && ay2 >= 0 && ax2 < columns && ay2 < rows) {
      uniqueAntinodes.add(`${ax2},${ay2}`);
    }
  }
}

const result = uniqueAntinodes.size;

console.log(result);
