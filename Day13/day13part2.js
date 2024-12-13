import { initialDate } from "./inputday13.js";

const dataSolvigs = initialDate.split("\n\n");
let sum = 0;
dataSolvigs.forEach((solve) => {
  const coeficients = extractCoefficients(solve);
  const equation = solveLinearSystemWithMinCondition(
    coeficients.a,
    coeficients.b,
    coeficients.c,
    coeficients.a1,
    coeficients.b1,
    coeficients.c1
  );
  sum += equation.x * 3 + equation.y;
});
console.log(sum);
function solveLinearSystemWithMinCondition(a, b, c, a1, b1, c1) {
  const determinant = a * b1 - a1 * b;
  const determinantX = c * b1 - c1 * b;
  const determinantY = a * c1 - a1 * c;

  if (determinant === 0 && determinantX !== 0 && determinantY !== 0) {
    let minSolution = null;
    let minValue = Infinity;

    for (let x = 0; x <= c; x++) {
      for (let y = 0; y <= c1; y++) {
        if (a * x + b * y === c && a1 * x + b1 * y === c1 && x > 0 && y > 0) {
          const value = 3 * x + y;
          if (value < minValue) {
            minValue = value;
            minSolution = { x, y };
          }
        }
      }
    }

    return minSolution;
  }

  const x = determinantX / determinant;
  const y = determinantY / determinant;

  if (x < 0 || y < 0 || !Number.isInteger(x) || !Number.isInteger(y)) {
    return { x: 0, y: 0 };
  }
  return { x, y };
}

function extractCoefficients(input) {
  const regex =
    /Button A: X\+([0-9]+), Y\+([0-9]+)\nButton B: X\+([0-9]+), Y\+([0-9]+)\nPrize: X=([0-9]+), Y=([0-9]+)/;
  const match = regex.exec(input);
  match[5] = 10000000000000 + parseInt(match[5], 10);
  match[6] = 10000000000000 + parseInt(match[6], 10);
  if (match) {
    return {
      a: parseInt(match[1], 10),
      b: parseInt(match[3], 10),
      c: parseInt(match[5], 10),
      a1: parseInt(match[2], 10),
      b1: parseInt(match[4], 10),
      c1: parseInt(match[6], 10),
    };
  }
}
