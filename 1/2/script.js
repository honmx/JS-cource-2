document.addEventListener("DOMContentLoaded", (event) => {
  const form = document.querySelector("form");
  const button = document.querySelector(".btn");
  const container = document.querySelector(".container");

  const inputName = document.querySelector(".name");
  const inputSurname = document.querySelector(".surname");
  const inputMiddleName = document.querySelector(".middlename");
  const dictionary = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя- ";

  let newName, newSurname, newMiddleName;

  inputSurname.onblur = function () {
    inputSurname.value = doNewString(inputSurname, newSurname);
  };
  inputName.onblur = function () {
    inputName.value = doNewString(inputName, newName);
  };
  inputMiddleName.onblur = function () {
    inputMiddleName.value = doNewString(inputMiddleName, newMiddleName);
  };

  button.onclick = (e) => {
    let newElement = document.createElement("p");
    inputName.value &&
      inputSurname.value &&
      inputMiddleName.value &&
      (newElement.textContent =
        inputSurname.value + " " + inputName.value + " " + inputMiddleName.value);

    container.append(newElement);
    form.reset();
    e.preventDefault();
  };

  function doNewString(_string, _supportString) {
    let _tempName = [];
    _supportString = _string.value
      .toLowerCase()
      .trim()
      .replace(/[\s-]+/g, " ") // регулярные выражения
      .split("");

    _supportString.map((el) => {
      dictionary.includes(el) && _tempName.push(el);
    });
    _supportString = _tempName.join("");
    _supportString = _supportString.charAt(0).toUpperCase() + _supportString.slice(1);
    return _supportString;
  }
});