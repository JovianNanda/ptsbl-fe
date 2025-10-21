<template>
  <UBlogPost
    :title="props.data.title"
    :description="props.data.subtitle"
    :badge="{
      label: 'Release',
      color: 'primary',
      variant: 'solid',
    }"
    class="ring-[#E2E8F0] rounded-xl hover:shadow-lg transition-shadow hover:outline-secondary hover:outline-1"
  >
    <template #body>
      <div class="flex flex-col gap-4 flex-1 items-center justify-center">
        <div
          class="text-white flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-center"
        >
          <h1
            class="text-xl text-white font-light rounded-full bg-secondary text-center"
          >
            {{ props.data.title }}
          </h1>
        </div>
        <div class="flex gap-2 flex-col pt-2 pb-2 flex-1">
          <h1 class="text-lg font-light text-black mt-auto text-center">
            {{ props.data.subtitle }}
          </h1>
          <p class="text-sm text-gray-500 text-center">
            {{ props.data.description }}
          </p>
        </div>
      </div>
    </template>
  </UBlogPost>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  index: {
    type: [String, Number],
    default: null,
  },
});
</script>
<style scoped>
.bg-default {
  --ui-bg: #ffff;
}
</style>
