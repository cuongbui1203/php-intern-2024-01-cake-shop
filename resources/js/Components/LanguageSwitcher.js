import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { setCookie } from './Cookies';

function LanguageSwitcher() {
    const [_, i18n] = useTranslation();
    const [locale, setLocale] = useState(i18n.language);

    const handleChange = (event) => {
        i18n.changeLanguage(event.target.value);
        setCookie('lang', event.target.value, 10);
        setLocale(event.target.value);
    };

    return (
        <select value={locale} onChange={handleChange}>
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
        </select>
    );
}

export default LanguageSwitcher;
