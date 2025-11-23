<template>
  <section
    v-if="homeData"
    class="min-h-screen bg-cover bg-center transition-all duration-500"
    :style="`background-image: url('${heroImageUrl}')`"
  >
    <div
      class="backdrop-brightness-40 flex items-center justify-center h-screen"
    >
      <div
        class="flex flex-col items-center space-y-6 w-11/12 md:w-9/12 lg:w-8/12"
      >
        <div class="flex flex-col items-center space-y-6">
          <UBadgeHome :badge="homeData.badge" />

          <h1
            class="text-white text-3xl lg:text-5xl font-normal text-center leading-[1.5]"
          >
            {{ homeData.hero_title }}
          </h1>

          <p class="text-white text-sm md:text-lg font-[200] text-justify">
            {{ homeData.hero_subtitle }}
          </p>
        </div>

        <div class="flex flex-wrap gap-4 justify-center">
          <div class="flex gap-4 flex-1 w-full">
            <SmartLink
              v-for="value in homeData.cta_button || []"
              :key="value?.id + '-' + (value?.cta_button_class || '')"
              :raw="value?.cta_button_link || '#'"
              class="flex"
            >
              <UButton
                :class="[
                  value?.cta_button_class === 'outline-secondary'
                    ? 'border border-secondary bg-white text-secondary hover:bg-secondary hover:text-white active:bg-secondary'
                    : 'bg-primary',
                  'cursor-pointer px-8 py-3 w-auto flex-1 inline-flex justify-center transition-all items-center',
                ]"
                class="rounded-full"
              >
                {{ value?.cta_button_text }}
                <IconCustom :tags="value?.Icon" />
              </UButton>
            </SmartLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div v-else class="min-h-screen flex items-center justify-center bg-gray-900">
    <span class="text-white">Loading...</span>
  </div>
</template>

<script setup>
import UBadgeHome from "~/components/BadgeHome.vue";
import { useHomepageStore } from "~/stores/home"; // Ensure path matches your file structure

// 1. Setup Composables
const { locale } = useI18n();
const config = useRuntimeConfig();
const homeStore = useHomepageStore();

// 2. Data Fetching (SSR Friendly)
// usage: useAsyncData(unique_key, handler, options)
await useAsyncData("homepage-data", () => homeStore.fetchHomepage(), {
  // This automatically re-runs fetchHomepage when 'locale' changes
  watch: [locale],
});

// 3. Computeds
// Connect to the Getter defined in your Store
const homeData = computed(() => homeStore.homePageData);

// Compute the Image URL safely
const heroImageUrl = computed(() => {
  const imgPath = homeData.value?.hero_bg_image?.url;

  if (!imgPath) return ""; // Return placeholder or empty string if no image

  // If Strapi returns a relative path (common), prepend the backend URL
  // If it returns an absolute path (AWS S3, Cloudinary), return as is
  if (imgPath.startsWith("http")) return imgPath;

  return `${config.public.backendBase}${imgPath}`;
});
</script>
