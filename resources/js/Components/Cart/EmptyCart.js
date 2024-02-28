import { t } from 'i18next';
import React from 'react';

export default function EmptyCart() {
    return (
        <div className="container mt-5">
            <div className="col-10 mx-auto text-center text-title">
                <h1>{t('CartEmpty')}</h1>
            </div>
        </div>
    );
}
