<template>
  <UBadge class="mb-6 bg-primary rounded-full uppercase">
    <span class="text-white text-sm px-4 py-2">
      {{ badge }}
    </span>
  </UBadge>
</template>
<script setup>
const props = defineProps({
  badge: {
    type: Object,
    required: true,
  },
});
</script>
