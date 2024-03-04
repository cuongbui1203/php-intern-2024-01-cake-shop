import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import { Link } from '@inertiajs/inertia-react';
import { Table } from 'antd';
import axios from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ListCakeType({ cakeTypes, auth }) {
    const [t] = useTranslation();
    const col = [
        {
            title: t('Name'),
            dataIndex: 'name'
        },
        {
            title: t('Description'),
            dataIndex: 'description'
        },
        {
            title: t('Quantity'),
            dataIndex: 'quantity'
        },
        {
            title: t('Action'),
            dataIndex: 'action'
        }
    ];
    const dataSource = [];
    const handleDelete = async (id) => {
        const accept = confirm(t('Confirm continue'));
        if (!accept) return;
        const res = await axios.delete(
            route('api.cake-types.destroy', {
                cakeType: id
            })
        );
        if (res.data.success) {
            window.location.pathname = 'cake-types';
        } else {
            alert(res.data.message);
        }
    };
    cakeTypes.map((e) => {
        dataSource.push({
            name: e.name,
            description: e.description,
            action: (
                <div
                    key={e.id}
                    style={{ width: 'fit-content', display: 'flex' }}
                >
                    <Link
                        href={route('cake-types.show', {
                            cakeType: e.id
                        })}
                        as="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                    >
                        <span>{t('View')}</span>
                    </Link>
                    <Link
                        as="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                        href={route('cakeType.edit', {
                            cakeType: e.id
                        })}
                    >
                        <span>{t('Edit')}</span>
                    </Link>
                    <button
                        onClick={() => {
                            handleDelete(e.id);
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                    >
                        <span>{t('Delete')}</span>
                    </button>
                </div>
            ),
            quantity: e.cakes.length
        });
    });

    return (
        <>
            <Navbar auth={auth} />
            <Title title={t('Cake Type')} />
            <div className="d-flex justify-content-end mr-4">
                <Link
                    href={route('cakeType.create')}
                    as="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                >
                    {t('Add')}
                </Link>
            </div>
            <Table columns={col} dataSource={dataSource}></Table>
        </>
    );
}
