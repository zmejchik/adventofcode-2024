import { initialDate } from "./inputday4.js";

const data = initialDate
  .toUpperCase()
  .split("\n")
  .map((row) => row.split(""));
const rows = data.length;
const columns = data[0].length;
let result = 0;

// M.S
// .A.
// M.S
for (let i = 0; i < rows - 2; i++) {
  for (let j = 0; j < columns - 2; j++) {
    if (
      (data[i][j] === "M" &&
        data[i][j + 2] === "S" &&
        data[i + 1][j + 1] === "A" &&
        data[i + 2][j] === "M" &&
        data[i + 2][j + 2] === "S") ||
      (data[i][j] === "M" &&
        data[i][j + 2] === "M" &&
        data[i + 1][j + 1] === "A" &&
        data[i + 2][j] === "S" &&
        data[i + 2][j + 2] === "S") ||
      (data[i][j] === "S" &&
        data[i][j + 2] === "M" &&
        data[i + 1][j + 1] === "A" &&
        data[i + 2][j] === "S" &&
        data[i + 2][j + 2] === "M") ||
      (data[i][j] === "S" &&
        data[i][j + 2] === "S" &&
        data[i + 1][j + 1] === "A" &&
        data[i + 2][j] === "M" &&
        data[i + 2][j + 2] === "M")
    ) {
      result++;
    }
  }
}

console.log(result);
