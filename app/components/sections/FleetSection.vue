<template>
  <section class="pt-32 pb-14 bg-soft-secondary md:px-4">
    <div
      class="flex flex-col md:justify-between items-center md:items-start xl:flex-row gap-10 md:gap-4 px-4 md:px-0"
    >
      <div
        class="container mx-auto max-w-xl text-center md:text-left items-start justify-start flex flex-col w-full"
      >
        <div>
          <h2 class="text-lg font-light text-secondary mb-4 uppercase">
            {{ allFleet?.data?.badge }}
          </h2>
          <h1 class="text-3xl md:text-4xl text-black leading-tight">
            {{ allFleet?.data?.title }}
          </h1>
          <p class="text-gray-500 mt-4 text-sm md:text-lg">
            {{ allFleet?.data?.subtitle }}
          </p>
        </div>
        <div
          class="flex justify-between items-center md:gap-12 bg-white px-8 py-4 lg:mt-10 xl:mt-30 mt-10 md:mt-4 md:flex-row mx-auto rounded-3xl shadow-lg xl:w-fit"
        >
          <div
            v-for="stats in allFleet?.data?.stats"
            :key="stats?.id"
            class="mx-4 text-center justify-center flex flex-col items-center gap-2"
          >
            <IconCustom
              :tags="stats?.icon"
              width="28"
              height="28"
              :class="
                stats?.position % 2 === 0 ? 'text-secondary' : 'text-primary'
              "
            />

            <h1 class="text-black text-xl">
              {{ stats?.value }}
            </h1>
            <p class="text-gray-500 text-sm">{{ stats?.label }}</p>
          </div>
        </div>
      </div>

      <div
        class="grid grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl mx-auto"
      >
        <div class="w-full aspect-[4/5] overflow-hidden">
          <UCarousel
            v-slot="{ item }"
            loop
            autoplay
            pagination
            wheel-gestures
            :items="images"
            class="w-full h-full object-cover fleet-carousel aspect-[4/5]"
            :ui="{
              item: 'w-full h-full object-cover fleet-carousel aspect-[4/5]',
            }"
          >
            <img
              :src="item"
              class="w-full h-full object-cover items-stretch !object-center block aspect-[4/5]"
            />
          </UCarousel>
        </div>
        <!-- <NuxtImg
            v-for="image in allFleet?.data?.images"
            :key="image"
            :src="`${backendBaseUrl}${image.url}`"
            alt="Fleet Image"
            class="flex w-fit object-cover xl:max-h-5/12 h-full flex-1"
          /> -->

        <div class="w-full aspect-[4/5] overflow-hidden">
          <video
            class="w-full h-full object-cover"
            autoplay
            loop
            muted
            playsinline
          >
            <source
              :src="`${backendBaseUrl}${allFleet?.data?.video?.url}`"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div
          class="mx-4 text-center justify-center flex items-center gap-2 w-fit absolute flex-row bg-white rounded-xl p-4 top-0 left-1/2 transform translate-x-[-50%] -translate-y-1/2 m-auto lg:top-[100%] xl:top-[80%] lg:left-0 z-20"
        >
          <div
            class="bg-primary text-white rounded-xl flex items-center justify-center p-2 h-full text-2xl"
          >
            <Icon name="uil:clock" />
          </div>

          <div class="flex-col flex">
            <p class="text-gray-500 text-sm leading-tight flex-1">
              Response Time
            </p>
            <h1 class="text-black text-lg flex-1 text-start">
              {{ allFleet?.data?.response_time }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useFleetStore } from "~/stores/fleet";
const runtimeConfig = useRuntimeConfig();
const backendBaseUrl = runtimeConfig.public.backendBase;

const fleetStore = useFleetStore();
await fleetStore.fetchFleet();
const allFleet = computed(() => fleetStore?.data);

const images = computed(() => {
  return allFleet?.value?.data?.images?.map((img) => backendBaseUrl + img.url);
});
</script>
<style scoped>
.fleet-carousel,
.fleet-media {
  width: 100%;
  aspect-ratio: 3 / 4; /* important: controls height stability */
  border-radius: 16px;
  object-fit: cover;
  overflow: hidden;
  min-height: 500px;
  align-items: stretch;
}

@media (max-width: 768px) {
  .fleet-media,
  .fleet-carousel {
    aspect-ratio: 4 / 5;
  }
}
</style>
