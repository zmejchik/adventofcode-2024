import { initialDate } from "./inputday12Ex.js";

const data = initialDate.split("\n").map((line) => line.trim().split(""));
const directions = [
  { dx: 0, dy: 2 },
  { dx: 0, dy: -2 },
  { dx: 2, dy: 0 },
  { dx: -2, dy: 0 },
];
const finalMatrix = Array.from({ length: data.length * 2 + 1 }, () =>
  new Array(data[0].length * 2 + 1).fill(0)
);

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    finalMatrix[i * 2 + 1][j * 2 + 1] = data[i][j];
  }
}

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    const currentSymbol = data[i][j];
    const centerX = i * 2 + 1;
    const centerY = j * 2 + 1;

    for (let direction of directions) {
      const newX = centerX + direction.dx;
      const newY = centerY + direction.dy;

      if (
        newX > 0 &&
        newX < finalMatrix.length &&
        newY > 0 &&
        newY < finalMatrix[0].length
      ) {
        const neighborSymbol = finalMatrix[newX][newY];

        if (neighborSymbol !== 0 && neighborSymbol !== currentSymbol) {
          const midX = centerX + direction.dx / 2;
          const midY = centerY + direction.dy / 2;
          finalMatrix[midX][midY] = 1;
        }
      }
    }
  }
}

const symbolStats = {};

for (let i = 0; i < finalMatrix.length; i++) {
  for (let j = 0; j < finalMatrix[i].length; j++) {
    let currentCell = finalMatrix[i][j];

    if (currentCell === 0 || currentCell === 1) continue;
    if (!symbolStats[currentCell]) {
      symbolStats[currentCell] = { count: 0, adjacentOnes: 0 };
    }

    symbolStats[currentCell].count++;

    let onesAround = 0;
    for (let direction of directions) {
      const neighborX = i + direction.dx / 2;
      const neighborY = j + direction.dy / 2;

      if (
        neighborX >= 0 &&
        neighborX < finalMatrix.length &&
        neighborY >= 0 &&
        neighborY < finalMatrix[0].length &&
        finalMatrix[neighborX][neighborY] === 1
      ) {
        onesAround++;
      }
    }
    symbolStats[currentCell].adjacentOnes += onesAround;
  }
}

console.log(finalMatrix);
console.log(symbolStats);
