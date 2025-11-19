<template>
  <section class="py-16 bg-soft-secondary">
    <div class="container mx-auto px-4">
      <h2 class="text-lg font-light text-secondary mb-4 text-center uppercase">
        {{ allPartners?.data?.badge }}
      </h2>
      <h1 class="text-5xl text-center text-black leading-tight">
        {{ allPartners?.data?.title }}
      </h1>
      <p class="text-lg text-center mt-4 text-gray-500">
        {{ allPartners?.data?.subtitle }}
      </p>

      <UMarquee pause-on-hover class="bg-soft-secondary my-10" overlay="false">
        <NuxtImg
          v-for="value in allPartners?.data?.partnerImage ?? []"
          :key="value?.id"
          :src="backendBaseUrl + value?.url"
          class="m-4 object-contain hover:scale-105 transition-all size-40 shrink-0"
          :alt="value?.name"
          loading="lazy"
        />
      </UMarquee>

      <BigCardList
        :stats="allPartners?.data?.partnerStats ?? []"
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
<style scoped>
.before\:bg-gradient-to-r {
  &::before {
    content: var(--tw-content);
    --tw-gradient-position: to right in oklab;
    background-image: linear-gradient(var(--tw-gradient-stops));
  }
}
</style>
