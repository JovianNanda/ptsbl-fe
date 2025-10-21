<template>
  <nav
    class="fixed left-0 right-0 z-50 transition-all border-b-0 border-muted/20 shadow-sm bg-white"
  >
    <div class="flex items-center w-full px-4 lg:px-28 py-3">
      <div class="flex items-center space-x-2">
        <!-- <UIcon
        name="i-heroicons-cube-transparent"
        class="w-6 h-6 text-primary-500"
      /> -->
        <NuxtLink to="/">
          <NuxtImg
            src="/images/logoSBL.png"
            alt="MyCompany Logo"
            class="md:w-52 w-52"
          />
        </NuxtLink>
      </div>

      <UNavigationMenu
        variant="link"
        highlight-color="primary"
        :items="navbarItems"
        class="w-full justify-end hidden md:flex font-normal"
        font-size="md"
        font-weight="normal"
        :ui="{
          list: 'gap-5',
          link: 'text-sm font-normal hover:text-primary transition cursor-pointer',
        }"
        :class="[
          activeSection === (navbarItems.elementId || navbarItems.path)
            ? 'text-primary font-semibold'
            : 'text-gray-500 hover:text-primary',
        ]"
        @click="handleClick(navbarItems)"
      />

      <!-- Mobile Drawer -->
      <USlideover
        v-model="isOpen"
        :close="{
          color: 'primary',
          variant: 'outline',
        }"
        :ui="{ body: 'text-primary ' }"
      >
        <div class="flex flex-col ml-auto">
          <UButton
            class="md:hidden flex cursor-pointer p-3 rounded-md transition"
            :icon="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            @click="isOpen = false"
          />
        </div>
        <template #title>
          <div>
            <NuxtImg
              src="/images/logoSBL.png"
              alt="MyCompany Logo"
              class="md:w-52 w-52"
            />
          </div>
        </template>
        <template #body>
          <div class="mt-6">
            <UNavigationMenu
              orientation="vertical"
              variant="link"
              highlight-color="primary"
              :items="navbarItems"
              class="flex flex-col space-y-4 font-normal"
              font-size="md"
              font-weight="normal"
              :ui="{
                list: 'flex flex-col gap-5',
                link: 'text-sm font-normal hover:text-primary transition',
              }"
            />
          </div>
        </template>
      </USlideover>
    </div>
  </nav>
</template>
<script setup>
import { ref } from "vue";

const { navigateAndScroll } = useScrollTo();
const route = useRoute();
const activeSection = ref(route.path);
const isOpen = ref(false);
const navbarItems = [
  {
    label: "Home",
    onClick: () => {
      navigateAndScroll("/", "hero");
    },
    elementId: "hero",
  },
  {
    label: "Layanan",
    to: "/services",
    elementId: null,
  },
  {
    label: "Tentang Kami",
    to: "/about",
    elementId: null,
  },
  {
    label: "Lokasi",
    onClick: () => {
      navigateAndScroll("/", "location");
    },
    elementId: "location",
  },
  {
    label: "Kontak",
    onClick: () => {
      navigateAndScroll("/", "contact");
    },
    elementId: "contact",
  },
  {
    label: "Hubungi",
    isButton: true,

    ui: {
      // styling applied to this item so it looks like a button in the menu
      link: "px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition hover:text-white flex text-center items-center justify-center",
    },
    elementId: null,
  },
];

onMounted(() => {
  const sections = navbarItems
    .filter((l) => l.elementId)
    .map((l) => ({ id: l.elementId, el: document.getElementById(l.elementId) }))
    .filter((s) => s.el);

  const handleScroll = () => {
    let current = route.path;
    for (const { id, el } of sections) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        current = id;
      }
    }
    activeSection.value = current;
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();
  onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));
});

const handleClick = (link) => {
  activeSection.value = link.elementId || link.path;
  if (link.elementId) navigateAndScroll(link.path, link.elementId);
  else navigateTo(link.path);
};
</script>
