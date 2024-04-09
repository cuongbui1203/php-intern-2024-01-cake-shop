import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import React from 'react';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/inertia-react';

export default function CakeTypeDetail({ cakeType, auth }) {
    const [t] = useTranslation();
    const col = [
        {
            title: t('Name'),
            dataIndex: 'name'
        },
        {
            title: t('Amount'),
            dataIndex: 'amount'
        },
        {
            title: t('Action'),
            dataIndex: 'action'
        }
    ];
    const data = [];
    cakeType.cakes.map((e) => {
        data.push({
            name: e.name,
            amount: e.amount,
            action: (
                <Link
                    href={route('cakes.show', {
                        cake: e.id
                    })}
                    as="button"
                    className="btn"
                >
                    {t('View')}
                </Link>
            )
        });
    });
    return (
        <>
            <Navbar auth={auth} />
            <div
                style={{
                    margin: '0px 100px'
                }}
            >
                <Link
                    href={route('cake-types.index')}
                    as="button"
                    className="btn"
                >
                    {t('Back')}
                </Link>
                <Title title={t('Cake Type') + ' ' + cakeType.name} />
                <div
                    style={{
                        marginBottom: '50px'
                    }}
                >
                    {t('Description')}:<br />
                    {cakeType.description}
                </div>
                <Table columns={col} dataSource={data}></Table>
            </div>
        </>
    );
}
