// huy.js - файл с рандомными фразами

// Фразы для формы отправки сообщения
const formPhrases = [
  "Спасибо за ваше сообщение! Мы обязательно пошлём вас нахуй!",
  "пошел нахуй",
  "я твою хуйню никогда не прочту. соси",
  "хуй тебе",
];

// Фразы для кнопки покупки/оформления заказа
const purchasePhrases = [
  "иди нахуй",
  "хуй тебе",
  "пошел нахуй долбаеб",
  "пососи",
];

// Фразы для оформления заказа
const checkoutPhrases = [
  "Спасибо за заказ! Курьер афган приедет к вам через 100 лет.",
  "спасибо за заказ который никогда к вам не приедет 🤙🤙🤙",
  "сосал?",
  "соси",
];

// Функция для получения случайной фразы для формы
function getRandomFormPhrase() {
  const randomIndex = Math.floor(Math.random() * formPhrases.length);
  return formPhrases[randomIndex];
}

// Функция для получения случайной фразы для покупки
function getRandomPurchasePhrase() {
  const randomIndex = Math.floor(Math.random() * purchasePhrases.length);
  return purchasePhrases[randomIndex];
}

// Функция для получения случайной фразы для оформления заказа
function getRandomCheckoutPhrase() {
  const randomIndex = Math.floor(Math.random() * checkoutPhrases.length);
  return checkoutPhrases[randomIndex];
}
