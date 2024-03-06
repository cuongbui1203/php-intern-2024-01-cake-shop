import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import React, { useState } from 'react';
import { Input as InputAntd } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

export default function CreateCakeType({ auth }) {
    const [t] = useTranslation();
    const { TextArea } = InputAntd;
    const { data, setData } = useForm({
        name: '',
        description: ''
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
        try {
            const res = await axios.post(route('api.cake-types.store'), data, {
                headers: {
                    'X-localization': i18n.language
                }
            });
            setErrors({});
            alert(t('Create success'));
            window.location.pathname = '/cake-types/';
        } catch (e) {
            setErrors(e.response.data.errors);
        }
    };
    return (
        <>
            <Navbar auth={auth} />
            <Link
                href={route('cake-types.index')}
                as="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
            >
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
                        className="mt-1 block w-full"
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
                    />
                </div>
                <div className=" d-flex justify-center m-2">
                    <button
                        onClick={submit}
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                    >
                        {t('Create')}
                    </button>
                </div>
            </div>
        </>
    );
}
