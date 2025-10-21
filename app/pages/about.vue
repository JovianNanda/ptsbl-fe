<template>
  <div>
    <section
      class="min-h-screen bg-cover bg-center"
      :style="`background-image: url('${bgImage}')`"
    >
      >
      <div
        class="backdrop-brightness-40 flex items-center justify-center h-screen"
      >
        <div
          class="flex flex-col items-center space-y-6 w-11/12 md:w-9/12 lg:w-8/12"
        >
          <div class="flex flex-col items-center space-y-6">
            <UBadgeHome
              :badge="allAbout.badge"
              class="bg-transparent outline-1 outline-primary text-primary"
            />
            <h1
              class="text-white text-3xl lg:text-6xl font-normal text-center leading-[1.5]"
            >
              {{ allAbout.title }}
            </h1>
            <p class="text-white text-lg md:text-xl font-[200] text-justify">
              {{ allAbout.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <div class="flex flex-col gap-10 mx-auto container my-20">
      <DetailCard
        :key="allAdvantages.id"
        :data="allAdvantages"
        title="KEUNGGULAN"
        index="0"
      />
      <DetailCard
        :key="allCommitment.id"
        :data="allCommitment"
        title="KOMITMEN"
      />
    </div>
    <div>
      <h1
        class="text-black text-3xl lg:text-4xl font-light text-center leading-[1.5]"
      >
        {{ allPrinciple.data.title }}
      </h1>
      <div class="flex flex-wrap gap-5 container mx-auto my-10 px-4">
        <AdvantageCard
          v-for="(value, item) in allPrinciple.data.list"
          :key="value.id"
          :advantage="value"
          class="flex-1"
          :index="item + 1"
        />
      </div>
    </div>
    <div class="bg-soft-secondary py-16">
      <CallToAction />
    </div>
  </div>
</template>
<script setup>
import UBadgeHome from "~/components/BadgeHome.vue";
import CallToAction from "~/components/service/CallToAction.vue";
import { useAboutStore } from "~/stores/about-us";
import { useAdvantageStore } from "/stores/advantage";
import { useCommitmentStore } from "/stores/commitment";
import { usePrincipleStore } from "/stores/principle";
import AdvantageCard from "~/components/advantage/AdvantageCard.vue";

const preloader = usePreloaderStore();

preloader.show();

const runtimeConfig = useRuntimeConfig();
const backendBaseUrl = runtimeConfig.public.backendBase;

const aboutStore = useAboutStore();
await aboutStore.fetchAbout();

const advantageStore = useAdvantageStore();
await advantageStore.fetchAdvantage();

const commitmentStore = useCommitmentStore();
await commitmentStore.fetchCommitment();

const allAbout = computed(() => aboutStore.data.data);
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
const allCommitment = computed(() => commitmentStore.data.data);

const principleStore = usePrincipleStore();
await principleStore.fetchPrinciple();

const allPrinciple = computed(() => principleStore.data);
const principles = computed(() => {
  return allPrinciple.value?.list;
});

const bgImage = computed(() => {
  const img = allAbout.value?.image_bg;
  if (!img?.url) return null;
  return `${backendBaseUrl}${img.url}`;
});

preloader.hide();
</script>
