import React, { useState } from 'react';
import i18n  from '@/i18n'; // Import i18n instance

function LanguageSwitcher() {
  const [locale, setLocale] = useState(i18n.language);

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
    setLocale(event.target.value);
    localStorage.setItem('lang',event.target.value);
    window.location.reload(false);
  };

  return (
    <select value={locale} onChange={handleChange}>
      <option value="vi">Tiếng Việt</option>
      <option value="en">English</option>
    </select>
  );
}

export default LanguageSwitcher;