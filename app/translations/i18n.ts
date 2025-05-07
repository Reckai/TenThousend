import { getLocales } from "expo-localization";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./ar/common.json";
import en from "./en/common.json";

const deviceLanguage = getLocales()[0]?.languageCode || "en";
const supportedLanguage = ["en", "ar"].includes(deviceLanguage)
  ? deviceLanguage
  : "en";

const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: (callback: (lng: string) => void) => {
    callback(supportedLanguage);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18next
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    resources,
    lng: supportedLanguage,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
