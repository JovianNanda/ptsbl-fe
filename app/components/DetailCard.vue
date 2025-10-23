<template>
  <UCard
    :ui="{
      body: [
        'flex flex-col md:flex-row gap-10 overflow-hidden border-0',
        index % 2 === 0 ? 'md:flex-row-reverse' : '',
      ].join(' '),
      rounded: '2xl',
      shadow: 'lg',
    }"
    class="ring-0 divide-0 divide-y-0"
  >
    <div
      class="relative flex w-full md:w-1/2 rounded-xl overflow-hidden"
      :class="{ 'md:flex-row-reverse': index % 2 === 0 }"
    >
      <NuxtImg
        :src="backendBaseUrl + props?.data?.image?.url"
        :alt="props?.data?.title"
        class="w-full h-64 md:h-full rounded-2xl object-cover"
      />
      <div
        v-if="props?.data?.icon"
        class="absolute top-4 left-4 p-3 rounded-xl shadow-md flex items-center justify-center"
        :class="index % 2 === 0 ? 'bg-primary' : 'bg-secondary'"
      >
        <IconCustom
          :tags="props?.data?.icon"
          class="text-white"
          style="color: #ffff"
          width="32"
          height="32"
        />
      </div>
    </div>

    <!-- Content Section -->
    <div class="flex flex-col md:w-1/2">
      <p
        class="text-xs font-semibold mb-1 uppercase"
        :class="index % 2 === 0 ? 'text-primary' : 'text-secondary'"
      >
        {{ props?.title }}
        <span
          v-if="props?.title == '' || (props?.index == 0 && props?.title == 0)"
        >
          {{ props?.index }}/{{ props?.total }}
        </span>
      </p>
      <h2 class="text-3xl md:text-4xl font-light text-black my-3">
        {{ props?.data?.title }}
      </h2>
      <p class="text-gray-500 mb-4">
        {{ props?.data?.subtitle }}
      </p>

      <ul class="space-y-6 mt-4">
        <li
          v-for="(item, i) in props?.data?.list"
          :key="i"
          class="flex gap-4 text-gray-700 items-center"
        >
          <div
            class="rounded-full flex items-center justify-center p-[2px]"
            :class="index % 2 === 0 ? 'bg-primary' : 'bg-secondary'"
          >
            <UIcon name="i-ph-check-circle" class="text-white text-xl" />
          </div>
          <span class="text-justify leading-relaxed text-sm">{{
            item?.listText
          }}</span>
        </li>
      </ul>
    </div>
  </UCard>
</template>
<script setup>
const runtimeConfig = useRuntimeConfig();
const backendBaseUrl = runtimeConfig.public.backendBase;

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: false,
    default: 1,
  },
  total: {
    type: Number,
    required: false,
    default: 0,
  },
  title: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
