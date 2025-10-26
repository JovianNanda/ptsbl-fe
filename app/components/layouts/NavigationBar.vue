<template>
  <nav
    class="fixed left-0 right-0 z-50 transition-all border-b-0 border-muted/20 shadow-sm bg-white"
  >
    <div class="flex items-center w-full px-4 lg:px-28 py-3">
      <!-- Logo -->
      <NuxtLink to="/">
        <img src="/images/LogoSBL.png" alt="Logo" class="w-50" />
      </NuxtLink>

      <!-- Desktop Nav -->
      <ul class="w-full justify-end hidden md:flex gap-5 items-center">
        <li v-for="item in navbarItems" :key="item.label">
          <NuxtLink
            v-if="item.to && !item.isButton"
            :to="item.to"
            :class="itemActiveClass(item)"
            class="text-sm font-normal transition cursor-pointer"
            @click="() => onNavItemClick(item)"
          >
            {{ t(item.label) }}
          </NuxtLink>

          <button
            v-else-if="item.isButton"
            :class="item.ui?.link || defaultButtonClass"
            class="cursor-pointer"
            @click="() => onNavItemClick(item)"
          >
            {{ t(item.label) }}
          </button>

          <span
            v-else
            :class="itemActiveClass(item)"
            class="text-sm font-normal transition cursor-pointer"
            @click="() => onNavItemClick(item)"
          >
            {{ t(item.label) }}
          </span>
        </li>
      </ul>

      <!-- Mobile -->
      <USlideover v-model="isOpen">
        <template #title>
          <img src="/images/LogoSBL.png" alt="Logo" class="w-40" />
        </template>

        <template #body>
          <div class="mt-6 flex flex-col space-y-4">
            <button
              v-for="item in navbarItems"
              :key="item.label + '-mobile'"
              :class="mobileItemClass(item)"
              @click="
                () => {
                  onNavItemClick(item);
                  isOpen = false;
                }
              "
            >
              {{ t(item.label) }}
            </button>
          </div>
        </template>
      </USlideover>
    </div>
  </nav>
  <button
    class="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary-600 transition z-50 uppercase"
    aria-label="Change language"
    @click="switchLocale"
  >
    {{ localeValue }}
  </button>
</template>

<script setup>
import { useI18n } from "vue-i18n";

import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "#app";
import { useContactStore } from "~/stores/contact";
import { useSectionObserver } from "~/composables/useSectionObserver";

const { locale, t, setLocale } = useI18n();

const localeValue = ref(locale.value);

function switchLocale() {
  setLocale(locale.value === "en" ? "id" : "en");
}

watch(locale, (newVal) => {
  localeValue.value = newVal;
});

// ✅ State
const isOpen = ref(false);
const route = useRoute();
const router = useRouter();

// ✅ Contact (WhatsApp)
const contactStore = useContactStore();
await contactStore.fetchContact();
const Telp = computed(() =>
  (contactStore?.data?.data?.cardList?.[0]?.subtitle || "").replace(/\+/g, "")
);

// ✅ Active Section Observer (only works on home)
const { activeSection } = useSectionObserver(["hero", "location", "contact"]);

watch(
  () => route.path,
  async (newPath) => {
    if (newPath !== "/") {
      // Leaving home → clear active section
      activeSection.value = null;
      return;
    }
  },
  { immediate: true }
);

// ✅ Helper: scroll to section
async function scrollToSection(section) {
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ✅ Navigation data
const navbarItems = computed(() => [
  { label: "home", to: "/", section: "hero" },
  { label: "services", to: "/services" },
  { label: "about", to: "/about" },
  { label: "location", to: "/", section: "location" },
  { label: "contact", to: "/", section: "contact" },
  {
    label: "buttonContact",
    isButton: true,
    onClick: () => window.open(`https://wa.me/${Telp.value}`, "_blank"),
  },
]);

// ✅ Decide if an item is currently active
function isItemActive(item) {
  // ✅ If in homepage → use section observer
  if (route.path === "/" && item.section) {
    return activeSection.value === item.section;
  }

  // ✅ If not homepage → use route only
  if (!item.section && item.to) {
    return item.to === route.path;
  }

  return false;
}

const itemActiveClass = (item) =>
  isItemActive(item)
    ? "text-primary font-semibold"
    : "text-gray-500 hover:text-primary";

const mobileItemClass = (item) =>
  isItemActive(item)
    ? "text-primary font-bold text-left p-3"
    : "text-gray-700 p-3 text-left";

async function onNavItemClick(item) {
  if (item.isButton && item.onClick) {
    item.onClick();
    return;
  }

  // ✅ Scroll to section on Home
  if (item.section) {
    if (route.path !== "/") {
      await router.push("/"); // ✅ No navigateTo for in-app routing
      await nextTick();
    }
    scrollToSection(item.section);
    activeSection.value = item.section;
    return;
  }

  // ✅ Normal page navigation
  if (item.to) {
    router.push(item.to);
  }
}

const defaultButtonClass =
  "px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition";
</script>
