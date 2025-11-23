<template>
  <div v-if="allLocations?.data" class="flex flex-col mt-20 mb-20">
    <h1 class="text-center text-4xl text-black">
      {{ allLocations?.data?.title }}
    </h1>
    <div
      class="flex flex-wrap gap-5 mt-12 mx-4 lg:mx-auto justify-center items-stretch h-full"
    >
      <div class="flex gap-5 flex-col px-5 xl:flex-row w-full">
        <LocationCard
          v-for="location in locations"
          :key="location?.id"
          :data="location"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLocationStore } from "~/stores/location";
import LocationCard from "../location/LocationCard.vue";

// 1. Setup
const { locale } = useI18n();
const locationStore = useLocationStore();

// 2. SSR-Safe Data Fetching
await useAsyncData("location-data", () => locationStore.fetchLocation(), {
  watch: [locale],
});

// 3. State Access
const allLocations = computed(() => locationStore.data);

// 4. Computed List
// Handles the "?? []" logic here instead of in the template
const locations = computed(() => {
  return allLocations.value?.data?.locations || [];
});
</script>
