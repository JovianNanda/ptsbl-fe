export const useStrapiLocale = () => {
  const { locale, locales } = useI18n();
  const isoLocale = computed(() => {
    const found = locales.value.find((l) => l.code === locale.value);
    return found?.iso || "id-ID";
  });
  return isoLocale;
};
