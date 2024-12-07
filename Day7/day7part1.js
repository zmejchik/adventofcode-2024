import { initialDate } from "./inputday7.js";

const data = initialDate.split("\n");
let sumResult = 0;

data.forEach((row) => {
  const [testValue, rowNumbers] = row.split(":");
  const numbers = rowNumbers.trim().split(" ").map(Number);
  const countZnak = numbers.length - 1;
  const binaryArray = createBinaryArray(countZnak);

  for (let i = 0; i < binaryArray.length; i++) {
    const binary = binaryArray[i];
    let value = numbers[0];

    for (let j = 0; j < countZnak; j++) {
      const operator = binary[j] === "0" ? "+" : "*";
      value =
        operator === "+" ? value + numbers[j + 1] : value * numbers[j + 1];
    }

    if (value === Number(testValue)) {
      sumResult += value;
      break;
    }
  }
});

console.log(sumResult);

function createBinaryArray(countZnak) {
  const result = [];
  const maxNumber = 2 ** countZnak;

  for (let i = 0; i < maxNumber; i++) {
    const binary = i.toString(2).padStart(countZnak, "0");
    result.push(binary);
  }

  return result;
}
