import Label from '@/Components/Label';
import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import ValidationErrors from '@/Components/ValidationErrors';
import i18n from '@/i18n';
import { Input } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Create({ auth }) {
    const [t, i18n] = useTranslation();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});

    const handle = async () => {
        try {
            const data = {
                name: name
            };
            const res = await window.axios.post(
                route('api.ingredient.store'),
                data,
                {
                    headers: {
                        'X-Localization': i18n.language
                    }
                }
            );
            if (res.data.success) {
                alert(t('Success'));
            }
            setErrors({});
        } catch (e) {
            setErrors(e.response.data.errors);
        }
    };

    return (
        <>
            <Navbar auth={auth} />
            <div>
                <Title name={t('Create') + ' ' + t('Ingredient')} />
                <span className=" h-7"> </span>
                <div className="flex justify-center w-full">
                    <div className="w-80">
                        <ValidationErrors errors={errors} />
                        <div>
                            <Label value={'Name'} />
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center w-full my-3">
                            <button
                                onClick={() => handle()}
                                className="btn"
                            >
                                {t('ok')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
