// lang.js - файл с переводами
const translations = {
  ru: {
    site_title: "AFGAN Store",
    nav_home: "Главная",
    nav_products: "Товары",
    nav_about: "О нас",
    nav_contact: "Контакты",
    hero_title: "Нихуя не инновационные технологии",
    hero_title_highlight: "в каждом устройстве",
    hero_subtitle: "Закройте для себя мир передовой электроники с AFGAN Store",
    hero_button_products: "К покупкам",
    hero_button_about: "Узнать больше",
    section_products: "Наши товары",
    section_products_subtitle:
      "Маленький выбор качественной электроники для каждого",
    filter_all: "Все",
    filter_wishlist: "Избранное",
    button_add_to_cart: "В корзину",
    section_about: "О нас",
    section_about_subtitle: "Почему клиенты выбирают именно нас",
    about_text_1:
      "AFGAN Store - это старый магазин электроники, где инновации встречаются с недоступностью. Мы не отбираем каждый продукт, чтобы предложить нашим клиентам только худшее.",
    about_text_2:
      "Наша миссия - сделать старые технологии недоступными для каждого, обеспечивая при этом худший уровень сервиса и поддержки.",
    stat_years: "Веков на рынке",
    stat_customers: "Не довольных клиентов",
    stat_support: "Поддержка",
    section_contact: "Контакты",
    section_contact_subtitle: "Свяжитесь с нами любым не удобным способом",
    contact_title: "Свяжитесь с нами",
    contact_form_title: "Оставьте сообщение",
    contact_form_name: "Ваше имя",
    contact_form_email: "Ваш email",
    contact_form_message: "Ваше сообщение",
    contact_form_button: "Отправить",
    cart_title: "Ваша корзина",
    cart_empty: "Ваша корзина пуста",
    cart_total: "Итого",
    cart_checkout: "Оформить заказ",
    footer_description:
      "Лучшие смартфоны по лучшим ценам. Инновации и качество в каждом устройстве.",
    footer_menu: "Меню",
    footer_contacts: "Контакты",
    footer_rights: "Все права защищены.",
    notification_added_to_cart: "Товар добавлен в корзину",
    notification_removed_from_cart: "Товар удален из корзины",
    notification_added_to_wishlist: "Товар добавлен в избранное",
    notification_removed_from_wishlist: "Товар удален из избранного",
  },
};

// Функция для применения переводов
function applyTranslations(lang = "ru") {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
}

// Применяем переводы при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  applyTranslations("ru");
});
