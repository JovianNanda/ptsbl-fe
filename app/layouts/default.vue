<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Preloader :visible="loading" />
    <NavigationBar />
    <main class="flex-grow">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Preloader from "~/components/Preloader.vue";
import NavigationBar from "~/components/layouts/NavigationBar.vue";
import { usePreloaderStore } from "~/stores/preloader";

const { loading } = usePreloaderStore();
</script>
