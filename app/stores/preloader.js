import { defineStore } from "pinia";

export const usePreloaderStore = defineStore("preloader", {
  state: () => ({
    loading: true,
  }),
  actions: {
    show() {
      this.loading = true;
    },
    hide() {
      this.loading = false;
    },
  },
});
