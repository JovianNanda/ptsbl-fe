<template>
  <div class="flex justify-center mt-10 items-center">
    <div
      class="flex flex-col justify-between items-center gap-20 md:gap-12 mt-8 bg-white p-8 md:flex-row rounded-3xl shadow-lg w-full md:w-fit"
    >
      <div
        v-for="stat in props.stats"
        :key="stat.id"
        class="mx-4 text-center flex flex-col items-center gap-2"
      >
        <h1
          class="text-4xl md:text-5xl xl:text-6xl"
          :class="stat.position % 2 === 0 ? 'text-secondary' : 'text-primary'"
        >
          {{ stat.value }}
        </h1>
        <p class="text-sm font-light text-gray-400">{{ stat.label }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
});
</script>
