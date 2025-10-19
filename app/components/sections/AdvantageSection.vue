<template>
  <section class="py-16 bg-soft-secondary">
    <div class="container mx-auto px-4">
      <h2 class="text-lg font-light text-secondary mb-4 text-center uppercase">
        Mengapa Memilih Kami
      </h2>
      <h1 class="text-5xl text-center text-black leading-tight">
        Solusi Lengkap Pengelolaan Limbah B3
      </h1>
      <p class="text-center text-gray-500 mt-4 text-lg">
        Dipercaya oleh banyak perusahaan di seluruh Indonesia
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-18 mx-auto">
        <AdvantageCard
          v-for="advantage in advantages"
          :key="advantage.id"
          :advantage="advantage"
        />
      </div>
      <div class="flex justify-center mt-12 items-center">
        <div
          class="flex flex-col justify-between items-center gap-20 md:gap-12 mt-8 bg-white p-8 md:flex-row rounded-3xl shadow-sm w-full md:w-fit"
        >
          <div
            v-for="stats in allAdvantages.data.stats"
            :key="stats.id"
            class="mx-4 text-center"
          >
            <h1
              class="text-black text-5xl lg:text-6xl"
              :class="
                stats.position % 2 === 0 ? 'text-secondary' : 'text-primary'
              "
            >
              {{ stats.value }}
            </h1>
            <p class="text-gray-500">{{ stats.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import AdvantageCard from "../advantage/AdvantageCard.vue";
import { useAdvantageStore } from "~/stores/advantage";

const advantageStore = useAdvantageStore();
await advantageStore.fetchAdvantage();
const allAdvantages = computed(() => advantageStore.data);
const advantages = computed(() => {
  const list = allAdvantages.value?.data?.advantages;
  return Array.isArray(list)
    ? [...list].sort((a, b) => a.position - b.position)
    : [];
});
</script>
