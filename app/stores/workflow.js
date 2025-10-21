import { defineStore } from "pinia";
import { usePreloaderStore } from "~/stores/preloader";

export const useWorkflowStore = defineStore("workflow", {
  state: () => ({
    data: null,
    error: null,
    pending: false,
  }),

  actions: {
    async fetchWorkflow() {
      const preloader = usePreloaderStore();
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;

      preloader.show();
      this.pending = true;
      this.error = null;

      try {
        const { data, error, pending } = await useFetch(
          `${baseUrl}/flow-section?populate=*`,
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
        console.error("Failed to fetch workflow:", err);
        this.error = err;
      } finally {
        this.pending = false;
        preloader.hide();
      }
    },
  },

  getters: {
    advantageData: (state) => state.data?.data?.data || {},
  },
});
