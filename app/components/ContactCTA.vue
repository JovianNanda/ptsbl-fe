<template>
  <section
    class="relative w-full py-20 text-center text-white bg-gradient-to-r bg-primary overflow-hidden"
  >
    <div class="container mx-auto px-6 max-w-3xl">
      <h2 class="text-2xl md:text-3xl font-semibold mb-3">
        Siap Bekerja Sama dengan Kami?
      </h2>
      <p class="text-sm md:text-base text-white/90 mb-6 leading-relaxed">
        Hubungi tim kami untuk konsultasi gratis dan solusi pengelolaan limbah
        B3 terbaik
      </p>

      <NuxtLink
        v-if="telp"
        :to="`https://wa.me/${telp}`"
        target="_blank"
        external
        rel="noopener"
      >
        <UButton
          color="white"
          variant="solid"
          size="lg"
          class="text-green-600 font-medium rounded-full bg-gray-100 shadow-md hover:shadow-lg hover:scale-105 hover:cursor-pointer transition-all px-8 py-4"
        >
          Hubungi Kami Sekarang
        </UButton>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { useContactStore } from "~/stores/contact";

// 1. Setup
const { locale } = useI18n();
const contactStore = useContactStore();

// 2. SSR-Safe Data Fetching
// Using a unique key 'cta-bottom-data' to separate it from other contact fetches
await useAsyncData("cta-bottom-data", () => contactStore.fetchContact(), {
  watch: [locale],
});

// 3. State Access
const allContact = computed(() => contactStore.data);

// 4. Computed List
const contacts = computed(() => {
  const list = allContact.value?.data?.cardList;

  if (!Array.isArray(list)) return [];

  return [...list].sort((a, b) => a.position - b.position);
});

// 5. Computed Phone Number
// IMPORTANT: This must be computed. In your old code, it was a const calculated once.
// If the data loaded slightly later, 'telp' would have remained empty forever.
const telp = computed(() => {
  // Safely access the first contact's subtitle
  const rawNumber = contacts.value[0]?.subtitle || "";

  // Remove non-numeric characters (spaces, dashes, +) for the API link
  return rawNumber.replace(/[^\d]/g, "");
});
</script>
