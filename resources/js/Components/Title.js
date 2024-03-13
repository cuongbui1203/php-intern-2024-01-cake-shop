import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Title({ name, title }) {
    const [t] = useTranslation();
    return (
        <div className="mx-auto my-2 text-center text-title">
            <h1 className="text-capitalize font-weight-bold">
                {t(name)} {t(title)}
            </h1>
        </div>
    );
}
