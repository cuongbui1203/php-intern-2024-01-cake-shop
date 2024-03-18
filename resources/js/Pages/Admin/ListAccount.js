import Dropdown from '@/Components/Dropdown';
import Label from '@/Components/Label';
import Modal from '@/Components/Modal';
import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import { ROLE } from '@/const/role';
import i18n from '@/i18n';
import { Link } from '@inertiajs/inertia-react';
import { Select, Table } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ListAccount({ auth, users }) {
    const [t] = useTranslation();
    const [role, setRole] = useState(ROLE.USER);
    const col = [
        {
            title: t('Name'),
            dataIndex: 'name'
        },
        {
            title: t('Email'),
            dataIndex: 'email'
        },
        {
            title: t('Role'),
            dataIndex: 'roleName'
        },
        {
            title: t('Action'),
            dataIndex: 'action'
        }
    ];
    const deleteAccount = async (id) => {
        try {
            const res = await axios.delete(
                route('api.users.destroy', {
                    user: id
                }),
                {
                    headers: {
                        'X-localization': i18n.language
                    }
                }
            );
            if (res.data.success) {
                alert('ok');
                location.pathname = location.pathname;
            }
        } catch (e) {
            alert('fail');
        }
    };

    const handleEditAccount = async (id) => {
        try {
            const res = await window.axios.put(
                route('admin.users.changeRole', {
                    user: id
                }),
                {
                    roleId: role
                }
            );
            location.pathname = location.pathname;
        } catch (e) {}
    };

    const data = [];
    users.map((e) => {
        data.push({
            name: e.name,
            email: e.email,
            roleName: t(e.role.name),
            action: (
                <div className=" flex">
                    <Modal
                        onOk={() => {
                            handleEditAccount(e.id);
                        }}
                        onCancel={() => {}}
                    >
                        <Modal.Trigger>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-3 rounded">
                                {t('ChangeRole')}
                            </button>
                        </Modal.Trigger>
                        <Modal.Content>
                            <div style={{ width: '90%' }}>
                                <Title name={t('ChangeRole')} />
                                <Label value={t('Role')} />
                                <Select
                                    defaultValue={e.role_id}
                                    style={{ width: '100%' }}
                                    onChange={(e) => {
                                        setRole(e);
                                    }}
                                    options={[
                                        {
                                            label: t('admin'),
                                            value: ROLE.ADMIN
                                        },
                                        {
                                            label: t('employee'),
                                            value: ROLE.EMPLOYEE
                                        },
                                        {
                                            label: t('user'),
                                            value: ROLE.USER
                                        }
                                    ]}
                                ></Select>
                            </div>
                        </Modal.Content>
                    </Modal>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-3 rounded"
                        onClick={() => {
                            if (confirm(t('ConfirmDeleteAccount')))
                                deleteAccount(e.id);
                        }}
                    >
                        {t('Delete')}
                    </button>
                </div>
            )
        });
    });
    return (
        <>
            <Navbar auth={auth} />
            <div className=" m-auto w-2/3 flex flex-col align-middle ">
                <Title name="ListAccount" />
                <div className=" my-5"></div>
                <div className=" d-flex justify-end my-2 mx-7">
                    <Link
                        href={route('admin.users.register')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {t('Add')}
                    </Link>
                </div>
                <Table columns={col} dataSource={data} />
            </div>
        </>
    );
}
