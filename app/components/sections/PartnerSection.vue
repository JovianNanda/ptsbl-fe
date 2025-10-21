<template>
  <section class="py-16 bg-soft-secondary">
    <div class="container mx-auto px-4">
      <h2 class="text-lg font-light text-secondary mb-4 text-center uppercase">
        {{ allPartners.data.badge }}
      </h2>
      <h1 class="text-5xl text-center text-black leading-tight">
        {{ allPartners.data.title }}
      </h1>
      <p class="text-lg text-center mt-4 text-gray-500">
        {{ allPartners.data.subtitle }}
      </p>

      <div class="flex flex-wrap gap-8 justify-center mx-auto max-w-4xl mt-10">
        <NuxtImg
          v-for="value in allPartners.data.partnerImage"
          :key="value.id"
          :src="backendBaseUrl + value.url"
          class="m-4 h-30 w-30 object-contain hover:scale-105 transition-all"
        />
      </div>

      <BigCardList
        :stats="allPartners.data.partnerStats"
        style="margin-top: 1rem !important"
      />
    </div>
  </section>
</template>
<script setup>
import { usePartnerStore } from "~/stores/partner";
import BigCardList from "../BigCardList.vue";

const runtimeConfig = useRuntimeConfig();
const backendBaseUrl = runtimeConfig.public.backendBase;
const partnerStore = usePartnerStore();
await partnerStore.fetchPartner();
const allPartners = computed(() => partnerStore.data);
</script>
