<template>
  <section v-if="partnerData" class="py-16 bg-soft-secondary">
    <div class="container mx-auto px-4">
      <h2 class="text-lg font-light text-secondary mb-4 text-center uppercase">
        {{ partnerData.badge }}
      </h2>
      <h1 class="text-5xl text-center text-black leading-tight">
        {{ partnerData.title }}
      </h1>
      <p class="text-lg text-center mt-4 text-gray-500">
        {{ partnerData.subtitle }}
      </p>

      <UMarquee pause-on-hover class="bg-soft-secondary my-10" overlay="false">
        <NuxtImg
          v-for="image in processedImages"
          :key="image.id"
          :src="image.fullUrl"
          class="m-4 object-contain hover:scale-105 transition-all size-40 shrink-0"
          :alt="image.name"
          loading="lazy"
        />
      </UMarquee>

      <BigCardList
        :stats="partnerData.partnerStats || []"
        style="margin-top: 1rem !important"
      />
    </div>
  </section>
</template>

<script setup>
import { usePartnerStore } from "~/stores/partner";
import BigCardList from "../BigCardList.vue";

// 1. Setup
const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();
const partnerStore = usePartnerStore();

// 2. SSR-Safe Data Fetching
await useAsyncData("partner-data", () => partnerStore.fetchPartner(), {
  watch: [locale],
});

// 3. State Access (Shortcut to the inner data)
const partnerData = computed(() => partnerStore.data?.data);

// 4. Computed Images
// Processes the list to generate full URLs safely
const processedImages = computed(() => {
  const list = partnerData.value?.partnerImage;
  if (!Array.isArray(list)) return [];

  return list.map((img) => {
    const baseUrl = runtimeConfig.public.backendBase;
    // Handle case where URL might already be absolute (external) vs relative
    const fullUrl = img.url.startsWith("http")
      ? img.url
      : `${baseUrl}${img.url}`;

    return {
      ...img,
      fullUrl,
    };
  });
});
</script>

<style scoped>
.before\:bg-gradient-to-r {
  &::before {
    content: var(--tw-content);
    --tw-gradient-position: to right in oklab;
    background-image: linear-gradient(var(--tw-gradient-stops));
  }
}
</style>
