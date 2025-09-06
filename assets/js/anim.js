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
  document.querySelector(".alert-ok")?.addEventListener("click", function () {
    alertOverlay.classList.remove("active");
    document.querySelector(".alert-box")?.classList.remove("active");
    setTimeout(() => {
      alertOverlay.remove();
    }, 300);
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
});

// Запуск анимаций при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
  document.body.classList.add("loaded");
});
