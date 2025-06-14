import { createI18nClient } from "next-international/client";

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  defineLocale,
  useCurrentLocale,
} = createI18nClient({
  en: async () => {
    await new Promise(resolve => setTimeout(resolve, 1));
    return import('./en');
  },
  vi: async () => {
    await new Promise(resolve => setTimeout(resolve, 1));
    return import('./vi');
  },
});
