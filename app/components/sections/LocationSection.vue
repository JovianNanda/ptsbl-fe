<template>
  <div class="flex flex-col mt-20 mb-20">
    <h1 class="text-center text-4xl text-black">
      {{ allLocations?.data?.title }}
    </h1>
    <div
      class="flex flex-wrap gap-5 mt-12 mx-4 lg:mx-auto justify-center items-stretch h-full"
    >
      <div class="flex gap-5 flex-col lg:flex-row w-full">
        <LocationCard
          v-for="location in allLocations?.data?.locations ?? []"
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

const locationStore = useLocationStore();
await locationStore.fetchLocation();
const allLocations = computed(() => locationStore.data);
onMounted(() => {
  console.log(allLocations);
});
</script>
