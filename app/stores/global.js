import { defineStore } from "pinia";
import { usePreloaderStore } from "~/stores/preloader";
import { useStrapiLocale } from "~/composables/useStrapiLocale";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    data: null,
    error: null,
    pending: false,
  }),

  actions: {
    async fetchGlobal() {
      // Optimization: Prevent re-fetching if data exists
      // if (this.data) return;

      const isoLocale = useStrapiLocale();
      const preloader = usePreloaderStore();
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;

      preloader.show();
      this.pending = true;
      this.error = null;

      try {
        // FIXED: Use $fetch instead of useFetch inside Pinia actions
        // $fetch returns the raw response, not a reactive ref
        const response = await $fetch(`${baseUrl}/global`, {
          method: "GET",
          headers: { Accept: "application/json" },
          // Best Practice: Use query params object
          query: {
            populate: "*",
            locale: isoLocale.value,
          },
        });

        // FIXED: Assign raw response directly
        this.data = response;
      } catch (err) {
        console.error("Failed to fetch global:", err);
        this.error = err;
      } finally {
        this.pending = false;
        preloader.hide();
      }
    },
  },

  getters: {
    // Renamed from homePageData to globalData for clarity
    globalData: (state) => state.data?.data || {},
  },
});
