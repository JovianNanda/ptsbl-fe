import { defineStore } from "pinia";
import { usePreloaderStore } from "~/stores/preloader";

export const usePartnerStore = defineStore("partner", {
  state: () => ({
    data: null,
    error: null,
    pending: false,
  }),

  actions: {
    async fetchPartner() {
      const preloader = usePreloaderStore();
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;

      preloader.show();
      this.pending = true;
      this.error = null;

      try {
        const { data, error, pending } = await useFetch(
          `${baseUrl}/partner-section?populate=*`,
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
        console.error("Failed to fetch partner:", err);
        this.error = err;
      } finally {
        this.pending = false;
        preloader.hide();
      }
    },
  },

  getters: {
    partnerData: (state) => state.data?.data?.data || {},
  },
});
