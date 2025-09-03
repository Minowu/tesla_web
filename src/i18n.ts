import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import vi from './locales/vi/translation.json';

export const resources = {
  en: { translation: en },
  vi: { translation: vi },
} as const;

const initialLang = (typeof window !== 'undefined' && localStorage.getItem('thadorobot-lang') === 'en') ? 'en' : 'vi';

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;


