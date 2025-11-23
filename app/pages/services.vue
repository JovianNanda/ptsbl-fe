<template>
  <div>
    <!-- Hero Section -->
    <section
      class="min-h-screen bg-cover bg-center transition-all duration-500"
      :style="bgImage ? `background-image: url('${bgImage}')` : ''"
    >
      <div
        class="backdrop-brightness-40 flex items-center justify-center h-screen"
      >
        <div
          class="flex flex-col items-center space-y-6 w-11/12 md:w-9/12 lg:w-8/12"
        >
          <div class="flex flex-col items-center space-y-6">
            <UBadgeHome :badge="allService?.badge" class="bg-secondary" />
            <h1
              class="text-white text-3xl lg:text-6xl font-normal text-center leading-[1.5]"
            >
              {{ allService?.title }}
            </h1>
            <p class="text-white text-lg md:text-xl font-[200] text-justify">
              {{ allService?.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Details List -->
    <div class="flex flex-col gap-10 mx-auto container my-20">
      <DetailCard
        v-for="(value, index) in services ?? []"
        :key="value?.id"
        :index="index + 1"
        :data="value ?? {}"
        :total="services?.length"
        title="LAYANAN"
      />
    </div>

    <!-- CTA Section -->
    <div class="bg-soft-secondary py-16">
      <CallToAction />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useHead, useRuntimeConfig, useAsyncData } from "#imports";

// Components
import UBadgeHome from "~/components/BadgeHome.vue";
import CallToAction from "~/components/service/CallToAction.vue";

// Stores
import { useServiceStore } from "~/stores/service";
// import { usePreloaderStore } from "~/stores/preloader"; // Stores handle this internally now

// --- SEO & Meta ---
useHead({
  title: "Layanan Pengelolaan Limbah B3 – PT Sarana Bumi Lestari",
  link: [
    {
      rel: "canonical",
      href: "https://www.saranabumilestari.com/services",
    },
    {
      rel: "alternate",
      href: "https://www.saranabumilestari.com/services",
      hreflang: "id",
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Kami menyediakan layanan pengangkutan Limbah B3, pengumpulan, pengolahan, dan konsultasi sesuai regulasi dan standar K3.",
    },
    {
      name: "keywords",
      content:
        "Jasa Limbah B3, Pengangkutan Limbah B3, Pengolahan B3, Konsultasi B3",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://saranabumilestari.com/services" },
    {
      property: "og:image",
      content: "https://saranabumilestari.com/images/logoSBL_2.png",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:image",
      content: "https://saranabumilestari.com/images/LogoSBL.png",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "PT Sarana Bumi Lestari",
        url: "https://saranabumilestari.com",
        logo: "https://saranabumilestari.com/images/logoSBL_2.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+62-811-3080-8778",
          contactType: "customer service",
        },
        sameAs: [
          "https://www.facebook.com/saranabumilestari",
          "https://www.instagram.com/saranabumilestari/",
          "https://www.linkedin.com/company/pt-sarana-bumi-lestari/",
        ],
      }),
    },
  ],
});

// --- Config ---
const runtimeConfig = useRuntimeConfig();
const backendBaseUrl = runtimeConfig.public.backendBase;
const { locale } = useI18n();

// --- Data Fetching ---
const servicesStore = useServiceStore();

// HYDRATION FIX: Use useAsyncData
await useAsyncData("services-page-data", () => servicesStore.fetchService(), {
  watch: [locale],
});

// --- Computed Data ---
const allService = computed(() => servicesStore.data?.data);

const bgImage = computed(() => {
  // Safe access to nested image array
  const img = allService.value?.image_bg?.[0];
  if (!img?.url) return null;
  return `${backendBaseUrl}${img.url}`;
});

const services = computed(() => {
  const list = allService.value?.services;
  return Array.isArray(list)
    ? [...list].sort((a, b) => a.position - b.position)
    : [];
});
</script>
