// Переключение иконки темы
            document.addEventListener("DOMContentLoaded", function () {
                const themeToggle = document.getElementById("theme-toggle");
                const currentTheme = localStorage.getItem("theme") || "light";
                if (currentTheme === "dark") {
                    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                } else {
                    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                }
                themeToggle.addEventListener("click", function () {
                    const newTheme = document.body.classList.contains(
                        "dark-theme",
                    )
                        ? "light"
                        : "dark";
                    if (newTheme === "dark") {
                        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                    } else {
                        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                    }
                });
            });

            // Закрытие корзины по кнопке "Пошел нахуй"
            document
                .getElementById("continue-shopping-btn")
                .addEventListener("click", function () {
                    closeCart();
                    showNotification(getRandomPurchasePhrase());
                });

            // Закрытие мобильного меню при клике на ссылку
            document.querySelectorAll(".mobile-nav a").forEach((link) => {
                link.addEventListener("click", function () {
                    document
                        .querySelector(".mobile-nav")
                        .classList.remove("active");
                });
            });
