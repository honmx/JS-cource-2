const loadedResources = {};

function loadResource(src) {
    if (src.endsWith(".js")) {
        return import(src);
    }
    if (src.endsWith(".css")) {
        if (!loadedResources[src]) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = src;
            loadedResources[src] = new Promise((resolve) => {
                link.addEventListener("load", () => resolve());
            });
            document.head.append(link);
        }
        return loadedResources[src];
    }
    return fetch(src).then((res) => res.json());
}

const app = document.querySelector("#app");
const searchParams = new URLSearchParams(location.search);
const filmId = searchParams.get("filmId");

function renderPage(modulePath, apiUrl, cssUrl) {
    Promise.all([modulePath, apiUrl, cssUrl].map((src) => loadResource(src))).then(
        ([pageModule, data]) => {
            app.innerHTML = "";
            app.append(pageModule.render(data));
        }
    );
}

if (filmId) {
    renderPage(
        "./film.js",
        `https://swapi.dev/api/films/${filmId}`,
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    );
} else {
    renderPage(
        "./films.js",
        "https://swapi.dev/api/films",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    );
}
