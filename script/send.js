const cardsSendRoot = document.getElementById("cardsContainer");

const BOT_TOKEN = "8529883105:AAExr-sv5fQS3qkgMzyVGotn4JX8BJdFc3Q";
const CHAT_ID = "5185300128";

function buildMessage(title, description) {
  return "Заметка:\n" + title + "\n\nОписание:\n" + description;
}

async function sendToBot(title, description) {
  const url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";
  const text = buildMessage(title, description);

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error);
  }
}

if (cardsSendRoot) {
  cardsSendRoot.addEventListener("click", (event) => {
    const sendBtn = event.target.closest('[data-role="send"]');
    if (!sendBtn) return;

    const card = sendBtn.closest(".card");
    if (!card) return;

    const titleElement = card.querySelector(".card-title");
    const descElement = card.querySelector(".card-desc");

    const title =
      (titleElement ? titleElement.textContent : "").trim() || "Неизвестен";
    const description =
      (descElement ? descElement.textContent : "").trim() || "Без названия";

    sendToBot(title, description);

    const oldTooltip = sendBtn.dataset.tooltip || "Отправить";
    sendBtn.dataset.tooltip = "Отправлено";
    setTimeout(() => {
      sendBtn.dataset.tooltip = oldTooltip;
    }, 1500);
  });
}