let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Обновление счетчика товаров в корзине
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

// Добавление товара в корзину
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  const message =
    typeof getRandomPurchasePhrase === "function"
      ? getRandomPurchasePhrase()
      : `Товар "${product.name}" добавлен в корзину!`;
  showNotification(message);
}

// Обновление корзины
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// Отрисовка товаров в корзине
function renderCartItems() {
  const cartContent = document.getElementById("cart-content");
  const cartFooter = document.querySelector(".cart-footer");

  if (!cartContent || !cartFooter) return;

  if (cart.length === 0) {
    cartContent.innerHTML = `
            <div class="empty-cart-container">
                <i class="fas fa-shopping-cart"></i>
                <p>${translations[currentLang]?.cart_empty || "Ваша корзина пуста"}</p>
                <button class="btn continue-shopping-btn" id="continue-shopping-btn" data-translate="cart_continue_shopping">
                    ${translations[currentLang]?.cart_continue_shopping || "Продолжить покупки"}
                </button>
            </div>
        `;
    cartFooter.style.display = "none";

    // Обработчик кнопки "Продолжить покупки"
    document
      .getElementById("continue-shopping-btn")
      ?.addEventListener("click", closeCart);

    return;
  }

  cartFooter.style.display = "flex";
  cartContent.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
            <img src="assets/images/${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='assets/images/placeholder.jpg'">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">${itemTotal.toLocaleString()} ₽</p>
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

  // Обновлённое отображение "Итого"
  const cartTotalElement = document.getElementById("cart-total");
  if (cartTotalElement) {
    cartTotalElement.innerHTML = `
            <h4>
                <span data-translate="cart_total">Итого:</span>
                <span>${total.toLocaleString()}</span> ₽
            </h4>
        `;
  }

  // Обработчики кнопок
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

// Обновление количества товара
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

// Удаление товара из корзины
function removeFromCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
  const message =
    typeof getRandomRemoveFromCartPhrase === "function"
      ? getRandomRemoveFromCartPhrase()
      : `Товар "${product.name}" удалён из корзины!`;
  showNotification(message);
}

// Открытие корзины
function openCart() {
  const cartOverlay = document.getElementById("cart-overlay");
  const cartContainer = document.querySelector(".cart-container");
  if (!cartOverlay || !cartContainer) return;

  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  renderCartItems();
}

// Закрытие корзины
function closeCart() {
  const cartOverlay = document.getElementById("cart-overlay");
  const cartContainer = document.querySelector(".cart-container");
  if (!cartOverlay || !cartContainer) return;

  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";

  // Удаляем обработчик кнопки "Продолжить покупки" при закрытии
  const continueShoppingBtn = document.getElementById("continue-shopping-btn");
  if (continueShoppingBtn) {
    continueShoppingBtn.removeEventListener("click", closeCart);
  }
}

// Оформление заказа
document.getElementById("checkout-btn")?.addEventListener("click", function () {
  if (cart.length > 0) {
    const message =
      typeof getRandomCheckoutPhrase === "function"
        ? getRandomCheckoutPhrase()
        : "Заказ оформлен! Спасибо!";
    showAlert(message);
    cart = [];
    updateCart();
    closeCart();
  }
});

// Закрытие корзины по клику вне её
document
  .getElementById("cart-overlay")
  ?.addEventListener("click", function (e) {
    if (e.target === this) {
      closeCart();
    }
  });

// Инициализация счетчика корзины
updateCartCount();
