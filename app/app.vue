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
</style>
