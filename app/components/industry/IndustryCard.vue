<template>
  <div class="flex flex-col items-center">
    <div
      :class="`rounded-xl p-5 mx-auto mb-4 flex items-center justify-center  bg-linear-to-br ${gradient}`"
    >
      <IconCustom :tags="props.industry.icon" class="w-8 h-8 text-whiteq" />
    </div>
    <p class="text-center text-black text-base">
      {{ props.industry.text }}
    </p>
  </div>
</template>
<script setup>
import { useRandomGradient } from "~/composables/useRandomGradient";
import { defineProps } from "vue";
const props = defineProps({
  industry: {
    type: Object,
    required: true,
  },
});

const { getRandomGradient } = useRandomGradient();
const gradient = getRandomGradient();
</script>
