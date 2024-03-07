import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Title({ name, title }) {
    const [t] = useTranslation();
    return (
        <div className="row">
            <div className="col-10 mx-auto my-2 text-center text-title">
                <h1 className="text-capitalize font-weight-bold">
                    {t(name)} <strong className="text-blue">{t(title)}</strong>
                </h1>
            </div>
        </div>
    );
}
