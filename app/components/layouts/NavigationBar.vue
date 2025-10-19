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
          link: 'text-sm font-normal hover:text-primary transition',
        }"
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

const isOpen = ref(false);
const navbarItems = [
  {
    label: "Home",
    to: "/",
    onClick: () => {
      scrollToElement("hero");
    },
  },
  {
    label: "Layanan",
    to: "/services",
  },
  {
    label: "Tentang Kami",
    to: "/about",
  },
  {
    label: "Lokasi",
    to: "/location",
  },
  {
    label: "Kontak",
    to: "/contact",
  },
  {
    label: "Hubungi",
    to: "/contact",
    isButton: true,
    onClick: () => {
      // call-to-action behaviour — navigate to contact page
      window.location.href = "/contact";
    },
    ui: {
      // styling applied to this item so it looks like a button in the menu
      link: "px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition hover:text-white flex text-center items-center justify-center",
    },
  },
];
</script>
