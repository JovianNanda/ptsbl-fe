import { defineStore } from "pinia";
import { usePreloaderStore } from "~/stores/preloader";
import { useStrapiLocale } from "~/composables/useStrapiLocale";

export const useContactStore = defineStore("contact", {
  state: () => ({
    data: null,
    error: null,
    pending: false,
    loading: false, // This is the single source of truth for loading
  }),

  actions: {
    async fetchContact() {
      // ... (Your existing fetch code is fine, keep it here) ...
      const isoLocale = useStrapiLocale();
      const preloader = usePreloaderStore();
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;

      preloader.show();
      this.pending = true;
      try {
        const response = await $fetch(`${baseUrl}/contact-section`, {
          method: "GET",
          headers: { Accept: "application/json" },
          query: { populate: "*", locale: isoLocale.value },
        });
        this.data = response;
      } catch (err) {
        this.error = err;
      } finally {
        this.pending = false;
        preloader.hide();
      }
    },

    async submitContactForm(payload) {
      const runtimeConfig = useRuntimeConfig();
      const backendBaseUrl = runtimeConfig.public.backendBase;
      const toast = useToast();

      // 1. Prevent double submission if already loading
      if (this.loading) return false;

      // 2. Validation
      if (!payload.name || !payload.email || !payload.message) {
        toast.add({
          title: "Form belum lengkap",
          description: "Nama, email, dan pesan wajib diisi.",
          color: "yellow",
        });
        return false;
      }

      this.loading = true;

      try {
        await $fetch(`${backendBaseUrl}/api/contact-messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: { data: payload },
        });

        // Success Toast
        toast.add({
          title: "Pesan terkirim 🎉",
          description: "Terima kasih! Kami akan segera menghubungi Anda.",
          icon: "i-heroicons-check-circle",
          color: "primary", // Nuxt UI usually uses 'primary' or 'green'
        });

        return true; // Return true to tell component to clear form
      } catch (error) {
        console.error(error);
        toast.add({
          title: "Gagal mengirim pesan 😢",
          description: "Terjadi kesalahan, silakan coba lagi nanti",
          icon: "i-heroicons-x-circle",
          color: "red",
        });
        return false;
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    contactData: (state) => state.data?.data || {},
  },
});
