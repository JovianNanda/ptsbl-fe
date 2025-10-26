<template>
  <UBlogPost
    to="services"
    class="ring ring-[#E2E8F0] text-black rounded-3xl group"
    variant="outline"
  >
    <template #header>
      <div class="absolute z-10 top-4 left-4">
        <IconCustom
          :tags="props.service.icon"
          class="w-12 h-12 p-2 rounded-2xl"
          style="color: white !important"
          :class="
            props.service.position % 2 === 0 ? 'bg-primary' : 'bg-secondary'
          "
        />
      </div>
      <NuxtImg
        :src="`${backendBaseUrl}${props.service.image?.url}`"
        alt="Service Thumbnail"
        class="w-full h-full group-hover:scale-105 object-cover max-w-3xl transition-all rounded-t-3xl"
        quality="80"
        format="webp"
      />
    </template>
    <template #body>
      <div class="flex flex-col gap-4 flex-1">
        <h1 class="text-xl text-black leading-tight">
          {{ props.service.title }}
        </h1>
        <p class="text-[#64748B] font-light text-md leading-relaxed">
          {{ props.service.description }}
        </p>
        <NuxtLink
          :to="`/services`"
          class="text-secondary font-light group-hover:underline flex items-center gap-2 mt-auto"
        >
          Selengkapnya <Icon name="uil:arrow-right" />
        </NuxtLink>
      </div>
    </template>
  </UBlogPost>
</template>
<script setup>
import { defineProps } from "vue";

const runtimeConfig = useRuntimeConfig();
const backendBaseUrl = runtimeConfig.public.backendBase;

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped>
.bg-default {
  --ui-bg: #ffff;
}
</style>
