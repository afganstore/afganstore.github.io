// Получение ID продукта из URL
function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id"));
}

// Загрузка информации о продукте
function loadProduct() {
  const productId = getProductIdFromUrl();
  if (!productId) {
    showAlert(
      translations[currentLang]?.product_not_found || "Продукт не найден",
    );
    return;
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    showAlert(
      translations[currentLang]?.product_not_found || "Продукт не найден",
    );
    return;
  }

  renderProduct(product);
  updateOpenGraph(product);
}

// Отображение информации о продукте
function renderProduct(product) {
  const container = document.getElementById("product-view-container");
  if (!container) return;

  const isInWishlist = wishlist.includes(product.id);
  const productUrl = `${window.siteConfig.baseUrl}/productView.html?id=${product.id}`;

  container.innerHTML = `
    <div class="product-header">
      <h1 class="product-title">${product.name}</h1>
      <p class="product-price">${translations[currentLang]?.product_price || "Цена:"} ${product.price.toLocaleString()} ₽</p>
    </div>

    <div class="product-content">
      <div class="product-images">
        <img src="assets/images/${product.image}" alt="${product.name}" class="product-main-image" onerror="this.src='assets/images/placeholder.jpg'">
        <div class="product-thumbnails">
          <img src="assets/images/${product.image}" alt="${product.name}" class="product-thumbnail active" onerror="this.src='assets/images/placeholder.jpg'">
        </div>
      </div>

      <div class="product-info">
        <div class="product-description">
          <h3>${translations[currentLang]?.product_description || "Описание"}</h3>
          <p>${product.description}</p>
        </div>

        <div class="product-specs">
          <h3>${translations[currentLang]?.product_specs || "Характеристики"}</h3>
          <div class="spec-item">
            <span class="spec-name">${translations[currentLang]?.product_category || "Категория"}</span>
            <span class="spec-value">${categories[product.category] || product.category}</span>
          </div>
          <div class="spec-item">
            <span class="spec-name">${translations[currentLang]?.product_id || "ID продукта"}</span>
            <div class="spec-value-id">
              <span>${product.id}</span>
              <div class="spec-actions">
                <button class="copy-id-btn" title="${translations[currentLang]?.product_copy_id || "Скопировать ID"}">
                  <i class="far fa-copy"></i>
                </button>
                <button class="share-link-btn" title="${translations[currentLang]?.product_share || "Поделиться"}">
                  <i class="fas fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="product-actions">
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">
            <i class="fas fa-shopping-cart"></i>
            <span>${translations[currentLang]?.product_add_to_cart || "Добавить в корзину"}</span>
          </button>
          <button class="btn btn-secondary wishlist-btn ${isInWishlist ? "active" : ""}" data-id="${product.id}">
            <i class="${isInWishlist ? "fas" : "far"} fa-heart"></i>
            <span>${isInWishlist ? translations[currentLang]?.product_in_wishlist || "В избранном" : translations[currentLang]?.product_add_to_wishlist || "В избранное"}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  // Обработчики кнопок
  document
    .querySelector(".add-to-cart")
    ?.addEventListener("click", function () {
      addToCart(product.id);
    });

  document
    .querySelector(".wishlist-btn")
    ?.addEventListener("click", function () {
      toggleWishlist(product.id, this);
    });

  // Обработчик кнопки копирования ID
  const copyIdBtn = document.querySelector(".copy-id-btn");
  if (copyIdBtn) {
    copyIdBtn.addEventListener("click", function () {
      copyProductIdToClipboard(product.id);
    });
  }

  // Обработчик кнопки "Поделиться"
  const shareLinkBtn = document.querySelector(".share-link-btn");
  if (shareLinkBtn) {
    shareLinkBtn.addEventListener("click", function () {
      copyProductLinkToClipboard(productUrl);
    });
  }

  // Обработчики миниатюр
  document.querySelectorAll(".product-thumbnail").forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      document
        .querySelectorAll(".product-thumbnail")
        .forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

// Копирование ID продукта в буфер обмена
function copyProductIdToClipboard(productId) {
  navigator.clipboard
    .writeText(productId.toString())
    .then(() => {
      showNotification(
        translations[currentLang]?.product_copy_success ||
          "ID скопирован в буфер обмена!",
      );
    })
    .catch((err) => {
      console.error("Ошибка копирования: ", err);
      showNotification("Ошибка копирования ID");
    });
}

// Копирование ссылки на продукт в буфер обмена
function copyProductLinkToClipboard(productUrl) {
  navigator.clipboard
    .writeText(productUrl)
    .then(() => {
      showNotification(
        translations[currentLang]?.product_share_success ||
          "Ссылка на продукт скопирована!",
      );
    })
    .catch((err) => {
      console.error("Ошибка копирования: ", err);
      showNotification("Ошибка копирования ссылки");
    });
}

// Обновление OpenGraph мета-тегов
function updateOpenGraph(product) {
  const ogTitle = document.getElementById("og-title");
  const ogDescription = document.getElementById("og-description");
  const ogUrl = document.getElementById("og-url");
  const ogImage = document.getElementById("og-image");
  const twitterTitle = document.getElementById("twitter-title");
  const twitterDescription = document.getElementById("twitter-description");
  const twitterImage = document.getElementById("twitter-image");

  const productUrl = `${window.siteConfig.baseUrl}/productView.html?id=${product.id}`;

  if (
    ogTitle &&
    ogDescription &&
    ogUrl &&
    ogImage &&
    twitterTitle &&
    twitterDescription &&
    twitterImage
  ) {
    ogTitle.content = `${product.name} - ${translations[currentLang]?.site_title || "AFGAN Store"}`;
    ogDescription.content = product.description;
    ogUrl.content = productUrl;
    ogImage.content = `assets/images/${product.image}`;

    twitterTitle.content = `${product.name} - ${translations[currentLang]?.site_title || "AFGAN Store"}`;
    twitterDescription.content = product.description;
    twitterImage.content = `assets/images/${product.image}`;
  }
}

// Инициализация страницы просмотра продукта
document.addEventListener("DOMContentLoaded", function () {
  loadProduct();
});
