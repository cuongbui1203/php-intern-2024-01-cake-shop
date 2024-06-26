import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'antd';

export default function Register() {
    const [t] = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        dob: '',
        phone: '',
        password: '',
        address: '',
        password_confirmation: '',
        promotion: false
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <Guest>
            <Head title="Register" />

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div>
                    <Label forInput="name" value="Name" />

                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="block w-full mt-1"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>
                <div>
                    <Label forInput="dob" value="Dob" />

                    <Input
                        type="date"
                        name="dob"
                        value={data.dob}
                        className="block w-full mt-1"
                        autoComplete="dob"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>
                <div>
                    <Label forInput="phone" value="Phone" />

                    <Input
                        type="text"
                        name="phone"
                        value={data.phone}
                        className="block w-full mt-1"
                        autoComplete="phone"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="address" value="Address" />

                    <Input
                        type="text"
                        name="address"
                        value={data.address}
                        className="block w-full mt-1"
                        autoComplete="address"
                        handleChange={onHandleChange}
                        required
                    />
                </div>
                <div className="mt-4">
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label
                        forInput="password_confirmation"
                        value="Confirm Password"
                    />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="block w-full mt-1"
                        handleChange={onHandleChange}
                        required
                    />
                </div>
                <div className="mt-4">
                    <Checkbox
                        onChange={(e) => {
                            setData('promotion', e.target.checked);
                        }}
                    >
                        {t('promo?')}
                    </Checkbox>
                </div>
                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        {t('Already registered?')}
                    </Link>

                    <Button className="ml-4" processing={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
