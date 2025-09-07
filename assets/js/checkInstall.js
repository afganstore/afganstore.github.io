// Функция для проверки статуса установки
function checkInstallStatus() {
  // Проверяем, загружен ли conf.js и существует ли нужное поле
  if (
    typeof window.siteConfig !== "undefined" &&
    window.siteConfig.hasOwnProperty("ifBaseInstallEnded")
  ) {
    if (window.siteConfig.ifBaseInstallEnded === "false") {
      // Перенаправляем на страницу установки
      window.location.href = "assets/install/install.html";
    }
  } else {
    console.error("Конфигурация ifBaseInstallEnded не найдена в siteConfig.");
  }
}

// Вызываем функцию при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  checkInstallStatus();
});
