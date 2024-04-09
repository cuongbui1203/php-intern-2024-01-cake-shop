import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import { ROLE } from '@/const/role';
import i18n from '@/i18n';
import { Link } from '@inertiajs/inertia-react';
import { Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ListCakeType({ cakeTypes, auth }) {
    const [t] = useTranslation();
    const roleId = auth.user != null ? auth.user.role_id : ROLE.USER;
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
            }),
            {
                headers: {
                    'X-localization': i18n.language
                }
            }
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
                        className="btn"
                    >
                        <span>{t('View')}</span>
                    </Link>
                    {roleId == ROLE.ADMIN ? (
                        <>
                            <Link
                                as="button"
                                className="btn"
                                href={route('cake-types.edit', {
                                    cakeType: e.id
                                })}
                                key={e.id + 'edit'}
                            >
                                <span>{t('Edit')}</span>
                            </Link>
                            <button
                                key={e.id + 'delete'}
                                onClick={() => {
                                    handleDelete(e.id);
                                }}
                                className="px-3 py-1 ml-2 mr-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                            >
                                <span>{t('Delete')}</span>
                            </button>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            ),
            quantity: e.cakes.length
        });
    });

    return (
        <>
            <Navbar auth={auth} />
            <Title title={t('Cake Type')} />
            <div className="mr-4 d-flex justify-content-end">
                {roleId == 1 ? (
                    <Link
                        href={route('admin.cake-types.create')}
                        as="button"
                        className="btn"
                    >
                        {t('Add')}
                    </Link>
                ) : (
                    <></>
                )}
            </div>
            <div
                style={{
                    padding: '0px 50px',
                    marginTop: '10px'
                }}
            >
                <Table columns={col} dataSource={dataSource}></Table>
            </div>
        </>
    );
}
