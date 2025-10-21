<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Preloader :visible="loading" />
    <NavigationBar />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Preloader from "~/components/PreLoader.vue";
import NavigationBar from "~/components/layouts/NavigationBar.vue";
import Footer from "~/components/layouts/Footer.vue";
import { usePreloaderStore } from "~/stores/preloader";

const { loading } = usePreloaderStore();
</script>
