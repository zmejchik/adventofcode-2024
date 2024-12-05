import {
  rules as rulesImported,
  dataUpdate as dataUpdateImported,
} from "./inputday5.js";

let falseUpdate = [];
//initial data
const rules = rulesImported
  .trim()
  .split("\n")
  .map((line) => line.trim());

const data = dataUpdateImported
  .trim()
  .split("\n")
  .map((line) => line.trim().split(","));

//

data.forEach((row) => {
  let rulesIsTrue = true;
  for (let i = 0; i < row.length; i++) {
    for (let j = i + 1; j < row.length; j++) {
      const update = `${row[i]}|${row[j]}`;
      if (!rules.includes(update)) {
        rulesIsTrue = false;
        break;
      }
    }
  }

  if (!rulesIsTrue) falseUpdate.push(row);
});

falseUpdate.forEach((row) => {
  for (let i = 0; i < row.length; i++) {
    for (let j = 0; j < row.length; j++) {
      let update = `${row[i]}|${row[j]}`;
      if (row[i][j] !== update) {
        update = `${row[j]}|${row[i]}`;
        if (!rules.includes(update)) {
          const temp = row[i];
          row[i] = row[j];
          row[j] = temp;
        }
      }
    }
  }
});
const resultFalseUpdate = falseUpdate.reduce((result, row) => {
  return result + parseInt(row[Math.floor(row.length / 2)]);
}, 0);

console.log(resultFalseUpdate);
