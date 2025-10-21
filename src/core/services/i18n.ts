import i18next, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

// uz files
import uzCommon from '../../translations/uz/common.json';
import uzHome from '../../translations/uz/home.json';
import uzFilter from '../../translations/uz/filter.json';
import uzProfile from '../../translations/uz/profile.json';
import uzApartment from '../../translations/uz/apartment.json';
import uzMessages from '../../translations/uz/messages.json';
import uzAmenities from '../../translations/uz/amenities.json';

// ru files
import ruCommon from '../../translations/ru/common.json';
import ruHome from '../../translations/ru/home.json';
import ruFilter from '../../translations/ru/filter.json';
import ruProfile from '../../translations/ru/profile.json';
import ruApartment from '../../translations/ru/apartment.json';
import ruMessages from '../../translations/ru/messages.json';
import ruAmenities from '../../translations/ru/amenities.json';

export const i18nConfig: InitOptions = {
  resources: {
    uz: {
      common: uzCommon,
      home: uzHome,
      filter: uzFilter,
      profile: uzProfile,
      apartment: uzApartment,
      messages: uzMessages,
      amenities: uzAmenities
    },
    ru: {
      common: ruCommon,
      home: ruHome,
      filter: ruFilter,
      profile: ruProfile,
      apartment: ruApartment,
      messages: ruMessages,
      amenities: ruAmenities
    }
  },
  lng: 'uz',
  fallbackLng: 'uz',
  ns: ['common', 'home', 'filter', 'profile', 'apartment', 'messages', 'amenities'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  }
};

i18next.use(initReactI18next);

export default i18next;
