import RevenueChart from '@/Components/Revenue/RevenueChart';
import TopCakeList from '@/Components/Revenue/TopCakeList';
import Title from '@/Components/Title';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Dashboard({ auth, topCakes }) {
    const [t] = useTranslation();
    return (
        <Authenticated auth={auth}>
            <Head title={t('Revenue')} />
            <Title name={t('Revenue')} />
            <div className="flex space-x-4 w-[1500px]">
                <div className="w-[72%] h-[500px] rounded-3xl">
                    <RevenueChart />
                </div>
                <TopCakeList topCakes={topCakes} />
            </div>
        </Authenticated>
    );
}
