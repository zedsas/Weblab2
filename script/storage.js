const STORAGE_KEY = "cards";

function storageLoadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data;
  } catch (e) {
    console.error("Ошибка чтения localStorage", e);
    return [];
  }
}

let storageCards = storageLoadInitial();
let storageLastId = storageCards.reduce((max, card) => {
  if (typeof card.id === "number" && card.id > max) return card.id;
  return max;
}, 0);

function storageSave() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageCards));
  } catch (e) {
    console.error("Ошибка записи localStorage", e);
  }
}

function storageGetAllCards() {
  return storageCards.slice();
}

function storageCreateCard(title, description) {
  storageLastId += 1;
  const card = { id: storageLastId, title, description };
  storageCards.push(card);
  storageSave();
  return card;
}

function storageUpdateCard(id, title, description) {
  const numericId = Number(id);
  const index = storageCards.findIndex((card) => card.id === numericId);
  if (index === -1) return;
  storageCards[index].title = title;
  storageCards[index].description = description;
  storageSave();
}

function storageDeleteCard(id) {
  const numericId = Number(id);
  storageCards = storageCards.filter((card) => card.id !== numericId);
  storageSave();
}