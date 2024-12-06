import {
  rules as rulesImported,
  dataUpdate as dataUpdateImported,
} from "../inputday5.js";

let trueUpdate = [];
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

  if (rulesIsTrue) {
    trueUpdate.push(row);
  }
});

const result = trueUpdate.reduce((result, row) => {
  return result + parseInt(row[Math.floor(row.length / 2)]);
}, 0);

console.log(result);
