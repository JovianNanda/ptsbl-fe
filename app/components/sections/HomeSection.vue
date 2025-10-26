<template>
  <section
    class="min-h-screen bg-cover bg-center"
    :style="`background-image: url('${backendBaseUrl}${homePageData?.hero_bg_image?.url}')`"
  >
    <div
      class="backdrop-brightness-40 flex items-center justify-center h-screen"
    >
      <div
        class="flex flex-col items-center space-y-6 w-11/12 md:w-9/12 lg:w-8/12"
      >
        <div class="flex flex-col items-center space-y-6">
          <UBadgeHome :badge="homePageData?.badge" />
          <h1
            class="text-white text-3xl lg:text-5xl font-normal text-center leading-[1.5]"
          >
            {{ homePageData?.hero_title }}
          </h1>
          <p class="text-white text-sm md:text-lg font-[200] text-justify">
            {{ homePageData?.hero_subtitle }}
          </p>
        </div>
        <div class="flex flex-wrap gap-4 justify-center">
          <div class="flex gap-4 flex-1 w-full">
            <SmartLink
              v-for="value in homePageData?.cta_button || []"
              :key="value?.id + '-' + (value?.cta_button_class || '')"
              :raw="value?.cta_button_link || '#'"
              class="flex"
            >
              <UButton
                :class="[
                  value?.cta_button_class === 'outline-secondary'
                    ? 'border border-secondary bg-white text-secondary hover:bg-secondary hover:text-white active:bg-secondary'
                    : 'bg-primary',
                  'cursor-pointer px-8 py-3 w-auto flex-1 inline-flex justify-center  transition-all items-center ',
                ]"
                class="rounded-full"
              >
                {{ value?.cta_button_text }} <IconCustom :tags="value?.Icon" />
              </UButton>
            </SmartLink>
            <!-- <NuxtLink
              v-for="value in homePageData?.cta_button || []"
              :key="value?.id + '-' + (value?.cta_button_class || '')"
              :to="value?.cta_button_link || '#'"
              class="flex"
            >
              <UButton
                :class="[
                  value?.cta_button_class === 'outline-secondary'
                    ? 'border border-secondary bg-white text-secondary hover:bg-secondary hover:text-white active:bg-secondary'
                    : 'bg-primary',
                  'cursor-pointer px-8 py-3 w-auto flex-1 inline-flex justify-center  transition-all items-center ',
                ]"
                class="rounded-full"
              >
                {{ value?.cta_button_text }} <IconCustom :tags="value?.Icon" />
              </UButton>
            </NuxtLink> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import UBadgeHome from "~/components/BadgeHome.vue";
import { useHomepageStore } from "~/stores/home";
const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();
const backendBaseUrl = runtimeConfig.public.backendBase;
const homepage = useHomepageStore();
await homepage.fetchHomepage();

const homePageData = computed(() => homepage?.data?.data);

watch(locale, () => {
  homepage.fetchHomepage();
});
</script>
