import Card from "./card.js"

const getNumbersArray = (length) => {
  const half = new Array(length / 2).fill(0).map((_, i) => i + 1);
  return half.concat(half);
};

const mixArray = (array) => {
  const result = array.slice(0);
  result.sort(() => Math.random() < 0.5 ? 1 : -1);
  return result;
};

const createRow = () => {
  const row = document.createElement("div");
  row.classList.add("row");
  return row;
};

const initField = (numbers) => {
  const field = document.createElement("div");
  field.classList.add("grid");

  let row = createRow();

  for (let i = 0; i < numbers.length; i++) {
    if (i % Math.sqrt(numbers.length) === 0) {
      field.append(row);
      row = createRow();
    }

    new Card(row, numbers[i], handleFlip);
  }

  field.append(row);
  return field;
};

const handleFlip = (card) => {
  if (card.success || card.open) return;

  card.open = !card.open;

  currentlyOpenedCards.push(card);

  if (currentlyOpenedCards.length === 2) {
    const [firstCard, secondCard] = currentlyOpenedCards;

    if (firstCard.cardNumber === secondCard.cardNumber) {
      firstCard.success = true;
      secondCard.success = true;

      currentlyOpenedCards = [];
    } else {
      currentlyOpenedCards = [];

      setTimeout(() => {
        firstCard.open = false;
        secondCard.open = false;
      }, 250);
    }
  }
};

const start = () => {
  const container = document.querySelector(".container-md");
  const numbers = mixArray(getNumbersArray(16));
  const field = initField(numbers);
  container.appendChild(field);
};

let currentlyOpenedCards = [];

start();
