import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import React from 'react';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';

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
        }
    ];
    const data = [];
    cakeType.cakes.map((e) => {
        data.push({
            name: e.name,
            amount: e.amount
        });
    });
    return (
        <>
            <Navbar auth={auth} />
            <Title title={t('Cake Type') + ' ' + cakeType.name} />
            <div>
                <div>
                    {t('Description')}: {cakeType.description}
                </div>
                <Table columns={col} dataSource={data}></Table>
            </div>
        </>
    );
}
