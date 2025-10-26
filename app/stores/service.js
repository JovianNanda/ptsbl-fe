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
      const isoLocale = useStrapiLocale();
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;
      const preloader = usePreloaderStore();

      preloader.show();
      this.pending = true;
      this.error = null;

      try {
        const { data, error, pending } = await useFetch(
          `${baseUrl}/service-section?populate[image_bg]=true&populate[services][populate][image]=true&populate[services][populate][list]=true&locale=${isoLocale.value}`,
          {
            key: "services-store",
            method: "GET",
            headers: { Accept: "application/json" },
            transform: (data) => data,
          }
        );

        this.data = data.value || null;
        this.error = error.value || null;
        this.pending = pending.value;
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
    serviceData: (state) => state.data?.data?.attributes?.services?.data || [],
  },
});
