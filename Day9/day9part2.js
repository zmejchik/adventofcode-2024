import { initialDate } from "./inputday9Ex.js";
const data = initialDate.split("");

console.log(data);

const dataLong = [];
let iterator = 0;

// Створюємо масив без стиснення
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

// Трансформуємо у масив об'єктів із {count, char}
const arrayObjects = [];
let count = 1;
let char = dataLong[0];

for (let i = 1; i <= dataLong.length; i++) {
  if (dataLong[i] === char) {
    count++;
  } else {
    arrayObjects.push({ count, char });
    char = dataLong[i];
    count = 1;
  }
}

// Отримуємо тільки числові об'єкти в порядку спадання
let arrayObjectsNumbers = arrayObjects
  .filter((value) => value.char !== ".")
  .reverse();

// Обчислення результату
const result = dataLong.reduce(
  (sum, value, index) => sum + index * (Number(value) || 0),
  0
);

console.log(arrayObjectsNumbers);
console.log(result);
console.log(arrayObjects);
