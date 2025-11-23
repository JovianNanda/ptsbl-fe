<template>
  <section v-if="allIndustries?.data" class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-lg font-light text-primary mb-4 text-center uppercase">
        {{ allIndustries?.data?.badge }}
      </h2>
      <h1 class="text-5xl text-center text-black leading-tight">
        {{ allIndustries?.data?.title }}
      </h1>
      <div
        class="grid grid-cols-2 md:grid-cols-5 gap-8 mt-10 max-w-6xl mx-auto"
      >
        <IndustryCard
          v-for="industry in sortedIndustries"
          :key="industry?.id"
          :industry="industry"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useIndustryStore } from "~/stores/industry";

// 1. Setup
const { locale } = useI18n();
const industryStore = useIndustryStore();

// 2. SSR-Safe Data Fetching
// Uses a unique key 'industry-data' and watches for locale changes
await useAsyncData("industry-data", () => industryStore.fetchIndustry(), {
  watch: [locale],
});

// 3. State Access
// Matches your previous pattern: accessing the raw store data
const allIndustries = computed(() => industryStore.data);

// 4. Computed Logic
const sortedIndustries = computed(() => {
  const list = allIndustries.value?.data?.iconList;

  // Safety check: if list is missing, return empty array
  if (!Array.isArray(list)) return [];

  // Create a copy using [...list] to avoid mutating state, then sort
  return [...list].sort((a, b) => a.position - b.position);
});
</script>
