import { initialDate } from "./inputday6Ex.js";

const data = initialDate.split("\n").map((row) => row.split(""));
const rows = data.length;
const columns = data[0].length;

const GUARD = "^";
const EMPTY = ".";
const WALL = "#";
const HEREWAS = "X";

let result = 1;
const positionGuard = findPositionGuard();
const directionName = ["up", "right", "down", "left"];
let directionIndex = 0;
let [nextX, nextY] = [positionGuard.x, positionGuard.y];

function moveGuard() {
  switch (directionName[directionIndex]) {
    case "up":
      nextY--;
      break;
    case "right":
      nextX++;
      break;
    case "down":
      nextY++;
      break;
    case "left":
      nextX--;
      break;
  }
}

while (isValidPosition(nextX, nextY)) {
  moveGuard();

  if (isValidPosition(nextX, nextY) && data[nextY][nextX] === WALL) {
    switch (directionName[directionIndex]) {
      case "up":
        nextY++;
        break;
      case "right":
        nextX--;
        break;
      case "down":
        nextY--;
        break;
      case "left":
        nextX++;
        break;
    }
    directionIndex = (directionIndex + 1) % 4;
  }

  if (isValidPosition(nextX, nextY) && data[nextY][nextX] === EMPTY) {
    data[nextY][nextX] = HEREWAS;
    result++;
  }
}

console.log(result);

function isValidPosition(x, y) {
  return x >= 0 && x < columns && y >= 0 && y < rows;
}

function findPositionGuard() {
  for (let y = 0; y < rows; y++) {
    const x = data[y].indexOf(GUARD);
    if (x !== -1) return { x, y };
  }
  return null;
}
