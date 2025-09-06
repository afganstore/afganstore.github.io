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

// Фразы для удаления из корзины
const removeFromCartPhrases = [
  "нахуй удалил",
  "пошел нахуй",
  "ты пидор, нахуя удаляешь",
  "-телефончик",
];

// Функция для получения случайной фразы для формы
window.getRandomFormPhrase = function () {
  const randomIndex = Math.floor(Math.random() * formPhrases.length);
  return formPhrases[randomIndex];
};

// Функция для получения случайной фразы для покупки
window.getRandomPurchasePhrase = function () {
  const randomIndex = Math.floor(Math.random() * purchasePhrases.length);
  return purchasePhrases[randomIndex];
};

// Функция для получения случайной фразы для оформления заказа
window.getRandomCheckoutPhrase = function () {
  const randomIndex = Math.floor(Math.random() * checkoutPhrases.length);
  return checkoutPhrases[randomIndex];
};

// Функция для получения случайной фразы для удаления из корзины
window.getRandomRemoveFromCartPhrase = function () {
  const randomIndex = Math.floor(Math.random() * removeFromCartPhrases.length);
  return removeFromCartPhrases[randomIndex];
};
