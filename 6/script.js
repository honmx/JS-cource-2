async function showPrototypeChain() {
  const userInput = document.querySelector(".input");
  const className = userInput.value.trim();
  const prototypeChainElem = document.querySelector(".prototype");
  prototypeChainElem.innerHTML = "";

  if (!className) {
    userInput.classList.add("error");
    return;
  } else {
    userInput.classList.remove("error");
  }

  let classConstructor;

  if (typeof window[className] !== "function") {
    userInput.classList.add("error");
    return;
  }
  classConstructor = window[className];

  let current = classConstructor.prototype;
  const chainList = document.createElement("ol");

  while (current) {
    const prototypeItem = document.createElement("li");
    prototypeItem.textContent = current.constructor.name || "[Unnamed]";
    const propsList = document.createElement("ol");

    Object.entries(Object.getOwnPropertyDescriptors(current))
      .forEach(
        ([prop, descriptor]) => {
          const propItem = document.createElement("li");
          propItem.textContent = `${prop}: ${typeof descriptor.value}`;
          propsList.appendChild(propItem);
        }
      );

    prototypeItem.appendChild(propsList);
    chainList.appendChild(prototypeItem);
    current = Object.getPrototypeOf(current);
  }

  prototypeChainElem.appendChild(chainList);
}
