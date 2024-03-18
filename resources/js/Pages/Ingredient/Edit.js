import Label from '@/Components/Label';
import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import { Input } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Edit({ auth, ingredient }) {
    const [name, setName] = useState(ingredient.name);
    const [t] = useTranslation();

    const handle = async () => {
        try {
            const data = {
                name: name
            };
            const res = await window.axios.put(
                route('api.ingredient.update', {
                    ingredient: ingredient.id
                }),
                data
            );

            if (res.data.success) {
                alert(t('Success'));
                location.pathname = location.pathname;
            }
        } catch (e) {}
    };

    return (
        <>
            <Navbar auth={auth} />
            <>
                <Title name={'Edit'} />
                <div className=" flex justify-center">
                    <div className=" w-80">
                        <div className=" my-4">
                            <Label value={'Name'} />
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className=" flex justify-center">
                            <button
                                onClick={handle}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                            >
                                {t('ok')}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}
