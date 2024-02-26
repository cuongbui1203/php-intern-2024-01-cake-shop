import i18n from 'i18next';

i18n.init({
  // Ngôn ngữ mặc định
  lng: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en',
  // Ngôn ngữ dự phòng
  fallbackLng: 'en',
  // Đường dẫn đến các file bản dịch
  resources: {
    vi: {
      translation: require('../lang/vi.json'),
    },
    en: {
      translation: require('../lang/en.json'),
    },
  },
});

export default i18n;