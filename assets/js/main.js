// Переключение темы
function setTheme(theme) {
  document.body.classList.remove("dark-theme", "light-theme");
  document.body.classList.add(`${theme}-theme`);
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
}

// Проверка видимости мобильного меню
function checkMobileMenuVisibility() {
  const desktopNav = document.querySelector(".desktop-nav");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  if (!desktopNav || !mobileMenuToggle) return;

  const navItems = desktopNav.querySelectorAll("li");
  let totalNavWidth = 0;
  navItems.forEach((item) => (totalNavWidth += item.offsetWidth));

  const availableWidth = desktopNav.offsetWidth;
  if (totalNavWidth > availableWidth || window.innerWidth <= 768) {
    desktopNav.style.display = "none";
    mobileMenuToggle.style.display = "flex";
  } else {
    desktopNav.style.display = "flex";
    mobileMenuToggle.style.display = "none";
  }
}

// Переключение мобильного меню
function toggleMobileMenu() {
  const mobileNav = document.querySelector(".mobile-nav");
  if (!mobileNav) return;
  mobileNav.classList.toggle("active");
  if (mobileNav.classList.contains("active")) {
    mobileNav.style.maxHeight = mobileNav.scrollHeight + "px";
  } else {
    mobileNav.style.maxHeight = "0";
  }
}

// Плавный скролл к фильтрам с открытием раздела "Избранное"
function scrollToWishlist() {
  const filtersSection = document.getElementById("products");
  if (filtersSection) {
    window.scrollTo({
      top: filtersSection.offsetTop - 80,
      behavior: "smooth",
    });

    // Открываем фильтр "Избранное" после скролла
    setTimeout(() => {
      const wishlistButton = document.querySelector(
        '.filter-btn[data-filter="wishlist"]',
      );
      if (wishlistButton) {
        wishlistButton.click();
      }
    }, 600);
  }
}

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  // Устанавливаем тему
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // Вешаем обработчики
  document
    .getElementById("theme-toggle")
    ?.addEventListener("click", toggleTheme);
  document.getElementById("cart-toggle")?.addEventListener("click", openCart);
  document.getElementById("close-cart")?.addEventListener("click", closeCart);
  document
    .querySelector(".mobile-menu-toggle")
    ?.addEventListener("click", toggleMobileMenu);

  // Кнопка "Избранное" в хедере
  document
    .getElementById("wishlist-toggle")
    ?.addEventListener("click", scrollToWishlist);

  // Обработка формы обратной связи
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const message =
        typeof getRandomFormPhrase === "function"
          ? getRandomFormPhrase()
          : "Спасибо за ваше сообщение!";
      showAlert(message);
      this.reset();
    });
  }

  // Плавный скролл по якорям
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
        document.querySelector(".mobile-nav")?.classList.remove("active");
        document
          .querySelector(".mobile-nav")
          ?.style.setProperty("max-height", "0");
      }
    });
  });

  // Закрытие корзины по Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeCart();
    }
  });

  // Инициализация фильтров и товаров
  if (typeof createFilterButtons === "function") {
    createFilterButtons();
  }
  if (typeof loadProducts === "function") {
    loadProducts();
  }
  checkMobileMenuVisibility();

  // Обновление при изменении размера окна
  window.addEventListener("resize", checkMobileMenuVisibility);
});
