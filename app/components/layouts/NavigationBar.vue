<template>
  <nav
    class="fixed left-0 right-0 z-50 transition-all border-b-0 border-muted/20 shadow-sm bg-white"
  >
    <div class="flex items-center w-full px-4 lg:px-28 py-3">
      <!-- Logo -->
      <NuxtLink :to="localePath({ name: 'index' })">
        <img src="/images/LogoSBL.png" alt="Logo" class="w-50" />
      </NuxtLink>

      <!-- Desktop Nav -->
      <ul class="w-full justify-end hidden md:flex gap-5 items-center">
        <li v-for="item in navbarItems" :key="item.label">
          <!-- Section links handled as buttons so we can navigate locale-aware and scroll -->
          <button
            v-if="item.section"
            :class="itemActiveClass(item)"
            class="text-sm font-normal transition cursor-pointer bg-transparent"
            @click="() => onNavItemClick(item)"
          >
            {{ t(item.label) }}
          </button>

          <!-- Regular page links use NuxtLink + localePath -->
          <NuxtLinkLocale
            v-else-if="item.to"
            :to="localePath(item.to)"
            :class="itemActiveClass(item)"
            class="text-sm font-normal transition cursor-pointer"
          >
            {{ t(item.label) }}
          </NuxtLinkLocale>

          <!-- Button action (WhatsApp) -->
          <button
            v-else-if="item.isButton"
            :class="item.ui?.link || defaultButtonClass"
            class="cursor-pointer"
            @click="() => onNavItemClick(item)"
          >
            {{ t(item.label) }}
          </button>

          <!-- Fallback span (rare) -->
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

              <!-- Regular item (mobile uses button to control navigation/scroll) -->
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
  <LocaleFloat @localeChanged="handleLocaleChange" />
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, computed, nextTick } from "vue";
import { useRoute, useRouter } from "#app";
import { useContactStore } from "~/stores/contact";
import { useSectionObserver } from "~/composables/useSectionObserver";

const { locale, t } = useI18n();
const localePath = useLocalePath(); // Nuxt i18n helper
const switchLocalePath = useSwitchLocalePath(); // Nuxt i18n helper

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

async function handleLocaleChange(newLocale) {
  // small wait to ensure locale.value is updated
  await nextTick();

  // debug logs (remove when done)
  console.log(
    "[locale-change] newLocale:",
    newLocale,
    "route.fullPath:",
    route.fullPath,
    "locale.value:",
    locale.value
  );

  // build the localized path to the current route
  // prefer switchLocalePath (it returns the path for a locale)
  let target = null;
  try {
    if (typeof switchLocalePath === "function") {
      // switchLocalePath expects the locale code
      target = switchLocalePath(newLocale);
    }
  } catch (e) {
    console.warn(
      "[locale-change] switchLocalePath failed, fallback to localePath",
      e
    );
  }

  // fallback if switchLocalePath not available or returned falsy
  if (!target) {
    // use route name/params/hash to recompute localized path
    target = localePath({
      name: route.name,
      params: route.params,
      hash: route.hash,
    });
  }

  console.log("[locale-change] computed target:", target);

  // update cookie again just in case
  document.cookie = `i18n_redirected=${newLocale}; path=/`;

  // only replace if different
  if (target && target !== route.fullPath) {
    // replace avoids adding extra history entry
    await router.replace(target);
    // small tick to allow hydration updates
    await nextTick();
    console.log(
      "[locale-change] route replaced ->",
      router.currentRoute.value.fullPath
    );
    // force navKey recompute so links re-render (you already had navKey logic)
    navKey.value++;
  } else {
    console.log("[locale-change] no route change needed");
    // still bump navKey to be safe
    navKey.value++;
  }
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

// Helper: scroll to section
function scrollToSection(section) {
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ✅ Navigation data (use route-name objects for localePath)
const navbarItems = computed(() => [
  { label: "home", to: { name: "index" }, section: "hero", hash: "hero" },
  { label: "services", to: { name: "services" } },
  { label: "about", to: { name: "about" } },
  {
    label: "location",
    to: { name: "index" },
    section: "location",
    hash: "location",
  },
  {
    label: "contact",
    to: { name: "index" },
    section: "contact",
    hash: "contact",
  },
  {
    label: "buttonContact",
    isButton: true,
    onClick: () => window.open(`https://wa.me/${Telp.value.trim()}`, "_blank"),
  },
]);

// Decide if an item is currently active
function isItemActive(item) {
  // If item is a section and we're on index page, use activeSection
  if (item.section && route.name === "index") {
    return activeSection.value === item.section;
  }

  // If item has a to (route-name), compare route.name
  if (item.to && route.name) {
    // route.name can be a string or object; compare string name
    return route.name === item.to.name;
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
  // Button action (WhatsApp)
  if (item.isButton && item.onClick) {
    item.onClick();
    return;
  }

  // Section links: navigate locale-aware to index and scroll
  if (item.section) {
    // Build locale-aware path to index (without hash first)
    const indexPath = localePath({ name: "index" });

    // If not on index, navigate to it
    if (route.name !== "index") {
      await router.push(indexPath);
      await nextTick();
    }

    // after navigation (or if already on index) scroll to section
    // small delay to ensure DOM ready (if needed)
    await nextTick();
    scrollToSection(item.section);
    activeSection.value = item.section;
    return;
  }

  // Normal page navigation using localePath
  if (item.to) {
    // include hash if provided
    const toObj = { ...item.to };
    if (item.hash) toObj.hash = item.hash;

    const path = localePath(toObj);
    // Only push when path differs from current
    if (path !== route.fullPath) {
      await router.push(path);
    }
  }
}

const defaultButtonClass =
  "px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition";
</script>
