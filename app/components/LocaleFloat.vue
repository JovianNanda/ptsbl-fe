<template>
  <button
    class="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary-600 transition z-50 uppercase cursor-pointer"
    aria-label="Change language"
    @click="switchLocale"
  >
    {{ localeValue }}
  </button>
</template>
<script setup>
import { useI18n } from "vue-i18n";

const { locale, setLocale } = useI18n();

const localeValue = ref(locale.value);

function switchLocale() {
  setLocale(locale.value === "en" ? "id" : "en");
}

watch(locale, (newVal) => {
  localeValue.value = newVal;
});
</script>
