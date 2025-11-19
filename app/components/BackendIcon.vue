<template>
  <!-- <Icon
    v-if="props.tags && props.tags.iconName"
    :icon="props.tags.iconName"
    :width="props.tags.width || 16"
    :height="props.tags.height || 16"
    :color="props.tags.color"
  /> -->
  <svg 
     xmlns="http://www.w3.org/2000/svg"
     :viewBox="`0 0 ${props.icon.width} ${props.icon.height}`"
     fill="none"
     :class="className"
     v-html="props.icon.iconData"
  />
</template>

<script setup>
// import { Icon } from "@iconify/vue";

const props = defineProps({
  className: {
    type: String,
    required: false,
    default: '',
  },
  icon: {
    type: Object,
    default: () => ({}),

    iconData: {
      type: String,
      required: false,
      default: '',
    },
    iconName: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});



</script>
