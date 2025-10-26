import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

export function useSectionObserver(sectionIds = []) {
  const activeSection = ref(null);
  let observer = null;

  const createObserver = () => {
    if (!("IntersectionObserver" in window)) return;

    observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let visibleId = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            visibleId = entry.target.id;
          }
        });
        if (visibleId) activeSection.value = visibleId;
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  };

  onMounted(async () => {
    await nextTick(); // wait for DOM to render
    createObserver();
  });

  onBeforeUnmount(() => observer?.disconnect());

  return { activeSection };
}
