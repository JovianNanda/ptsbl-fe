<template>
  <div
    class="ring-0 shadow flex w-full h-full flex-col p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all"
  >
    <div class="flex flex-row items-center gap-3">
      <div
        class="bg-secondary-100 p-3 flex flex-col items-center jsutify-center rounded-md text-2xl"
      >
        <IconCustom class="text-secondary" :tags="props.data.icon" />
      </div>
      <h1 class="text-black">{{ props.data.title }}</h1>
    </div>
    <div class="flex flex-1 w-full h-full flex-col mt-auto">
      <div
        v-for="item in props.data.lists"
        :key="item.id"
        class="flex flex-row items-center gap-3 mt-2 flex-1"
      >
        <IconCustom class="text-secondary text-xl w-4 h-4" :tags="item.icon" />
        <p class="text-gray-400 font-light flex-1">{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
