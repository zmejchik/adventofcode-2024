import { initialDate } from "./inputday9.js";
const data = initialDate.split("");

console.log(data);

const dataLong = [];
let iterator = 0;
//`2333133121414131402`;
//create array with not arhiv
for (let i = 0; i < data.length; i++) {
  if (i % 2 === 0) {
    for (let j = 0; j < data[i]; j++) {
      dataLong.push(iterator);
    }
    iterator++;
  } else {
    for (let j = 0; j < data[i]; j++) {
      dataLong.push(".");
    }
  }
}

//transform array
let endPointer = dataLong.length - 1;
for (let i = 0; i < dataLong.length; i++) {
  if (dataLong[i] === ".") {
    while (dataLong[endPointer] === ".") {
      endPointer--;
    }
    if (endPointer <= i) break;
    [dataLong[i], dataLong[endPointer]] = [dataLong[endPointer], dataLong[i]];
    endPointer--;
  }
}

const result = dataLong.reduce(
  (sum, value, index) => sum + index * (Number(value) || 0),
  0
);

console.log(result);
