<template>
  <section v-if="allAdvantages" class="py-16 bg-soft-secondary">
    <div class="container mx-auto px-4">
      <h2 class="text-lg font-light text-secondary mb-4 text-center uppercase">
        {{ allAdvantages.badge }}
      </h2>
      <h1 class="text-5xl text-center text-black leading-tight">
        {{ allAdvantages.title }}
      </h1>
      <p class="text-center text-gray-500 mt-4 text-lg">
        {{ allAdvantages.subtitle }}
      </p>

      <div
        class="flex flex-wrap flex-col md:flex-row gap-8 mt-18 mx-auto items-stretch justify-center"
      >
        <AdvantageCard
          v-for="advantage in sortedAdvantages"
          :key="advantage.id"
          class="w-full md:w-1/3"
          :advantage="advantage"
        />
      </div>

      <BigCardList :stats="allAdvantages.stats" />
    </div>
  </section>
</template>

<script setup>
import AdvantageCard from "../advantage/AdvantageCard.vue";
import BigCardList from "../BigCardList.vue";
import { useAdvantageStore } from "~/stores/advantage";

// 1. Setup
const { locale } = useI18n();
const advantageStore = useAdvantageStore();

// 2. Data Fetching (SSR & Locale Friendly)
// This ensures the store action runs on the server, and re-runs
// on the client immediately when the user switches languages.
await useAsyncData("advantages-data", () => advantageStore.fetchAdvantage(), {
  watch: [locale],
});

// 3. Computeds
// Access the getter. Assuming your store has `getters: { advantageData: (state) => state.data?.data || null }`
const allAdvantages = computed(() => advantageStore.advantageData);

// Sorting Logic
// It is safer to do this check inside the computed property
// rather than in the template.
const sortedAdvantages = computed(() => {
  const list = allAdvantages.value?.advantages;

  if (!Array.isArray(list)) return [];

  // Create a shallow copy [...list] before sorting
  // to avoid mutating the store state directly (which throws warnings in strict mode)
  return [...list].sort((a, b) => a.position - b.position);
});
</script>
