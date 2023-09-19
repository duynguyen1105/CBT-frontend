import i18n from "i18next";
import Backend from 'i18next-http-backend'
import Detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import getBrowserLang from "utils/getBrowserLang";
import en from 'assets/translate/en.json';
import vi from 'assets/translate/vi.json';

const lang = getBrowserLang();

i18n
  .use(Backend)
  .use(Detector)
  .use(initReactI18next)
  .init({
    fallbackLng: lang,
    lng: lang,
    debug: true,
    // backend: {
    //   loadPath: `assets/translate/{{lng}}.json`
    // },
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi
      }
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage'],
      caches: ['cookie', 'localStorage']
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
