<template>
  <UBlogPost
    :title="props.advantage.title"
    :description="props.advantage.subtitle"
    :badge="{
      label: 'Release',
      color: 'primary',
      variant: 'solid',
    }"
    class="ring-[#E2E8F0] rounded-3xl hover:shadow-lg transition-shadow hover:outline-secondary hover:outline-1"
  >
    <template #body>
      <div class="flex flex-col gap-4 flex-1">
        <div
          class="text-white flex items-center justify-center w-16 h-16 rounded-2xl"
          :class="
            index % 2 === 0 ? 'bg-secondary' : 'bg-primary' ?? 'bg-secondary'
          "
        >
          <IconCustom :tags="props.advantage.icon" width="38" height="38" />
        </div>
        <div class="flex gap-2 flex-col pt-6 pb-2 flex-1">
          <h1 class="text-xl text-black font-light">
            {{ props.advantage.title }}
          </h1>
          <p class="text-sm font-light text-gray-400 mt-auto">
            {{ props.advantage.subtitle }}
          </p>
        </div>
      </div>
    </template>
  </UBlogPost>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  advantage: {
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
