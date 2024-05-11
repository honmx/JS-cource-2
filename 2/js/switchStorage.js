import localStorageObject from './localStorage.js';
import apiStorage from './apiStorage.js';

let currentStorage = localStorage.getItem("state") === "server" ? apiStorage : localStorageObject;

export function switchStorage() {
  const isLocalStorage = currentStorage === localStorageObject;

  currentStorage = isLocalStorage ? apiStorage : localStorageObject;

  localStorage.setItem("state", isLocalStorage ? "server" : "local");
}

export function getCurrentStorage() {
  return currentStorage;
}

export function saveData(data) {
  currentStorage.save(data);
}

export function loadData() {
  return currentStorage.load();
}