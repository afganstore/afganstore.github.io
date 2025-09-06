let currentLang = localStorage.getItem("lang") || "ru";

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  updateLanguage();
}

function updateLanguage() {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[currentLang] && translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });

  const placeholders = document.querySelectorAll("[data-placeholder]");
  placeholders.forEach((element) => {
    const key = element.getAttribute("data-placeholder");
    if (translations[currentLang] && translations[currentLang][key]) {
      element.setAttribute("placeholder", translations[currentLang][key]);
    }
  });
}

function initLanguageSystem() {
  updateLanguage();
}

window.switchLanguage = switchLanguage;
window.initLanguageSystem = initLanguageSystem;

document.addEventListener("DOMContentLoaded", initLanguageSystem);
