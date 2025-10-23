<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-lg font-light text-secondary mb-4 text-center uppercase">
        {{ allService?.data?.badge }}
      </h2>
      <h1 class="text-5xl text-center text-black leading-tight">
        {{ allService?.data?.title }}
      </h1>
      <p class="text-center text-gray-500 mt-4 text-lg">
        {{ allService?.data?.subtitle }}
      </p>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-18 max-w-[65rem] mx-auto"
      >
        <ServiceCard
          v-for="service in services ?? []"
          :key="service?.id"
          :service="service"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import ServiceCard from "../service/ServiceCard.vue";
import { useServiceStore } from "~/stores/service";

const servicesStore = useServiceStore();
await servicesStore.fetchService();
const allService = computed(() => servicesStore.data);
const services = computed(() => {
  const list = allService.value?.data.services;
  return Array.isArray(list)
    ? [...list].sort((a, b) => a.position - b.position)
    : [];
});
</script>
