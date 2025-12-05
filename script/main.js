const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");
const addBtn = document.getElementById("addBtn");
const cardsList = document.getElementById("cardsContainer");

function createCardElement(cardData) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = String(cardData.id);

  const header = document.createElement("div");
  header.className = "card-header";

  const h2 = document.createElement("h2");
  h2.className = "card-title";
  h2.textContent = cardData.title;

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn tooltip";
  closeBtn.textContent = "✕";
  closeBtn.setAttribute("data-tooltip", "Удалить");
  closeBtn.addEventListener("click", () => {
    card.remove();
    storageDeleteCard(cardData.id);
  });

  header.appendChild(h2);
  header.appendChild(closeBtn);

  const p = document.createElement("p");
  p.className = "card-desc";
  p.textContent = cardData.description;

  const footer = document.createElement("div");
  footer.className = "card-footer";

  const sendBtn = document.createElement("button");
  sendBtn.className = "icon-btn tooltip";
  sendBtn.textContent = "⇪";
  sendBtn.setAttribute("data-tooltip", "Отправить");
  sendBtn.setAttribute("data-role", "send");

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn tooltip";
  editBtn.textContent = "✎";
  editBtn.setAttribute("data-tooltip", "Редактировать");
  editBtn.setAttribute("data-role", "edit");

  footer.appendChild(sendBtn);
  footer.appendChild(editBtn);

  card.appendChild(header);
  card.appendChild(p);
  card.appendChild(footer);

  return card;
}

function renderInitialCards() {
  const cards = storageGetAllCards();
  cards.forEach((cardData) => {
    const element = createCardElement(cardData);
    cardsList.appendChild(element);
  });
}

function addCardFromInput() {
  const title = titleInput.value.trim() || "Неизвестен";
  const description = descInput.value.trim() || "Без названия";

  const cardData = storageCreateCard(title, description);
  const element = createCardElement(cardData);
  cardsList.appendChild(element);

  titleInput.value = "";
  descInput.value = "";
  titleInput.focus();
}

renderInitialCards();

addBtn.addEventListener("click", addCardFromInput);

[titleInput, descInput].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addCardFromInput();
  });
});