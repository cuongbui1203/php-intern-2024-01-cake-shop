import { t } from 'i18next';
import React from 'react';

export default function CartColumns() {
    return (
        <div className="container-fluid text-center d-none d-lg-block">
            <div className="row">
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">{t('Cake Type')}</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">{t('Cake Name')}</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">{t('Price')}</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">{t('Quantity')}</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">{t('Total')}</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">{t('Action')}</p>
                </div>
            </div>
        </div>
    );
}
