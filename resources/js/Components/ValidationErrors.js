import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ValidationErrors({ errors }) {
    const [t] = useTranslation();
    return (
        Object.keys(errors).length > 0 && (
            <div className="mb-4">
                <div className="font-medium text-red-600">
                    {t('Whoops!')} {t('Something went wrong.')}
                </div>

                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {Object.keys(errors).map(function (key, index) {
                        return <li key={index}>{errors[key]}</li>;
                    })}
                </ul>
            </div>
        )
    );
}
