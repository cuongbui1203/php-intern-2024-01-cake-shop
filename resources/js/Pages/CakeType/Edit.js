import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Input as InputAntd } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import ValidationErrors from '@/Components/ValidationErrors';
import i18n from '@/i18n';

export default function Edit({ cakeType, auth }) {
    const [t] = useTranslation();
    const { TextArea } = InputAntd;
    const { data, setData } = useForm({
        name: cakeType.name,
        description: cakeType.description
    });
    const [errors, setErrors] = useState({});
    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        );
    };
    const submit = async (e) => {
        e.preventDefault();

        const res = await axios.put(
            route('api.cake-types.update', {
                cakeType: cakeType.id
            }),
            data,
            {
                headers: {
                    'X-localization': i18n.language
                }
            }
        );
        if (res.data.success) {
            setErrors({});
            alert(res.data.message);
            window.location.pathname = window.location.pathname;
        } else {
            setErrors(res.data.errors);
        }
    };
    return (
        <>
            <Navbar auth={auth} />
            <Link href={route('cake-types.index')} as="button" className="btn">
                {t('Back')}
            </Link>
            <Head title={t('Create')} />
            <ValidationErrors errors={errors} />
            <Title title={t('Create')} />
            <div style={{ width: '500px', margin: 'auto' }}>
                <div>
                    <Label forInput="name" value={t('Name')} />
                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="block w-full mt-1"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>
                <div>
                    <Label forInput="description" value={t('Description')} />
                    <TextArea
                        rows={4}
                        onChange={onHandleChange}
                        name="description"
                        value={data.description}
                        required
                    />
                </div>
                <div className="justify-center m-2 d-flex">
                    <button onClick={submit} className="btn">
                        {t('Update')}
                    </button>
                </div>
            </div>
        </>
    );
}
