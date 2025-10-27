<!-- components/LocaleFloat.vue -->
<template>
  <button
    class="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary-600 transition z-50 uppercase cursor-pointer"
    aria-label="Change language"
    @click="onSwitchLocale"
  >
    {{ locale }}
  </button>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const emit = defineEmits(["localeChanged"]);

const { locale, setLocale } = useI18n();

function onSwitchLocale() {
  const newLocale = locale.value === "en" ? "id" : "en";
  setLocale(newLocale);

  // set the cookie so server / detectBrowserLanguage sees the new value
  document.cookie = `i18n_redirected=${newLocale}; path=/`;

  // emit to parent (NavBar)
  emit("localeChanged", newLocale);
}
</script>
