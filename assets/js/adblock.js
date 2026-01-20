// Применение адблока
function applyAdBlock() {
  // Обращаемся к правильному пути в window.siteConfig
  const config = window.siteConfig.adBlock;
  const isEnabled = config.enabled;
  const selectors = config.blockedSelectors.join(", ");

  const adElements = document.querySelectorAll(selectors);

  adElements.forEach((element) => {
    if (isEnabled) {
      element.style.display = "none";
      element.dataset.adblockHidden = "true";
    }
  });

  if (isEnabled) {
    console.log(config.blockMessage);
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
  const config = window.siteConfig.adBlock;
  
  applyAdBlock();

  // Обход для noscript
  if (config.noscriptBypass) {
    bypassNoscript();
  }

  // Периодическая проверка на новые рекламные блоки
  setInterval(applyAdBlock, 1000);
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  // Проверка существования всей цепочки конфига
  if (!window.siteConfig || !window.siteConfig.adBlock) {
    console.error("AdBlock config not found in window.siteConfig!");
    return;
  }

  initAdBlock();
});
