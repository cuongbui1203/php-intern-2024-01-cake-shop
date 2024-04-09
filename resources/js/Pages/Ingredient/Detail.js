import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import { Link } from '@inertiajs/inertia-react';
import { Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Detail({ auth, ingredient }) {
    const [t] = useTranslation();

    const col = [
        {
            title: t('Name'),
            dataIndex: 'name'
        },
        {
            title: t('Amount'),
            dataIndex: 'amount',
            width: '20%'
        },
        {
            title: t('Action'),
            dataIndex: 'action'
        }
    ];
    const data = [];
    ingredient.cakes.map((e) => {
        data.push({
            name: e.name,
            amount: e.amount,
            action: (
                <>
                    <Link
                        as="button"
                        href={route('cakes.show', {
                            cake: e.id
                        })}
                        className="btn"
                    >
                        {t('View')}
                    </Link>
                </>
            )
        });
    });
    return (
        <>
            <Navbar auth={auth} />
            <div>
                <Title name={ingredient.name} />
                <div className="flex justify-center">
                    <div className="w-[80vh]">
                        <div className="w-full mb-4">
                            <label>{t('Name')}: </label>{' '}
                            <span>{ingredient.name}</span>
                        </div>
                        <div>
                            <Table columns={col} dataSource={data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
