<template>
  <UContainer v-if="contacts.length" class="py-16 flex justify-center">
    <UCard
      :ui="{
        body: 'text-center bg-white ring-0 border-0 outline-0',
      }"
      class="max-w-3xl w-full ring-0 border-0 outline-0 rounded-3xl shadow-xl p-10 bg-white"
    >
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        {{ t("serviceCTA.title") }}
      </h2>
      <p class="text-gray-500 mb-8">
        {{ t("serviceCTA.description") }}
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink
          v-if="contacts[0]?.subtitle"
          :to="'tel:' + contacts[0].subtitle"
        >
          <UButton
            icon="i-heroicons-phone"
            size="lg"
            color="secondary"
            class="rounded-full shadow-md px-6 text-white cursor-pointer"
          >
            {{ t("buttonContact") }}
            {{ contacts[0].subtitle }}
          </UButton>
        </NuxtLink>

        <NuxtLink
          v-if="contacts[1]?.subtitle"
          :to="'mailto:' + contacts[1].subtitle"
        >
          <UButton
            icon="i-heroicons-envelope"
            size="lg"
            class="rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white px-6 cursor-pointer"
          >
            {{ t("serviceCTA.buttonLink") }}
          </UButton>
        </NuxtLink>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup>
import { useContactStore } from "~/stores/contact";

// 1. Setup
const { t, locale } = useI18n();
const contactStore = useContactStore();

// 2. SSR-Safe Data Fetching
// We use a unique key 'contact-cta-data' to avoid conflict if used
// on the same page as the main contact section.
await useAsyncData("contact-cta-data", () => contactStore.fetchContact(), {
  watch: [locale],
});

// 3. State Access
const allContact = computed(() => contactStore.data);

// 4. Computed List
const contacts = computed(() => {
  const list = allContact.value?.data?.cardList;

  if (!Array.isArray(list)) return [];

  // Create a copy and sort
  return [...list].sort((a, b) => a.position - b.position);
});
</script>
