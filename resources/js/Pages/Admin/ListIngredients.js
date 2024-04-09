import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import { Link } from '@inertiajs/inertia-react';
import { Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ListIngredients({ auth, ingredients }) {
    const [t] = useTranslation();
    const col = [
        {
            title: t('Name'),
            dataIndex: 'name'
        },
        {
            title: t('Action'),
            dataIndex: 'action',
            width: '25%'
        }
    ];

    const handleDelete = async (id) => {
        try {
            if (confirm(t('DeleteIngredient'))) {
                const res = await window.axios.delete(
                    route('api.ingredient.destroy', {
                        ingredient: id
                    })
                );
                if (res.data.success) {
                    alert(t('Success'));
                    location.pathname = location.pathname;
                } else {
                    alert(t('Error'));
                }
            }
        } catch (e) {}
    };

    const data = [];
    ingredients.map((e) => {
        data.push({
            name: e.name,
            action: (
                <>
                    <Link
                        as="button"
                        className="btn"
                        href={route('admin.ingredients.show', {
                            ingredient: e.id
                        })}
                    >
                        {t('View')}
                    </Link>
                    <Link
                        as="button"
                        href={route('admin.ingredients.edit', {
                            ingredient: e.id
                        })}
                        className="btn"
                    >
                        {t('Edit')}
                    </Link>
                    <button
                        onClick={() => handleDelete(e.id)}
                        className="btn-danger"
                    >
                        {t('Delete')}
                    </button>
                </>
            )
        });
    });

    return (
        <>
            <Navbar auth={auth} />
            <div>
                <div className="h-1 "></div>
                <Title name={t('Ingredients')} />
                <div className=" h-7"></div>
                <span className=" w-full flex justify-end pr-[10%] my-4">
                    <Link
                        as="button"
                        href={route('admin.ingredients.create')}
                        className="btn"
                    >
                        {t('Add')}
                    </Link>
                </span>
                <div className="flex justify-center">
                    <Table
                        style={{ width: '80%' }}
                        columns={col}
                        dataSource={data}
                    />
                </div>
            </div>
        </>
    );
}
