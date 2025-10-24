<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  target: { type: [String, Number], required: true },
  duration: { type: Number, default: 2000 },
});

const displayNumber = ref("0");
const el = ref(null); // ✅ Refer element otomatis

let observer;
let hasAnimated = false;

// ✅ Parse number + keep prefix/suffix
function parseValue(value) {
  const str = String(value);
  const match = str.match(/(\d+(\.\d+)?)/);

  if (!match) return { number: 0, prefix: "", suffix: "" };

  return {
    number: parseFloat(match[0]),
    prefix: str.slice(0, match.index),
    suffix: str.slice(match.index + match[0].length),
  };
}

function startAnimation() {
  if (hasAnimated) return;
  hasAnimated = true;

  const { number, prefix, suffix } = parseValue(props.target);

  const start = 0;
  const end = number;
  const duration = props.duration;
  const startTime = performance.now();

  const animate = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    displayNumber.value = `${prefix}${current}${suffix}`;

    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        startAnimation();
      }
    },
    { threshold: 0.3 }
  );

  if (el.value) observer.observe(el.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <!-- ✅ Now safe -->
  <span ref="el">{{ displayNumber }}</span>
</template>
