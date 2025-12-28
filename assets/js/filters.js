// Создание кнопок фильтров
window.createFilterButtons = function () {
  const filtersContainer = document.getElementById("product-filters");
  if (!filtersContainer) return;
  filtersContainer.innerHTML = "";
  const allButton = document.createElement("button");
  allButton.className = "filter-btn active";
  allButton.dataset.filter = "all";
  allButton.textContent = translations[currentLang].filter_all;
  filtersContainer.appendChild(allButton);
  for (const [key, value] of Object.entries(categories)) {
    const button = document.createElement("button");
    button.className = "filter-btn";
    button.dataset.filter = key;
    button.textContent = value;
    filtersContainer.appendChild(button);
  }
  const wishlistButton = document.createElement("button");
  wishlistButton.className = "filter-btn";
  wishlistButton.dataset.filter = "wishlist";
  wishlistButton.textContent = translations[currentLang].filter_wishlist;
  filtersContainer.appendChild(wishlistButton);
  // Обработчики кликов
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      filterProducts(this.dataset.filter);
    });
  });
};

// Загрузка товаров
window.loadProducts = function () {
  const productContainer = document.getElementById("product-container");
  if (!productContainer) return;
  productContainer.innerHTML = "";
  products.forEach((product, index) => {
    const isInWishlist = wishlist.includes(product.id);
    const productCard = document.createElement("div");
    productCard.className = `product-card ${product.category}`;
    productCard.innerHTML = `
      <div class="product-image">
        <img src="assets/images/${product.image}" alt="${product.name}" onerror="this.src='assets/images/placeholder.jpg'">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-price">${product.price.toLocaleString()} ₽</p>
        <div class="product-actions">
          <button class="add-to-cart btn btn-primary" data-id="${product.id}">
            <i class="fas fa-shopping-cart"></i>
            <span>${translations[currentLang]?.button_add_to_cart || "В корзину"}</span>
          </button>
          <a href="productView.html?id=${product.id}" class="view-product btn btn-secondary">
            <i class="fas fa-info-circle"></i>
            <span>${translations[currentLang]?.button_view_product || "О продукте"}</span>
          </a>
          <button class="wishlist-btn ${isInWishlist ? "active" : ""}" data-id="${product.id}">
            <i class="${isInWishlist ? "fas" : "far"} fa-heart"></i>
          </button>
        </div>
      </div>
    `;
    productContainer.appendChild(productCard);
    // Анимация появления
    setTimeout(() => {
      productCard.style.opacity = "1";
      productCard.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Обработчики кнопок
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", function () {
      const productId = parseInt(this.dataset.id);
      addToCart(productId);
    });
  });

  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const productId = parseInt(this.dataset.id);
      toggleWishlist(productId, this);
    });
  });
};

// Фильтрация товаров
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
      const productId = parseInt(card.querySelector(".wishlist-btn").dataset.id);
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

// Переключение избранного
function toggleWishlist(productId, button) {
  const product = products.find((p) => p.id === productId);
  const index = wishlist.indexOf(productId);
  if (index === -1) {
    wishlist.push(productId);
    button.classList.add("active");
    button.innerHTML = '<i class="fas fa-heart"></i>';
    showNotification(`Товар "${product.name}" добавлен в избранное!`);
  } else {
    wishlist.splice(index, 1);
    button.classList.remove("active");
    button.innerHTML = '<i class="far fa-heart"></i>';
    showNotification(`Товар "${product.name}" удалён из избранного!`);
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}
