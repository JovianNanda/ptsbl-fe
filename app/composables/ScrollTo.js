export const useScrollTo = () => {
  const route = useRoute();

  const scrollToElement = (id, options = {}) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        ...options,
      });
    }
  };

  const navigateAndScroll = async (path, elementId) => {
    if (route.path === path) {
      // Already on the same page
      nextTick(() => {
        scrollToElement(elementId);
      });
    } else {
      await navigateTo(path);
      // Wait a bit for DOM render
      nextTick(() => {
        setTimeout(() => {
          scrollToElement(elementId);
        }, 800);
      });
    }
  };

  return { scrollToElement, navigateAndScroll };
};
