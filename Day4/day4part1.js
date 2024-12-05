import { initialDate } from "./inputday4.js";

const data = initialDate
  .toUpperCase()
  .split("\n")
  .map((row) => row.split(""));
const rows = data.length;
const columns = data[0].length;
const worldForSearch = ["X", "M", "A", "S"];
let result = 0;

const direction = [
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 },
  { dx: 1, dy: -1 },
  { dx: 1, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: -1, dy: 1 },
  { dx: -1, dy: -1 },
  { dx: 1, dy: 0 },
];

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    if (data[i][j] === "X") {
      for (let k = 0; k < direction.length; k++) {
        if (searchWordINDirection(i, j, direction[k])) {
          result++;
        }
      }
    }
  }
}

function searchWordINDirection(x, y, dir) {
  for (let i = 0; i < worldForSearch.length; i++) {
    const nextLetterPositionX = x + i * dir.dx;
    const nextLetterPositionY = y + i * dir.dy;
    if (
      nextLetterPositionX < 0 ||
      nextLetterPositionX >= columns ||
      nextLetterPositionY < 0 ||
      nextLetterPositionY > rows ||
      data[nextLetterPositionX][nextLetterPositionY] !== worldForSearch[i]
    ) {
      return false;
    }
  }
  return true;
}

console.log(result);
