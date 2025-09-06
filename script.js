// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Загрузка темы из localStorage
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // Инициализация корзины и избранного
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  updateCartCount();
  updateWishlistToggle();

  // Создание фильтров из категорий продуктов
  createFilterButtons();

  // Загрузка продуктов
  loadProducts();

  // Проверка необходимости показа кнопки меню
  checkMobileMenuVisibility();

  // Обработчики событий
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);
  document.getElementById("cart-toggle").addEventListener("click", openCart);
  document.getElementById("close-cart").addEventListener("click", closeCart);
  document
    .querySelector(".mobile-menu-toggle")
    .addEventListener("click", toggleMobileMenu);
  document
    .getElementById("wishlist-toggle")
    .addEventListener("click", function () {
      document.querySelector('.filter-btn[data-filter="wishlist"]').click();
    });

  // Обработчик изменения размера окна
  window.addEventListener("resize", checkMobileMenuVisibility);

  // Обработчик отправки формы
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Проверяем, загружены ли фразы из huy.js
      if (typeof getRandomFormPhrase === "function") {
        const randomMessage = getRandomFormPhrase();
        showAlert(randomMessage);
      } else {
        // Фолбэк, если huy.js не загрузился
        showAlert(
          "Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.",
        );
      }

      this.reset();
    });
  }

  // Функция проверки видимости навигации и отображения кнопки меню
  function checkMobileMenuVisibility() {
    const desktopNav = document.querySelector(".desktop-nav");
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");

    if (desktopNav) {
      const navItems = desktopNav.querySelectorAll("li");
      let totalNavWidth = 0;

      navItems.forEach((item) => {
        totalNavWidth += item.offsetWidth;
      });

      const availableWidth = desktopNav.offsetWidth;

      // Если навигация не помещается или это мобильное устройство
      if (totalNavWidth > availableWidth || window.innerWidth <= 992) {
        desktopNav.style.display = "none";
        mobileMenuToggle.style.display = "flex";
      } else {
        desktopNav.style.display = "flex";
        mobileMenuToggle.style.display = "none";
      }
    }
  }

  // Функция создания кнопок фильтров из категорий
  function createFilterButtons() {
    const filtersContainer = document.getElementById("product-filters");
    filtersContainer.innerHTML = "";

    // Создаем кнопку "Все"
    const allButton = document.createElement("button");
    allButton.className = "filter-btn active";
    allButton.dataset.filter = "all";
    allButton.textContent = translations.ru.filter_all;
    filtersContainer.appendChild(allButton);

    // Создаем кнопки для каждой категории
    for (const [key, value] of Object.entries(categories)) {
      const button = document.createElement("button");
      button.className = "filter-btn";
      button.dataset.filter = key;
      button.textContent = value;
      filtersContainer.appendChild(button);
    }

    // Создаем кнопку "Избранное"
    const wishlistButton = document.createElement("button");
    wishlistButton.className = "filter-btn";
    wishlistButton.dataset.filter = "wishlist";
    wishlistButton.textContent = translations.ru.filter_wishlist;
    filtersContainer.appendChild(wishlistButton);

    // Добавляем обработчики событий для фильтров
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        filterProducts(this.dataset.filter);
      });
    });
  }

  // Функция загрузки продуктов
  function loadProducts() {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";

    products.forEach((product) => {
      const isInWishlist = wishlist.includes(product.id);
      const productCard = document.createElement("div");
      productCard.className = `product-card ${product.category}`;
      productCard.innerHTML = `
                <div class="product-image">
                    <img src="images/${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJmMmYyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIGltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price.toLocaleString()} ₽</p>
                    <div class="product-actions">
                        <button class="add-to-cart" data-id="${product.id}">${translations.ru.button_add_to_cart}</button>
                        <button class="wishlist ${isInWishlist ? "active" : ""}" data-id="${product.id}">
                            <i class="${isInWishlist ? "fas" : "far"} fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
      productContainer.appendChild(productCard);
    });

    // Добавление обработчиков для кнопок "В корзину"
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = parseInt(this.dataset.id);
        addToCart(productId);
      });
    });

    // Добавление обработчиков для кнопок избранного
    document.querySelectorAll(".wishlist").forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = parseInt(this.dataset.id);
        toggleWishlist(productId, this);
      });
    });
  }

  // Функция фильтрации продуктов
  function filterProducts(filter) {
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      } else if (filter === "wishlist") {
        const productId = parseInt(card.querySelector(".wishlist").dataset.id);
        if (wishlist.includes(productId)) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      } else {
        if (card.classList.contains(filter)) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      }
    });
  }

  // Функции для работы с корзиной
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    updateCart();

    // Показываем рандомную фразу для покупки
    if (typeof getRandomPurchasePhrase === "function") {
      showNotification(getRandomPurchasePhrase());
    } else {
      showNotification(
        `${product.name} ${translations.ru.notification_added_to_cart}`,
      );
    }
  }

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }

  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;
  }

  function renderCartItems() {
    const cartContent = document.getElementById("cart-content");

    if (cart.length === 0) {
      cartContent.innerHTML = `<p class="empty-cart">${translations.ru.cart_empty}</p>`;
      document.getElementById("cart-total").textContent = "0";
      return;
    }

    cartContent.innerHTML = "";

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <img src="images/${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YyZjJmMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZTwvdGV4dD48L3N2Zz4='">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">${item.price.toLocaleString()} ₽</p>
                    <div class="cart-item-actions">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
      cartContent.appendChild(cartItem);
    });

    // Обновление итоговой суммы
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    document.getElementById("cart-total").textContent = total.toLocaleString();

    // Добавление обработчиков для кнопок в корзине
    document.querySelectorAll(".quantity-btn.minus").forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = parseInt(this.dataset.id);
        updateQuantity(productId, -1);
      });
    });

    document.querySelectorAll(".quantity-btn.plus").forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = parseInt(this.dataset.id);
        updateQuantity(productId, 1);
      });
    });

    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = parseInt(this.dataset.id);
        removeFromCart(productId);
      });
    });
  }

  function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      cart[itemIndex].quantity += change;

      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }

      updateCart();
    }
  }

  function removeFromCart(productId) {
    const product = products.find((p) => p.id === productId);
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
    showNotification(
      `${product.name} ${translations.ru.notification_removed_from_cart}`,
    );
  }

  // Функции для работы с избранным
  function toggleWishlist(productId, button) {
    const product = products.find((p) => p.id === productId);
    const index = wishlist.indexOf(productId);

    if (index === -1) {
      wishlist.push(productId);
      button.classList.add("active");
      button.innerHTML = '<i class="fas fa-heart"></i>';
      showNotification(
        `${product.name} ${translations.ru.notification_added_to_wishlist}`,
      );
    } else {
      wishlist.splice(index, 1);
      button.classList.remove("active");
      button.innerHTML = '<i class="far fa-heart"></i>';
      showNotification(
        `${product.name} ${translations.ru.notification_removed_from_wishlist}`,
      );
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistToggle();
  }

  function updateWishlistToggle() {
    const wishlistToggle = document.getElementById("wishlist-toggle");
    if (wishlist.length > 0) {
      wishlistToggle.classList.add("active");
      wishlistToggle.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
      wishlistToggle.classList.remove("active");
      wishlistToggle.innerHTML = '<i class="far fa-heart"></i>';
    }
  }

  // Функции для работы с темой
  function toggleTheme() {
    const currentTheme = document.body.classList.contains("dark-theme")
      ? "light"
      : "dark";
    setTheme(currentTheme);

    // Анимация переключения темы
    document.documentElement.style.transition = "all 0.5s ease";
    setTimeout(() => {
      document.documentElement.style.transition = "";
    }, 500);
  }

  function setTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.getElementById("theme-toggle").innerHTML =
        '<i class="fas fa-sun"></i>';
      document.getElementById("theme-toggle").classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      document.getElementById("theme-toggle").innerHTML =
        '<i class="fas fa-moon"></i>';
      document.getElementById("theme-toggle").classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }

  // Функции для работы с корзиной (открытие/закрытие)
  function openCart() {
    const cartOverlay = document.getElementById("cart-overlay");
    const cartContainer = document.querySelector(".cart-container");

    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    // Анимация открытия корзины
    setTimeout(() => {
      cartContainer.style.transform = "translateX(0)";
    }, 10);

    renderCartItems();
  }

  function closeCart() {
    const cartOverlay = document.getElementById("cart-overlay");
    const cartContainer = document.querySelector(".cart-container");

    // Анимация закрытия корзины
    cartContainer.style.transform = "translateX(100%)";

    setTimeout(() => {
      cartOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }, 300);
  }

  // Функция для мобильного меню
  function toggleMobileMenu() {
    const mobileNav = document.querySelector(".mobile-nav");
    mobileNav.classList.toggle("active");

    // Анимация мобильного меню
    if (mobileNav.classList.contains("active")) {
      mobileNav.style.maxHeight = mobileNav.scrollHeight + "px";
    } else {
      mobileNav.style.maxHeight = "0";
    }
  }

  // Вспомогательная функция для уведомлений
  function showNotification(message) {
    // Удаляем предыдущие уведомления
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
    document.body.appendChild(notification);

    // Анимация появления
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Автоматическое скрытие через 3 секунды
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Функция для показа alert с анимацией
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

    // Анимация появления
    setTimeout(() => {
      alertOverlay.classList.add("active");
      document.querySelector(".alert-box").classList.add("active");
    }, 10);

    // Обработчик кнопки OK
    document.querySelector(".alert-ok").addEventListener("click", function () {
      alertOverlay.classList.remove("active");
      document.querySelector(".alert-box").classList.remove("active");
      setTimeout(() => {
        alertOverlay.remove();
      }, 300);
    });
  }

  // Закрытие корзины при клике вне ее области
  document
    .getElementById("cart-overlay")
    .addEventListener("click", function (e) {
      if (e.target === this) {
        closeCart();
      }
    });

  // Обработчик Escape для закрытия корзины
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeCart();
    }
  });

  // Плавная прокрутка для навигации
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

        document.querySelector(".mobile-nav").classList.remove("active");
        document.querySelector(".mobile-nav").style.maxHeight = "0";
      }
    });
  });

  // Обработчик для кнопки оформления заказа
  document
    .querySelector(".checkout-btn")
    .addEventListener("click", function () {
      if (cart.length > 0) {
        // Используем фразу из huy.js для оформления заказа
        if (typeof getRandomCheckoutPhrase === "function") {
          showAlert(getRandomCheckoutPhrase());
        } else {
          showAlert("Заказ оформлен! Спасибо за покупку!");
        }

        cart = [];
        updateCart();
        closeCart();
      }
    });

  // Анимация для логотипа при загрузке
  const logoIcon = document.querySelector(".logo-icon");
  if (logoIcon) {
    setTimeout(() => {
      logoIcon.style.transform = "scale(1.1)";
      setTimeout(() => {
        logoIcon.style.transform = "scale(1)";
      }, 300);
    }, 500);
  }

  // Интерактивная анимация логотипа при клике
  if (logoIcon) {
    logoIcon.addEventListener("click", function () {
      this.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 300);
    });
  }

  // Инициализация анимаций при загрузке
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});
