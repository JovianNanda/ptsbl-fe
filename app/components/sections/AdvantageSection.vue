<template>
  <section class="py-16 bg-soft-secondary">
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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-18 mx-auto">
        <AdvantageCard
          v-for="advantage in advantages"
          :key="advantage.id"
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

const advantageStore = useAdvantageStore();
await advantageStore.fetchAdvantage();
const allAdvantages = computed(() => advantageStore.data.data);
const advantages = computed(() => {
  const list = allAdvantages.value?.advantages;
  return Array.isArray(list)
    ? [...list].sort((a, b) => a.position - b.position)
    : [];
});

onMounted(() => {
  console.log("ADVANTAGES", allAdvantages);
});
</script>
