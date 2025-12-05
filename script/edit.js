const cardsContainer = document.getElementById("cardsContainer");

function startEditing(card, editBtn) {
  const titleElement = card.querySelector(".card-title");
  const descElement = card.querySelector(".card-desc");

  card.dataset.editing = "true";
  titleElement.contentEditable = "true";
  descElement.contentEditable = "true";
  titleElement.focus();
  editBtn.dataset.tooltip = "Сохранить";
}

function finishEditing(card, editBtn) {
  const titleElement = card.querySelector(".card-title");
  const descElement = card.querySelector(".card-desc");

  titleElement.contentEditable = "false";
  descElement.contentEditable = "false";

  const newTitle = titleElement.textContent.trim() || "Неизвестен";
  const newDesc = descElement.textContent.trim() || "Без названия";

  titleElement.textContent = newTitle;
  descElement.textContent = newDesc;

  const id = card.dataset.id;
  if (typeof storageUpdateCard === "function") {
    storageUpdateCard(id, newTitle, newDesc);
  }

  card.dataset.editing = "false";
  editBtn.dataset.tooltip = "Редактировать";
}

function toggleEditing(card, editBtn) {
  const isEditing = card.dataset.editing === "true";
  if (isEditing) {
    finishEditing(card, editBtn);
  } else {
    startEditing(card, editBtn);
  }
}

cardsContainer.addEventListener("click", (e) => {
  const editBtn = e.target.closest('[data-role="edit"]');
  if (!editBtn) return;
  const card = editBtn.closest(".card");
  if (!card) return;
  toggleEditing(card, editBtn);
});

cardsContainer.addEventListener("keydown", (e) => {
  const target = e.target;
  const isEditableTitle = target.matches('.card-title[contenteditable="true"]');
  const isEditableDesc = target.matches('.card-desc[contenteditable="true"]');
  if (!isEditableTitle && !isEditableDesc) return;
  if (e.key === "Enter") {
    e.preventDefault();
    const card = target.closest(".card");
    const editBtn = card.querySelector('[data-role="edit"]');
    if (!card || !editBtn) return;
    finishEditing(card, editBtn);
  }
});

cardsContainer.addEventListener("input", (e) => {
  const target = e.target;
  const isTitle = target.matches('.card-title[contenteditable="true"]');
  const isDesc = target.matches('.card-desc[contenteditable="true"]');
  if (!isTitle && !isDesc) return;

  const card = target.closest(".card");
  if (!card) return;

  const titleElement = card.querySelector(".card-title");
  const descElement = card.querySelector(".card-desc");

  const newTitle =
    (titleElement ? titleElement.textContent : "").trim() || "Неизвестен";
  const newDesc =
    (descElement ? descElement.textContent : "").trim() || "Без названия";

  const id = card.dataset.id;
  if (typeof storageUpdateCard === "function") {
    storageUpdateCard(id, newTitle, newDesc);
  }
});