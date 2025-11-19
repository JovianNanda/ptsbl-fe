<template>
  <footer
    class="relative text-white"
    style="
      background-image: url('/images/forest.jpg');
      background-size: cover;
      background-position: center;
    "
  >
    <div class="bg-green-900/80">
      <div class="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <NuxtImg
              :src="`/images/LogoSBL.png`"
              alt="PT Sarana Bumi Lestari"
              class="w-32 h-auto"
              loading="lazy"
            />
          </div>
          <p class="text-gray-200 text-sm leading-relaxed">
            {{ homepageData?.hero_title }}
          </p>
          <div class="flex">
            <!-- <img
              v-for="value in globalData?.data.images || []"
              :key="value.id"
              class="max-w-5xl"
              :src="`${backendBaseUrl}${value.url}`"
              alt=""
            /> -->
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-white mb-3">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/services" class="hover:underline"
                >Layanan</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/about" class="hover:underline">Tentang</NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/"
                class="hover:underline"
                @click.prevent="navigateAndScroll('location')"
                >Lokasi</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="hover:underline"
                @click.prevent="navigateAndScroll('contact')"
                >Kontak</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Kontak -->
        <div>
          <h4 class="font-semibold text-white mb-3">Kontak</h4>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start gap-2">
              <NuxtLink
                :to="
                  'https://www.google.com/maps/search/?api=1&query=' +
                  contacts[2]?.subtitle
                "
                target="_blank"
                class="flex items-start gap-2 hover:underline"
              >
                <UIcon
                  name="i-heroicons-map-pin-20-solid"
                  class="w-5 h-5 mt-0.5"
                />
                {{ contacts[2]?.subtitle }}
              </NuxtLink>
            </li>
            <li class="flex items-center gap-2">
              <NuxtLink
                :to="'tel:' + contacts[0]?.subtitle"
                class="flex items-center gap-2 hover:underline"
              >
                <UIcon name="i-heroicons-phone-20-solid" class="w-5 h-5" />
                {{ contacts[0]?.subtitle }}
              </NuxtLink>
            </li>
            <li class="flex items-center gap-2">
              <NuxtLink
                :to="'mailto:' + contacts[1]?.subtitle"
                class="flex items-center gap-2 hover:underline"
              >
                <UIcon name="i-heroicons-envelope-20-solid" class="w-5 h-5" />
                {{ contacts[1]?.subtitle }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <hr class="border-white/20 mx-auto max-w-6xl" />

      <div class="text-center text-sm text-gray-200 py-4">
        © 2025 PT Sarana Bumi Lestari. All rights reserved.
      </div>
    </div>
  </footer>
</template>
<script setup>
import { useGlobalStore } from "~/stores/global";
import { useRouter } from "vue-router";

const homepageStore = useHomepageStore();
await homepageStore.fetchHomepage();
const homepageData = computed(() => homepageStore?.data);

const globalStore = useGlobalStore();
await globalStore.fetchGlobal();
const globalData = computed(() => globalStore?.data);

const contactStore = useContactStore();
await contactStore.fetchContact();
const allContact = computed(() => contactStore?.data);
const contacts = computed(() => {
  const list = allContact.value?.data.cardList;
  return Array.isArray(list)
    ? [...list].sort((a, b) => a.position - b.position)
    : [];
});
const backendBaseUrl = useRuntimeConfig().public.backendBase;
const firstImgFooter = `${backendBaseUrl}${globalData?.value.images?.[0]?.url}`;

const router = useRouter();

function navigateAndScroll(elementId) {
  // Navigate first
  router.push("/").then(() => {
    // Scroll after navigation
    const el = document.getElementById(elementId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
}
</script>
