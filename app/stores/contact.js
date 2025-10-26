import { defineStore } from "pinia";
import { usePreloaderStore } from "~/stores/preloader";
import { useStrapiLocale } from "~/composables/useStrapiLocale";

export const useContactStore = defineStore("contact", {
  state: () => ({
    data: null,
    error: null,
    pending: false,
  }),

  actions: {
    async fetchContact() {
      const isoLocale = useStrapiLocale();
      const preloader = usePreloaderStore();
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;

      preloader.show();
      this.pending = true;
      this.error = null;

      try {
        const { data, error, pending } = await useFetch(
          `${baseUrl}/contact-section?populate=*&locale=${isoLocale.value}`,
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
        console.error("Failed to fetch contact:", err);
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

      // ✅ Basic validation
      if (!payload.name || !payload.email || !payload.message) {
        toast.add({
          title: "Form belum lengkap",
          description: "Nama, email, dan pesan wajib diisi.",
        });
        return;
      }

      this.loading = true;
      try {
        await $fetch(`${backendBaseUrl}/api/contact-messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: { data: payload },
        });

        toast.add({
          title: "Pesan terkirim 🎉",
          description: "Terima kasih! Kami akan segera menghubungi Anda.",
          icon: "i-heroicons-check-circle",
          color: "primary",
          timeout: 4000,
        });
      } catch (error) {
        console.error(error);
        toast.add({
          title: "Gagal mengirim pesan 😢",
          description: "Terjadi kesalahan, silakan coba lagi nanti",
          icon: "i-heroicons-x-circle",
          color: "danger",
          timeout: 4000,
        });
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    contactData: (state) => state.data?.data?.data || {},
  },
});
