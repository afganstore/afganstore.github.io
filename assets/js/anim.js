// Анимация для уведомлений
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }, 10);
}

// Alert
function showAlert(message) {
  const alertOverlay = document.createElement("div");
  alertOverlay.className = "alert-overlay";
  alertOverlay.innerHTML = `
    <div class="alert-box">
      <div class="alert-content">
        <p>${message}</p>
        <button class="btn btn-primary alert-ok">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(alertOverlay);
  setTimeout(() => {
    alertOverlay.classList.add("active");
    document.querySelector(".alert-box")?.classList.add("active");
  }, 10);

  // Центрируем кнопку OK
  const okButton = document.querySelector(".alert-ok");
  if (okButton) {
    okButton.style.display = "block";
    okButton.style.margin = "0 auto";
    okButton.style.marginTop = "20px";
  }

  document.querySelector(".alert-ok")?.addEventListener("click", function () {
    alertOverlay.classList.remove("active");
    document.querySelector(".alert-box")?.classList.remove("active");
    setTimeout(() => {
      alertOverlay.remove();
    }, 300);
  });
}

// Плавный скролл к началу страницы
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Пасхалка при удерживании логотипа или надписи магазина
function setupEasterEgg() {
  const logoIcon = document.querySelector(".logo-icon");
  const logoText = document.querySelector(".logo h1");

  if (!logoIcon && !logoText) return;

  const elements = [logoIcon, logoText].filter((el) => el !== null);

  elements.forEach((element) => {
    let pressTimer;

    element.addEventListener("mousedown", () => {
      pressTimer = setTimeout(() => {
        const message =
          translations[currentLang].easter_egg ||
          "Ты нашёл секретную пасхалку!";
        const audio = new Audio("assets/sounds/pixel6.mp3");
        audio.play();
        showAlert(message);
      }, 1000);
    });

    element.addEventListener("mouseup", () => {
      clearTimeout(pressTimer);
    });

    element.addEventListener("mouseleave", () => {
      clearTimeout(pressTimer);
    });
  });
}

// Анимация для элементов при скролле
function animateOnScroll() {
  const elements = document.querySelectorAll(".product-card");
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Анимация для кнопок
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });
    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Устанавливаем пасхалку для логотипа и текста
  setupEasterEgg();

  // Вешаем обработчик на логотип и текст для скролла вверх
  const logoIcon = document.querySelector(".logo-icon");
  const logoText = document.querySelector(".logo h1");

  if (logoIcon) {
    logoIcon.addEventListener("click", scrollToTop);
  }

  if (logoText) {
    logoText.addEventListener("click", scrollToTop);
  }
});

// Запуск анимаций при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
  document.body.classList.add("loaded");
});
