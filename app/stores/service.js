import { defineStore } from "pinia";
import { usePreloaderStore } from "~/stores/preloader";
import { useStrapiLocale } from "~/composables/useStrapiLocale";

export const useServiceStore = defineStore("service", {
  state: () => ({
    data: null,
    error: null,
    pending: false,
  }),

  actions: {
    async fetchService() {
      // Optimization: If data exists (hydrated from server), don't fetch again
      if (this.data) return;

      const isoLocale = useStrapiLocale();
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;
      const preloader = usePreloaderStore();

      preloader.show();
      this.pending = true;
      this.error = null;

      try {
        // FIXED: Use $fetch instead of useFetch inside Pinia actions
        const response = await $fetch(`${baseUrl}/service-section`, {
          method: "GET",
          headers: { Accept: "application/json" },
          // Best Practice: Complex query params are much safer and cleaner here
          query: {
            "populate[image_bg]": true,
            "populate[services][populate][image]": true,
            "populate[services][populate][list]": true,
            locale: isoLocale.value,
          },
        });

        // FIXED: Assign raw response directly
        this.data = response;
      } catch (err) {
        console.error("Failed to fetch service:", err);
        this.error = err;
      } finally {
        this.pending = false;
        preloader.hide();
      }
    },
  },

  getters: {
    // Kept your specific path, but added safety checks
    serviceData: (state) => state.data?.data?.attributes?.services?.data || [],
  },
});
