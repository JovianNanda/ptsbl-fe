import { defineStore } from "pinia";
import { usePreloaderStore } from "~/stores/preloader";
import { useStrapiLocale } from "~/composables/useStrapiLocale";

export const useAboutStore = defineStore("about", {
  state: () => ({
    data: null,
    error: null,
    pending: false,
    // NEW: Track which language we currently have in memory
    currentLocale: null,
  }),

  actions: {
    async fetchAbout() {
      const isoLocale = useStrapiLocale();
      const requestedLocale = isoLocale.value;

      // FIXED OPTIMIZATION:
      // Only stop fetching if we have data AND the language matches.
      // If the languages are different (e.g., switching EN to ID), this will run false
      // and allow the fetch to proceed.
      if (this.data && this.currentLocale === requestedLocale) {
        return;
      }

      const preloader = usePreloaderStore();
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;

      preloader.show();
      this.pending = true;
      this.error = null;

      try {
        const response = await $fetch(`${baseUrl}/about-section`, {
          method: "GET",
          headers: { Accept: "application/json" },
          query: {
            populate: "*",
            locale: requestedLocale, // Use the variable
          },
        });

        this.data = response;
        // NEW: Update the tracker so we know we now have this language stored
        this.currentLocale = requestedLocale;
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
    aboutData: (state) => state.data?.data || {},
  },
});
