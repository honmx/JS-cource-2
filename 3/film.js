export async function render(data) {
  const planetsUrls = data.planets;
  const speciesUrls = data.species;
  const planets = [];
  const species = [];

  async function fetchData(url) {
      const response = await fetch(url);
      return response.json();
  }

  async function fetchAndPopulateData(urls, array, listClass) {
      for (const url of urls) {
          const object = await fetchData(url);
          array.push(object);
          const liElement = createListItem(object.name);
          const ulElement = document.querySelector(`.${listClass}`);
          ulElement.appendChild(liElement);
      }
  }

  async function getData() {
      await Promise.all([
          fetchAndPopulateData(planetsUrls, planets, "planets-list"),
          fetchAndPopulateData(speciesUrls, species, "species-list"),
      ]);
  }

  await getData();

  const container = createContainer(data);

  return container;
}

function createListItem(name) {
  const liElement = document.createElement("li");
  liElement.textContent = name;
  return liElement;
}

function createContainer(data) {
  const container = document.createElement("div");
  container.classList.add("container", "py-4");
  container.innerHTML = `
      <h1>Звездные войны: "${data.title}"</h1>
      <p class="lead">${data.opening_crawl}</p>
      <h2 class="display-3">Planets</h2>
      <ul class="planets-list"></ul>
      <h2 class="display-3">Species</h2>
      <ul class="species-list"></ul>
      `;
  return container;
}
