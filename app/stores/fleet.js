import { defineStore } from "pinia";
import { usePreloaderStore } from "~/stores/preloader";

export const useFleetStore = defineStore("fleet", {
  state: () => ({
    data: null,
    error: null,
    pending: false,
  }),

  actions: {
    async fetchFleet() {
      const preloader = usePreloaderStore();
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;

      preloader.show();
      this.pending = true;
      this.error = null;

      try {
        const { data, error, pending } = await useFetch(
          `${baseUrl}/fleet-section?populate=*`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            transform: (data) => data,
          }
        );

        this.data = data.value;
        this.error = error.value;
        this.pending = pending.value;
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
    fleetData: (state) => state.data?.data?.data || {},
  },
});
