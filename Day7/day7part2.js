import { initialDate } from "./inputday7.js";

const data = initialDate.split("\n");
let sumResult = 0;

data.forEach((row) => {
  const [testValue, rowNumbers] = row.split(":");
  const numbers = rowNumbers.trim().split(" ").map(Number);
  const countZnak = numbers.length - 1;
  const ternaryArray = createTernaryArray(countZnak);

  for (let i = 0; i < ternaryArray.length; i++) {
    const ternary = ternaryArray[i];
    let value = numbers[0];

    for (let j = 0; j < countZnak; j++) {
      const operator =
        ternary[j] === "0" ? "+" : ternary[j] === "1" ? "*" : "||";
      value =
        operator === "+"
          ? value + numbers[j + 1]
          : operator === "*"
          ? value * numbers[j + 1]
          : parseInt(value.toString() + numbers[j + 1].toString());
    }

    if (value === Number(testValue)) {
      sumResult += value;
      break;
    }
  }
});

console.log(sumResult);

function createTernaryArray(countZnak) {
  const result = [];
  const maxNumber = 3 ** countZnak;

  for (let i = 0; i < maxNumber; i++) {
    const ternary = i.toString(3).padStart(countZnak, "0");
    result.push(ternary);
  }

  return result;
}
