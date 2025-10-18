<template>
  <UBadge
    v-for="value in props.homePageData.highlight_items"
    :key="value.id"
    class="mb-6 bg-primary rounded-full"
  >
    <span class="text-white text-sm px-4 py-2">
      {{ value.title }}
    </span>
  </UBadge>
</template>
<script setup>
const props = defineProps({
  homePageData: {
    type: Object,
    required: true,
  },
});
</script>
