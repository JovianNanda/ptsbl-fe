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

      <NuxtLink href="https://wa.me/" +${telp} rel="noopener">
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

const contactStore = useContactStore();
await contactStore.fetchContact();
const allContact = computed(() => contactStore?.data);
const contacts = computed(() => {
  const list = allContact.value?.data.cardList;
  return Array.isArray(list)
    ? [...list].sort((a, b) => a.position - b.position)
    : [];
});
const telp = (contacts.value[0]?.subtitle || "").replace(/\+/g, "");
</script>
