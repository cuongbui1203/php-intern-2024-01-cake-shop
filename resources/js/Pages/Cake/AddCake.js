import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import { Button } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AddCake({ auth, cake }) {
    const [t] = useTranslation();
    const [amount, setAmount] = useState(cake.amount);
    const submit = async () => {
        const data = {
            amount: amount
        };
        const res = await axios.post(
            route('api.cakes.addCake', {
                cake: cake.id
            }),
            data
        );
    };
    return (
        <>
            <Navbar auth={auth} />
            <Title title={t('addCake')} />
            <div className="d-flex flex-column w-50 h-20 m-auto">
                <Label forInput="amount" value={t('Amount')} className="m-2" />
                <Input
                    type="text"
                    name="amount"
                    value={amount}
                    className="mt-1 block w-full m-2"
                    isFocused={true}
                    handleChange={(e) => {
                        setAmount(e.target.value);
                    }}
                    required
                />
                <Button onClick={submit} className="m-auto">
                    {t('ok')}
                </Button>
            </div>
        </>
    );
}
