document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".btn");
  const dropdown = document.querySelector(".dropdown");

  document.addEventListener('click', (event) => {
    const isDropdownClicked = dropdown.contains(event.target);
    const isButtonClicked = event.target === button;

    dropdown.style.display = isDropdownClicked || isButtonClicked ? "block" : "none";
  });
});