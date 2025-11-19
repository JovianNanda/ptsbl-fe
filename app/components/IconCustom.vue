<template>
  <ClientOnly>
  <Icon
    v-if="props.tags && props.tags.iconName"
    :icon="props.tags.iconName"
    :width="props.tags.width || 16"
    :height="props.tags.height || 16"
    :color="props.tags.color"
  />
  </ClientOnly>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },
});
</script>
