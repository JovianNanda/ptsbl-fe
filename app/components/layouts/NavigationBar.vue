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
      <USlideover
        v-model="isOpen"
        class="light"
        theme="light"
        data-theme="light"
        :close="{ class: 'cursor-pointer text-black hover:bg-gray-100' }"
        :ui="{
          content:
            'bg-white p-6 w-11/12 max-w-sm rounded-lg shadow-xl border border-gray-100 text-gray-800',
          header:
            'flex items-center border-b border-muted/20 pb-4 justify-start',
        }"
        color="neutral"
      >
        <!-- Mobile: Hamburger -->
        <div class="ml-auto md:hidden">
          <button
            class="p-2 rounded-md focus:outline-none cursor-pointer"
            aria-label="Open menu"
            :aria-expanded="isOpen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <template #title>
          <img src="/images/LogoSBL.png" alt="Logo" class="w-40" />
        </template>

        <template #body>
          <div class="mt-6 flex flex-col space-y-2">
            <div v-for="item in navbarItems" :key="item.label + '-mobile'">
              <!-- Item with children: collapsible -->
              <div v-if="item.children" class="w-full">
                <button
                  class="w-full flex items-center justify-between px-3 py-2 text-left cursor-pointer rounded-md transition-colors duration-200"
                  :class="
                    isItemActive(item)
                      ? 'text-primary font-bold bg-white'
                      : 'text-black hover:bg-gray-100'
                  "
                  @click="toggleSubmenu(item.label)"
                >
                  <span>{{ t(item.label) }}</span>
                  <svg
                    :class="
                      openSubmenus[item.label] ? 'transform rotate-180' : ''
                    "
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06-.02L10 10.66l3.71-3.47a.75.75 0 111.02 1.1l-4.2 3.93a.75.75 0 01-1.02 0L5.25 8.29a.75.75 0 01-.02-1.08z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <div v-show="openSubmenus[item.label]" class="pl-4">
                  <button
                    v-for="child in item.children"
                    :key="item.label + '-' + child.label"
                    class="w-full text-left p-3 text-black hover:text-primary hover:bg-white transition-colors duration-200"
                    @click="
                      () => {
                        onNavItemClick(child);
                        isOpen = false;
                      }
                    "
                  >
                    {{ t(child.label) }}
                  </button>
                </div>
              </div>

              <!-- Regular item -->
              <div v-else class="w-full">
                <button
                  class="cursor-pointer rounded-md w-full text-left px-3 py-2 text-black hover:text-primary hover:bg-white transition-colors duration-200"
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
            </div>
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
const openSubmenus = ref({});

function toggleSubmenu(label) {
  openSubmenus.value = {
    ...openSubmenus.value,
    [label]: !openSubmenus.value[label],
  };
}

// ✅ Contact (WhatsApp)
const contactStore = useContactStore();
await contactStore.fetchContact();
const Telp = computed(() =>
  (contactStore?.data?.data?.cardList?.[0]?.subtitle || "").replace(
    /[^\d]/g,
    ""
  )
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
    onClick: () => window.open(`https://wa.me/${Telp.value.trim()}`, "_blank"),
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
    ? "text-primary font-bold text-left p-3 "
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
