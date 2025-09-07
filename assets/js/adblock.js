// Применение адблока
function applyAdBlock() {
  const isEnabled = window.adBlockConfig.enabled;
  const selectors = window.adBlockConfig.blockedSelectors.join(", ");

  const adElements = document.querySelectorAll(selectors);

  adElements.forEach((element) => {
    if (isEnabled) {
      element.style.display = "none";
      element.dataset.adblockHidden = "true";
    }
  });

  if (isEnabled) {
    console.log(window.adBlockConfig.blockMessage);
  }
}

// Обход для noscript
function bypassNoscript() {
  const noscripts = document.querySelectorAll("noscript");
  noscripts.forEach((noscript) => {
    const bypassDiv = document.createElement("div");
    bypassDiv.className = "noscript-bypass";
    bypassDiv.style.display = "none";
    bypassDiv.innerHTML = noscript.textContent || noscript.innerHTML;
    noscript.parentNode.insertBefore(bypassDiv, noscript);
  });
}

// Инициализация адблока
function initAdBlock() {
  applyAdBlock();

  // Обход для noscript
  if (window.adBlockConfig.noscriptBypass) {
    bypassNoscript();
  }

  // Периодическая проверка на новые рекламные блоки
  setInterval(applyAdBlock, 1000);
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  if (!window.adBlockConfig) {
    console.error("AdBlock config not found!");
    return;
  }

  initAdBlock();
});
