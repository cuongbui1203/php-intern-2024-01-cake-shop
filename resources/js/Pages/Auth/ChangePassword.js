import Label from '@/Components/Label';
import Title from '@/Components/Title';
import ValidationErrors from '@/Components/ValidationErrors';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import Navbar from '@/Components/Navbar';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default function ChangePassword({ auth }) {
    const [errors, setErrors] = useState({});
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [t] = useTranslation();

    const handle = async () => {
        try {
            const data = {
                oldPassword: currentPass,
                password: newPass,
                password_confirmation: confirmPass
            };
            const res = await axios.post(
                route('api.users.updatePassword', {
                    user: auth.user.id
                }),
                data,
                {
                    headers: {
                        'X-localization': i18n.language
                    }
                }
            );
            if (res.data.success) {
                alert(t('ChangePassSuccess'));
                location.pathname = '/users/' + auth.user.id;
            }
        } catch (e) {
            setErrors(e.response.data.errors);
        }
    };

    return (
        <>
            <Navbar auth={auth} />
            <div className=" hidden lg:h-[10vh] lg:block"></div>
            <div className="mx-auto w-fit m-auto">
                <div className=" lg:h-[20vh] flex flex-col justify-between">
                    <Title name={'ChangePass'} />
                    <ValidationErrors errors={errors} />
                </div>
                <div>
                    <div className=" my-2">
                        <Label
                            forInput="currentPass"
                            value={t('currentPass')}
                        />
                        <Input.Password
                            className=" py-2 mt-1 w-full rounded"
                            placeholder={t('currentPass')}
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                            value={currentPass}
                            onChange={(e) => setCurrentPass(e.target.value)}
                        />
                    </div>
                    <div className=" my-2">
                        <Label forInput="newPass" value={t('newPass')} />
                        <Input.Password
                            className=" py-2 mt-1 w-full rounded"
                            placeholder={t('newPass')}
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                    </div>
                    <div className=" my-2">
                        <Label forInput="confirmPass" value={'confirmPass'} />
                        <Input.Password
                            placeholder={t('confirmPass')}
                            name="confirmPass"
                            className=" py-2 mt-1 w-full rounded"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                        ></Input.Password>
                    </div>
                    <div className="w-100 text-center my-4">
                        <Button onClick={handle}>{t('Confirm')}</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
