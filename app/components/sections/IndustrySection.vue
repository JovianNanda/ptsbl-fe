<template>
  <section class="py-16">
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
          v-for="industry in Industries ?? []"
          :key="industry?.id"
          :industry="industry"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import { useIndustryStore } from "~/stores/industry";

const industryStore = useIndustryStore();
await industryStore.fetchIndustry();
const allIndustries = computed(() => industryStore.data);
const Industries = computed(() => {
  const list = allIndustries.value?.data?.iconList;
  return Array.isArray(list)
    ? [...list].sort((a, b) => a.position - b.position)
    : [];
});
</script>
