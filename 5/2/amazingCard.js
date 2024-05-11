import Card from "./card.js"

class AmazingCard extends Card {
  constructor(container, cardNumber, flip) {
    super(container, cardNumber, flip);
  }

  createElement() {
    const card = document.createElement("div");
    card.classList.add("col", "p-3", "border");
    card.style = "width: 100px; height: 100px;";
    card.role = "button";

    card.addEventListener("click", () => {
      this.flip(this);
    });

    const img = document.createElement("img");
    img.role = "button";
    img.alt = "card image";
    img.classList.add("closed");
    img.style = "width: 100%; height: 100%; object-fit: cover";
    this.img = img;

    const cardsImgArray = [
      "./img/1.jpg",
      "./img/2.jpg",
      "./img/3.jpg",
      "./img/4.jpg",
      "./img/5.jpg",
      "./img/6.jpg",
      "./img/7.jpg",
      "./img/8.jpg",
    ];

    img.src = cardsImgArray[this.cardNumber - 1] || './img/default.jpg';

    img.onerror = () => {
      img.src = './img/default.jpg';
    };

    img.addEventListener("click", () => {
      this.flip(this);
    });

    card.appendChild(img);
    this.card = card;

    this.container.appendChild(card);
  }
}

export default AmazingCard;
