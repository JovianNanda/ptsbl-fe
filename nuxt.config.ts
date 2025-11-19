// https://nuxt.com/docs/api/configuration/nuxt-con
import Remove from "unplugin-remove/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  components: true,
  ssr: true,
  nitro: {
    routeRules: {
      "/**": { swr: true },
    },
    preset: "vercel",
  },

  vite: {
    plugins:
      process.env.NODE_ENV === "production"
        ? [
            Remove({
              exclude: ["console.log", "console.debug", "console.warn"],
            }),
          ]
        : [],
  },

  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "author",
          content: "PT. Sumber Bumi Lestari",
        },
        {
          name: "description",
          content:
            "PT Sarana Bumi Lestari menyediakan layanan pengangkutan, pengumpulan, dan pengelolaan Limbah B3 yang aman, berizin, dan terintegrasi di Indonesia.",
        },
      ],
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@pinia/nuxt",
    "nuxt-aos",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],

  robots: {
    sitemap: `${process.env.NUXT_SITE_URL}/sitemap.xml`,
    allow: ["/", "/about", "/services", "/contact", "/api"],
    disallow: ["/admin", "/dashboard"],
  },

  css: ["~/assets/css/main.css"],

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "id",
    langDir: "locales/",
    locales: [
      { code: "en", iso: "en", name: "English", file: "en.json" },
      { code: "id", iso: "id-ID", name: "Bahasa Indonesia", file: "id.json" },
    ],
  },

  runtimeConfig: {
    apiSecret: "",
    public: {
      siteUrl: process.env.NUXT_SITE_URL || "http://localhost:3000",
      siteName: process.env.NUXT_SITE_NAME || "PT Sarana Bumi Lestari",
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:1337/api",
      backendBase:
        process.env.NUXT_PUBLIC_BACKEND_BASE || "http://localhost:1337",
    },
  },

  sitemap: {
    sitemaps: {
      default: {
        sitemapName: "sitemap.xml",
        urls: [
          { loc: "/" },
          { loc: "/about" },
          { loc: "/services" },
          { loc: "/contact" },
        ],
      },
    },
  },

  aos: {
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
  },
});
