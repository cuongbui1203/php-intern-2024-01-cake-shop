import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Title from '@/Components/Title';
import i18n from '@/i18n';
import { Button, InputNumber } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AddCake({ id, name, onOk, onCancel }) {
    const [t] = useTranslation();
    const [amount, setAmount] = useState(0);
    const submit = async () => {
        const data = {
            amount: amount
        };
        const res = await axios.post(
            route('api.cakes.addCake', {
                cake: id
            }),
            data,
            {
                headers: {
                    'X-localization': i18n.language
                }
            }
        );
        onOk();
    };
    return (
        <div className=" h-[13rem]">
            <Title title={t('addCake')} />
            <div className="h-20 m-auto d-flex flex-column w-50">
                <div className="mb-[5px]">
                    {t('Name')}: {name}
                </div>
                <Label
                    forInput="amount"
                    value={t('AddAmount')}
                    className="m-2"
                />
                <InputNumber
                    name="amount"
                    value={amount}
                    className="block w-full m-2 mt-1"
                    isFocused={true}
                    min={0}
                    onChange={(e) => {
                        setAmount(e);
                    }}
                    required
                />
                <div className="flex justify-between w-full mt-2">
                    <button className="btn" onClick={submit}>
                        {t('ok')}
                    </button>
                    <button onClick={onCancel} className="btn-danger">
                        {t('Cancel')}
                    </button>
                </div>
            </div>
        </div>
    );
}
