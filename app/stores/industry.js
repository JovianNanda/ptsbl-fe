import { defineStore } from "pinia";
import { usePreloaderStore } from "~/stores/preloader";

export const useIndustryStore = defineStore("industry", {
  state: () => ({
    data: null,
    error: null,
    pending: false,
  }),

  actions: {
    async fetchIndustry() {
      const preloader = usePreloaderStore();
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;

      preloader.show();
      this.pending = true;
      this.error = null;

      try {
        const { data, error, pending } = await useFetch(
          `${baseUrl}/industry-section?populate=*`,
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
        console.error("Failed to fetch industry:", err);
        this.error = err;
      } finally {
        this.pending = false;
        preloader.hide();
      }
    },
  },

  getters: {
    industryData: (state) => state.data?.data?.data || {},
  },
});
