import { initialDate } from "./inputday6.js";

const data = initialDate.split("\n").map((row) => row.split(""));
const data2 = initialDate.split("\n").map((row) => row.split(""));
const rows = data.length;
const columns = data[0].length;

const GUARD = "^";
const EMPTY = ".";
const WALL = "#";
const HEREWAS = "X";

const positionGuard = findPositionGuard();
const directionName = ["up", "right", "down", "left"];
let directionIndex = 0;
let [nextX, nextY] = [positionGuard.x, positionGuard.y];
let visitedPositions = [];
visitedPositions.push({ x: positionGuard.x, y: positionGuard.y });
let result = 1;
let result2 = 1;

//first goings position
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
    visitedPositions.push({ x: nextX, y: nextY });
  }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function findLoopPosition(data2, directionName) {
  let newData = data2;
  for (let i = 0; i < newData.length; i++) {
    for (let j = 0; j < newData[i].length; j++) {
      if (data[i][j] === HEREWAS) {
        let count = 0;
        newData[i][j] = WALL;
        [nextX, nextY] = [positionGuard.x, positionGuard.y];
        while (isValidPosition(nextX, nextY) && count < 1000000) {
          moveGuard();
          if (isValidPosition(nextX, nextY) && newData[nextY][nextX] === WALL) {
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
          count++;
          if (count === 1000000) {
            result2++;
          }
        }
        newData[i][j] = HEREWAS;
        directionIndex = 0;
      }
    }
  }
  return result2;
}

//================================================================
result2 = findLoopPosition(data2, directionName);

console.log(result);
console.log(result2);

function isValidPosition(x, y) {
  return x >= 0 && x < columns && y >= 0 && y < rows;
}

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
function findPositionGuard() {
  for (let y = 0; y < rows; y++) {
    const x = data[y].indexOf(GUARD);
    if (x !== -1) return { x, y };
  }
  return null;
}
