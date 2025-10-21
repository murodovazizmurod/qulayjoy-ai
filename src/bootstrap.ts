import 'dayjs/locale/uz-latn';
import 'dayjs/locale/ru';

import dayjs from 'dayjs';

import config from '@/config';
import i18n, { i18nConfig } from '@/core/services/i18n';
import { storage } from '@/core/services';

// Ensure dayjs is properly initialized
if (typeof dayjs !== 'function') {
  console.error('dayjs failed to load properly');
}

const currentLanguage = storage.local.get(config.language.key) || config.language.initial;

i18n.init({
  ...i18nConfig,
  lng: currentLanguage,
  debug: import.meta.env.DEV
});

dayjs.locale(currentLanguage === 'uz' ? 'uz-latn' : currentLanguage);

i18n.on('languageChanged', lng => {
  storage.local.set(config.language.key, lng);
  dayjs.locale(lng === 'uz' ? 'uz-latn' : lng);
});

export default i18n;
