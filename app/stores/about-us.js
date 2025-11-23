import { defineStore } from "pinia";
import { usePreloaderStore } from "~/stores/preloader";
import { useStrapiLocale } from "~/composables/useStrapiLocale";

export const useAboutStore = defineStore("about", {
  state: () => ({
    data: null,
    error: null,
    pending: false,
  }),

  actions: {
    async fetchAbout() {
      // Optimization: If we already have data (e.g. from server hydration), don't fetch again on client
      if (this.data) return;

      const isoLocale = useStrapiLocale();
      const preloader = usePreloaderStore();
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;

      preloader.show();
      this.pending = true;
      this.error = null;

      try {
        // FIXED: Use $fetch inside Pinia Actions
        const response = await $fetch(`${baseUrl}/about-section`, {
          method: "GET",
          headers: { Accept: "application/json" },
          // Best Practice: Use 'query' object for cleaner URL parameters
          query: {
            populate: "*",
            locale: isoLocale.value,
          },
        });

        // FIXED: Assign the raw response directly
        this.data = response;
      } catch (err) {
        console.error("Failed to fetch about:", err);
        this.error = err;
      } finally {
        this.pending = false;
        preloader.hide();
      }
    },
  },

  getters: {
    // Standard Strapi response is { data: {...}, meta: {...} }
    // So we access state.data (response) -> .data (content)
    aboutData: (state) => state.data?.data || {},
  },
});
