<template>
  <div>
    <section
      class="min-h-screen bg-cover bg-center"
      :style="`background-image: url('${bgImage}')`"
    >
      >
      <div
        class="backdrop-brightness-40 flex items-center justify-center h-screen"
      >
        <div
          class="flex flex-col items-center space-y-6 w-11/12 md:w-9/12 lg:w-8/12"
        >
          <div class="flex flex-col items-center space-y-6">
            <UBadgeHome :badge="allService.badge" class="bg-secondary" />
            <h1
              class="text-white text-3xl lg:text-6xl font-normal text-center leading-[1.5]"
            >
              {{ allService.title }}
            </h1>
            <p class="text-white text-lg md:text-xl font-[200] text-justify">
              {{ allService.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <div class="flex flex-col gap-10 mx-auto container my-20">
      <DetailCard
        v-for="(value, index) in services"
        :key="value.id"
        :index="index + 1"
        :data="value"
        :total="services.length"
        title="LAYANAN"
      />
    </div>
    <div class="bg-soft-secondary py-16">
      <CallToAction />
    </div>
  </div>
</template>
<script setup>
import UBadgeHome from "~/components/BadgeHome.vue";
import { useServiceStore } from "~/stores/service";
import { usePreloaderStore } from "~/stores/preloader";
import CallToAction from "~/components/service/CallToAction.vue";

const preloader = usePreloaderStore();

preloader.show();

const runtimeConfig = useRuntimeConfig();
const backendBaseUrl = runtimeConfig.public.backendBase;

const servicesStore = useServiceStore();
await servicesStore.fetchService();

const allService = computed(() => servicesStore.data.data);

const bgImage = computed(() => {
  const img = allService.value?.image_bg?.[0];
  if (!img?.url) return null;
  return `${backendBaseUrl}${img.url}`;
});

const services = computed(() => {
  const list = allService.value?.services;
  return Array.isArray(list)
    ? [...list].sort((a, b) => a.position - b.position)
    : [];
});

preloader.hide();
</script>
