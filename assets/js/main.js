// Переключение темы
function setTheme(theme) {
  document.body.classList.remove("dark-theme", "light-theme");
  document.body.classList.add(`${theme}-theme`);
  localStorage.setItem("theme", theme);
  const themeToggle = document.getElementById("theme-toggle");
  if (theme === "dark") {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
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

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelector(".mobile-nav").classList.remove("active");
    document.querySelector(".mobile-nav").style.maxHeight = "0";
  });
});

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

// Плавный скролл к началу страницы
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Плавный скролл к фильтрам с открытием раздела "Избранное"
function scrollToWishlist() {
  const filtersSection = document.getElementById("products");
  if (filtersSection) {
    window.scrollTo({
      top: filtersSection.offsetTop - 80,
      behavior: "smooth",
    });

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

// Установка OpenGraph мета-тегов
function setOpenGraphTags(config) {
  if (!config) return;

  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", config.title);
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", config.description);
  document
    .querySelector('meta[property="og:url"]')
    ?.setAttribute(
      "content",
      window.siteConfig.baseUrl + window.location.pathname,
    );
  document
    .querySelector('meta[property="og:image"]')
    ?.setAttribute("content", config.image);
  document
    .querySelector('meta[property="og:type"]')
    ?.setAttribute("content", config.type);
  document
    .querySelector('meta[property="og:site_name"]')
    ?.setAttribute("content", config.site_name);

  document
    .querySelector('meta[name="twitter:title"]')
    ?.setAttribute("content", config.title);
  document
    .querySelector('meta[name="twitter:description"]')
    ?.setAttribute("content", config.description);
  document
    .querySelector('meta[name="twitter:image"]')
    ?.setAttribute("content", config.image);
}

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  // Установка OpenGraph мета-тегов
  if (window.siteConfig?.openGraph?.default) {
    setOpenGraphTags(window.siteConfig.openGraph.default);
  }

  // Устанавливаем тему
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // Вешаем обработчики
  document
    .getElementById("theme-toggle")
    ?.addEventListener("click", toggleTheme);
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);
  document.getElementById("cart-toggle").addEventListener("click", openCart);
  document.getElementById("close-cart").addEventListener("click", closeCart);
  document
    .querySelector(".mobile-menu-toggle")
    .addEventListener("click", toggleMobileMenu);

  // Кнопка "Избранное" в хедере
  document
    .getElementById("wishlist-toggle")
    ?.addEventListener("click", scrollToWishlist);

  // Логотип и заголовок для скролла вверх
  const logoIcon = document.querySelector(".logo-icon");
  const logoText = document.querySelector(".logo h1");
  if (logoIcon) logoIcon.addEventListener("click", scrollToTop);
  if (logoText) logoText.addEventListener("click", scrollToTop);

  // Инициализация адблока
  if (typeof initAdBlock === "function") {
    initAdBlock();
  }

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
