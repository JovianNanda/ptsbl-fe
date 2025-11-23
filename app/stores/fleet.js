import { defineStore } from "pinia";
import { usePreloaderStore } from "~/stores/preloader";
import { useStrapiLocale } from "~/composables/useStrapiLocale";

export const useFleetStore = defineStore("fleet", {
  state: () => ({
    data: null,
    error: null,
    pending: false,
  }),

  actions: {
    async fetchFleet() {
      // Optimization: If data exists (hydrated from server), don't fetch again
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
        const response = await $fetch(`${baseUrl}/fleet-section`, {
          method: "GET",
          headers: { Accept: "application/json" },
          // Best Practice: Pass query params as an object
          query: {
            populate: "*",
            locale: isoLocale.value,
          },
        });

        // FIXED: Assign raw response directly
        this.data = response;
      } catch (err) {
        console.error("Failed to fetch fleet:", err);
        this.error = err;
      } finally {
        this.pending = false;
        preloader.hide();
      }
    },
  },

  getters: {
    fleetData: (state) => state.data?.data || {},
  },
});
