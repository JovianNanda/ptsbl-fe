<template>
  <div class="light">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage :key="$route.fullPath" />
    </NuxtLayout>
  </div>
</template>

<script setup></script>
