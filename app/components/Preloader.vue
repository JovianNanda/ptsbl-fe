<template>
  <div
    v-if="visibleVar"
    class="fixed inset-0 flex items-center justify-center bg-white z-[99] transition-opacity duration-500"
  >
    <div class="flex flex-col items-center gap-3">
      <div
        class="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"
      />
      <p class="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
});

const visibleVar = computed(() => props.visible);
</script>
