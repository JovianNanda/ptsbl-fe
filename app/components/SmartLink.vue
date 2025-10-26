<template>
  <!-- External links -->
  <a
    v-if="type === 'external'"
    :href="raw"
    target="_blank"
    rel="noopener noreferrer"
    class="flex"
  >
    <slot />
  </a>

  <!-- NuxtLink for internal routes (including /path and /path#hash) -->
  <NuxtLink
    v-else-if="type === 'route'"
    :to="toProp"
    class="flex"
    @click="onClickIfSamePageHash"
  >
    <slot />
  </NuxtLink>

  <!-- Anchor fallback for same-page hash (works as progressive enhancement) -->
  <a v-else class="flex" :href="raw" @click.prevent="onAnchorClick">
    <slot />
  </a>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed, nextTick } from "vue";

const props = defineProps({
  raw: { type: String, required: true },
});

const router = useRouter();
const route = useRoute();

/**
 * Parse props.raw into type and normalized toProp
 * types: 'external' | 'route' | 'anchor'
 */
const isExternal = (u) => /^https?:\/\//i.test(u);
const hasHash = (u) => u.includes("#");

const parsed = computed(() => {
  const u = props.raw || "";
  if (!u) return { type: "anchor", path: route.path, hash: "" };

  if (isExternal(u)) return { type: "external", path: null, hash: null };

  // If contains path + hash like "/about#team"
  if (hasHash(u)) {
    const [p, h] = u.split("#");
    const path = p === "" ? route.path : p; // if just "#id", keep current route path
    const hash = h ? `#${h}` : "";
    return { type: "route", path, hash };
  }

  // Plain internal route starting with /
  if (u.startsWith("/")) return { type: "route", path: u, hash: "" };

  // If starts with '#' (hash on same page) treat as route with current path
  if (u.startsWith("#")) return { type: "route", path: route.path, hash: u };

  // Fallback to anchor
  return { type: "anchor", path: route.path, hash: "" };
});

const type = computed(() => parsed.value.type);

/**
 * The :to prop for <NuxtLink>
 * Use object form so hash routing is explicit.
 */
const toProp = computed(() => {
  if (parsed.value.type !== "route") return null;
  return parsed.value.hash
    ? { path: parsed.value.path, hash: parsed.value.hash }
    : parsed.value.path;
});

/**
 * Helper to perform smooth scroll to the hash
 */
async function scrollToHash(hash) {
  if (!hash) return;
  await nextTick();
  // try by id, then by selector
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  const elById = document.getElementById(id);
  const el = elById || document.querySelector(hash);
  if (el) {
    // optionally offset for fixed header — change 80 if needed
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  } else {
    // debug fallback
    // console.warn('SmartLink: target not found for', hash)
  }
}

/**
 * Case: user clicks an anchor-style fallback (we prevented navigation)
 * We attempt to scroll directly (same page)
 */
async function onAnchorClick() {
  const u = props.raw;
  if (!u) return;
  if (u.startsWith("#")) {
    await scrollToHash(u);
    // update URL hash without jumping
    history.replaceState(null, "", u);
    return;
  }
  // otherwise, fallback to normal navigation
  window.location.href = u;
}

/**
 * Edge case: user clicked a NuxtLink to the SAME path & hash (router may ignore navigation)
 * If route.path === target path and route.hash differs or is same, manually scroll.
 * We only call this for NuxtLink clicks to cover "already on page" -> "#section"
 */
async function onClickIfSamePageHash(event) {
  const target = parsed.value;
  if (!target || target.type !== "route") return;
  if (!target.hash) return; // nothing to scroll
  const currentPath = route.path;
  if (currentPath === target.path) {
    // Prevent default router no-op and do the scroll manually
    event.preventDefault && event.preventDefault();
    await scrollToHash(target.hash);
    // push hash into URL (without full reload)
    router.replace({ path: currentPath, hash: target.hash }).catch(() => {});
  }
}

/**
 * Also handle the case when navigation finishes to a route that has a hash.
 * This ensures /page#section navigation will scroll after route change.
 */
router.afterEach((to) => {
  if (to.hash) {
    // small delay to let DOM render
    setTimeout(() => scrollToHash(to.hash), 60);
  }
});
</script>
