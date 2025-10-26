export function useScrollTo() {
  const navigateAndScroll = async (path, elementId) => {
    // Jika tidak di halaman tujuan, pindah dulu
    if (window.location.pathname !== path) {
      await navigateTo(path);
      // Tunggu DOM siap setelah navigation
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToId = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return { navigateAndScroll, scrollToId };
}
