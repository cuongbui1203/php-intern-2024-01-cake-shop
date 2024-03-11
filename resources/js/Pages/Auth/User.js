import Navbar from '@/Components/Navbar';
import { Avatar, Button } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Link } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';
import Title from '@/Components/Title';

export default function User({ auth, user }) {
    const [t] = useTranslation();
    return (
        <>
            <Navbar auth={auth} />

            <div className=" w-100 h-100 d-flex justify-around text-2xl align-items-center flex-column m-auto">
                <Title title={t('UserInfo')} />
                <div className=" text-center mt-5 mb-2">
                    <Avatar size={150} icon={<UserOutlined />} />
                    <div>{user.name}</div>
                    <div>
                        {t('Role')}: {user.role.name}
                    </div>
                </div>
                <div className=" my-5 d-flex border-4 divide-x-[3px]">
                    <div className=" mx-2 divide-y-[3px]">
                        <div className=" my-2">Email:</div>
                        <div className=" my-2">{t('Address')}:</div>
                        <div className=" my-2">{t('Phone')}:</div>
                        <div className=" my-2">{t('Dob')}:</div>
                    </div>
                    <div className=" px-2 divide-y-[3px]">
                        <div className=" my-2">{user.name}</div>
                        <div className=" my-2">{user.address}</div>
                        <div className=" my-2">{user.phone}</div>
                        <div className=" my-2">{user.dob}</div>
                    </div>
                </div>
            </div>
            <div className=" text-center w-100">
                <Link
                    href={route('users.changePass', {
                        user: user.id
                    })}
                    className="mx-2"
                >
                    <Button>{t('changePass')}</Button>
                </Link>
                <Link className="mx-2">
                    <Button>{t('changeInfo')}</Button>
                </Link>
            </div>
        </>
    );
}
