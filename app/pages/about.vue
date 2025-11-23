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
            <UBadgeHome
              :badge="allAbout?.badge"
              class="bg-transparent outline-1 outline-primary text-primary"
            />
            <h1
              class="text-white text-3xl lg:text-6xl font-normal text-center leading-[1.5]"
            >
              {{ allAbout?.title }}
            </h1>
            <p class="text-white text-lg md:text-xl font-[200] text-justify">
              {{ allAbout?.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Details Section -->
    <div class="flex flex-col gap-10 mx-auto container my-20">
      <DetailCard
        :key="allAdvantages?.id ?? 'adv-0'"
        :data="allAdvantages ?? {}"
        title="KEUNGGULAN"
        index="0"
      />
      <DetailCard
        :key="allCommitment?.id ?? 'com-0'"
        :data="allCommitment ?? {}"
        title="KOMITMEN"
      />
    </div>

    <!-- Principle Section -->
    <div>
      <h1
        class="text-black text-3xl lg:text-4xl font-light text-center leading-[1.5]"
      >
        {{ allPrinciple?.data?.title }}
      </h1>
      <div
        class="flex flex-wrap flex-col lg:flex-row gap-5 container mx-auto my-10 px-4 md:px-0"
      >
        <AdvantageCard
          v-for="(value, item) in allPrinciple?.data?.list ?? []"
          :key="value?.id"
          :advantage="value"
          class="flex-1"
          :index="item + 1"
        />
      </div>
    </div>

    <!-- Journey Section -->
    <div class="mt-40">
      <div class="flex flex-col items-center space-y-6">
        <UBadgeHome
          :badge="allJourney?.badge"
          class="text-secondary bg-secondary"
        />
        <h1
          class="text-black text-3xl lg:text-6xl font-normal text-center leading-[1.5]"
        >
          {{ allJourney?.title }}
        </h1>
      </div>
      <div
        class="flex flex-wrap flex-col md:flex-row md:justify-center md:items-center gap-5 max-w-6xl container mx-auto my-10 px-4"
      >
        <JourneyCard
          v-for="(value, item) in allJourney?.list ?? []"
          :key="value.id"
          :data="value"
          class="flex-1 md:flex-0 md:flex-grow-0 md:flex-shrink-0 md:basis-[30%]"
          :index="item + 1"
        />
      </div>
    </div>

    <PartnerSection />
    <ContactCTA />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useHead, useRuntimeConfig, useAsyncData } from "#imports";

// Components
import UBadgeHome from "~/components/BadgeHome.vue";
import AdvantageCard from "~/components/advantage/AdvantageCard.vue";
import PartnerSection from "~/components/sections/PartnerSection.vue";
// Ensure DetailCard, JourneyCard, ContactCTA are imported or auto-imported by Nuxt

// Stores
// Fixed Import Paths: Using '~' alias for consistency
import { useAboutStore } from "~/stores/about-us";
import { useAdvantageStore } from "~/stores/advantage";
import { useCommitmentStore } from "~/stores/commitment";
import { usePrincipleStore } from "~/stores/principle";
import { useJourneyStore } from "~/stores/journey";
// import { usePreloaderStore } from "~/stores/preloader"; // Not needed in setup, stores handle it

// --- SEO & Meta ---
useHead({
  title: "Tentang Kami – PT Sarana Bumi Lestari",
  link: [
    {
      rel: "canonical",
      href: "https://www.saranabumilestari.com/about",
    },
    {
      rel: "alternate",
      href: "https://www.saranabumilestari.com/about",
      hreflang: "id",
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "PT Sarana Bumi Lestari adalah perusahaan pengelolaan Limbah B3 yang berizin, profesional, dan berkomitmen terhadap keberlanjutan lingkungan sejak 2020.",
    },
    {
      name: "keywords",
      content:
        "Tentang SBL, Profil Perusahaan B3, Sarana Bumi Lestari, Pengelola Limbah B3, Perusahaan Lingkungan Indonesia",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://saranabumilestari.com/about" },
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

// --- Initialize Stores ---
const aboutStore = useAboutStore();
const advantageStore = useAdvantageStore();
const commitmentStore = useCommitmentStore();
const principleStore = usePrincipleStore();
const journeyStore = useJourneyStore();

// --- HYDRATION FIX ---
// Fetch all data in parallel on the server using useAsyncData.
// This ensures the client waits for the server data before rendering.
await useAsyncData("about-page-data", async () => {
  await Promise.all([
    aboutStore.fetchAbout(),
    advantageStore.fetchAdvantage(),
    commitmentStore.fetchCommitment(),
    principleStore.fetchPrinciple(),
    journeyStore.fetchJourney(),
  ]);
  return true; // Return value doesn't matter, we rely on store state
});

// --- Computed Data ---
const allAbout = computed(() => aboutStore.data?.data);

const allAdvantages = computed(() => {
  const data = advantageStore.data?.data;
  if (!data) return null;

  return {
    ...data,
    list:
      data.advantages?.map(({ description, ...rest }) => ({
        ...rest,
        listText: description,
      })) || [],
  };
});

const allCommitment = computed(() => commitmentStore.data?.data);
const allPrinciple = computed(() => principleStore.data);
const allJourney = computed(() => journeyStore.data?.data);

const bgImage = computed(() => {
  const img = allAbout.value?.image_bg;
  if (!img?.url) return null;
  return `${backendBaseUrl}${img.url}`;
});
</script>
