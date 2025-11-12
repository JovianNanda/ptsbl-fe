<template>
  <UContainer class="py-16 flex justify-center">
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
        <!-- Call Button -->
        <NuxtLink :to="'tel:' + contacts[0]?.subtitle">
          <UButton
            icon="i-heroicons-phone"
            size="lg"
            color="secondary"
            class="rounded-full shadow-md px-6 text-white cursor-pointer"
          >
            {{ t("buttonContact") }}
            {{ contacts[0]?.subtitle }}</UButton
          >
        </NuxtLink>

        <!-- Email Button -->
        <NuxtLink :to="'mailto:' + contacts[1]?.subtitle">
          <UButton
            icon="i-heroicons-envelope"
            size="lg"
            class="rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white px-6 cursor-pointer"
          >
            {{ t("serviceCTA.buttonLink") }}
          </UButton></NuxtLink
        >
      </div>
    </UCard>
  </UContainer>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { useContactStore } from "~/stores/contact";

const { t } = useI18n();
const contactStore = useContactStore();
await contactStore.fetchContact();
const allContact = computed(() => contactStore?.data);
const contacts = computed(() => {
  const list = allContact.value?.data.cardList;
  return Array.isArray(list)
    ? [...list].sort((a, b) => a.position - b.position)
    : [];
});
</script>
