export function render(data) {
  const films = data.results;

  const container = document.createElement("div");
  container.classList.add("container", "d-flex", "justify-content-between", "flex-wrap", "py-4");

  for (const film of films) {
      const filmCard = createFilmCard(film);
      container.appendChild(filmCard);
  }

  return container;
}

function createFilmCard(filmData) {
  const filmCard = document.createElement("div");
  const cardBody = document.createElement("div");
  const title = document.createElement("h5");
  const director = document.createElement("p");
  const detailsButton = document.createElement("a");

  filmCard.style.width = "30%";
  filmCard.classList.add("card", "my-2");
  cardBody.classList.add("card-body");
  title.classList.add("card-title");
  director.classList.add("card-text");
  detailsButton.classList.add("btn", "btn-primary");

  filmCard.append(cardBody);
  cardBody.append(title);
  cardBody.append(director);
  cardBody.append(detailsButton);

  title.textContent = `Эпизод ${filmData.episode_id}. ${filmData.title} (дата выхода - ${
      filmData.release_date.split("-")[0]
  } год)`;
  director.textContent = `Режиссер - ${filmData.director}`;
  detailsButton.textContent = "О фильме";
  detailsButton.href = `?filmId=${filmData.episode_id}`;

  return filmCard;
}
