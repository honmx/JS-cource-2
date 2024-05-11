export default class Card {
  constructor(container, cardNumber, flip) {
    this.container = container;
    this.cardNumber = cardNumber;
    this.flip = flip;
    this.createElement();
  }

  createElement() {
    const card = document.createElement("div");
    card.classList.add("col", "p-3", "border", "text-white");
    card.textContent = this.cardNumber;
    card.role = "button";

    card.addEventListener("click", () => {
      this.flip(this);
    });

    this.card = card;

    this.container.appendChild(card);
  }

  set cardNumber(value) {
    this._cardNumber = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    this._open = value;
    this.card.classList.toggle("text-white")
  }

  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
  }

  get success() {
    return this._success;
  }
}