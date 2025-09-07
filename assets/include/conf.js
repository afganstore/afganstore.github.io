// Конфигурация сайта
window.siteConfig = {
  ifBaseInstallEnded: "true",

  // ссылка
  baseUrl: "https://afagp.store",

  // Настройки OpenGraph
  openGraph: {
    default: {
      title: "AFGAN Store - Инновационные технологии в каждом устройстве",
      description:
        "Откройте для себя мир передовой электроники с AFGAN Store. Широкий выбор качественной электроники для каждого.",
      url: window.location.href,
      image: "assets/images/og-image.jpg",
      type: "website",
      site_name: "AFGAN Store",
    },
    product: {
      title: "Продукт - AFGAN Store",
      description: "",
      url: "",
      image: "",
      type: "product",
    },
  },

  // Конфигурация адблока
  adBlock: {
    // Адблок всегда включен
    enabled: true,

    // Селекторы элементов, которые будут блокироваться
    blockedSelectors: [
      ".ad",
      ".advertisement",
      ".banner",
      ".promo",
      ".ad-container",
      ".ad-space",
      ".advert",
      ".advertising",
      ".ads",
      ".adsbygoogle",
      ".ad-placeholder",
      ".ad-slot",
      ".ad-unit",
      ".advertisement-banner",
      ".advertisement-container",
      ".advertisement-space",
      ".advertisement-slot",
      ".advertisement-unit",
      ".advertisements",
      ".adverts",
      ".google-auto-placed",
      ".google-ad",
      ".ad-test",
      ".advert-block",
      ".advert-box",
      ".advert-wrapper",
      ".advertisement-block",
      ".advertisement-box",
      ".advertisement-wrapper",
      ".advertisement-test",
      ".advertisement-placeholder",
      ".advertisement-slot-container",
      ".advertisement-unit-container",
      ".advertisement-space-container",
      ".advertisement-banner-container",
      ".advertisement-banner-wrapper",
      ".advertisement-banner-box",
      ".advertisement-banner-block",
    ],

    // Обход для noscript
    noscriptBypass: true,

    // Сообщение при блокировке рекламы
    blockMessage: "Реклама заблокирована.",
  },

  // Настройки адаптивности
  responsive: {
    breakpoints: {
      xs: 320,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
};
