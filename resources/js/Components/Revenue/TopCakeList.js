import React from 'react';
import TopCakeItem from './TopCakeItem';
import { useTranslation } from 'react-i18next';

export default function TopCakeList({ topCakes }) {
    const [t] = useTranslation();
    console.log(topCakes);

    return (
        <div className="flex flex-col justify-center items-center w-[28%] h-[500px] rounded-3xl space-y-6">
            <h1 className="font-bold text-center">{t('topCake')}</h1>
            {topCakes.map((cake) => (
                <TopCakeItem key={cake.id} cake={cake} />
            ))}
        </div>
    );
}
