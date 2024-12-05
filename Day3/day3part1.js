let result = 0;

const regexForTrueMultiple = /mul\((-?\d+(\.\d+)?),(-?\d+(\.\d+)?)\)/g;
const regexNumber = /(-?\d+(\.\d+)?)/g;

getData("./inputday3part1.txt").then((data) => {
  const trueMultiply = data.match(regexForTrueMultiple);

  trueMultiply.forEach((oneFormula) => {
    const [number1, number2] = oneFormula.match(regexNumber);
    result += parseFloat(number1) * parseFloat(number2);
  });

  console.log(result);
});

async function getData(pathToFile) {
  const response = await fetch(pathToFile);
  const data = await response.text();
  return data;
}
