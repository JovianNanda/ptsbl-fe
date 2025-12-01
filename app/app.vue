<template>
  <div class="light">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <UApp>
        <NuxtPage :key="$route.fullPath" />
      </UApp>
    </NuxtLayout>
  </div>
</template>

<script setup></script>
<style>
@import "aos/dist/aos.css";
/* Prevent AOS from causing horizontal overflow */
[data-aos="fade-left"],
[data-aos="fade-right"] {
  overflow-x: hidden !important;
}

body,
html {
  overflow-x: hidden;
}
</style>
