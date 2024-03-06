import Label from '@/Components/Label';
import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head } from '@inertiajs/inertia-react';
import { Select, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

export default function Create({ auth }) {
    const { TextArea } = Input;
    const [t] = useTranslation();
    const [errors, setErrors] = useState({});
    const [cakeTypes, setCakeTypes] = useState([]);
    const [cakeTypeOptions, setCakeTypeOptions] = useState([]);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [idCakeType, setIdCakeType] = useState(1);
    const [price, setPrice] = useState(0);
    const [cookTime, setCookTime] = useState(0);
    const submit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                name: name,
                description: desc,
                idCakeType: idCakeType,
                price: price,
                cookTime: cookTime
            };
            const res = await axios.post(route('api.cakes.store'), data, {
                headers: {
                    'X-localization': i18n.language
                }
            });
            setErrors({});
            alert(t('Create success'));
            window.location.pathname = '/';
        } catch (e) {
            setErrors(e.response.data.errors);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(route('api.cake-types.index'), {
                    headers: {
                        'X-localization': i18n.language
                    }
                });
                setCakeTypes(res.data.data);
            } catch (e) {}
        };
        loadData();
    }, []);
    useEffect(() => {
        if (cakeTypes.length === 0) return;
        const tem = [];
        cakeTypes.map((e) => {
            tem.push({
                value: e.id,
                label: e.name
            });
        });
        setCakeTypeOptions(tem);
    }, [cakeTypes]);
    return (
        <>
            <Navbar auth={auth} />
            <Head title="create cake" />
            <ValidationErrors errors={errors} />
            <Title title={t('Create')} />
            <form style={{ width: '500px', margin: 'auto' }}>
                <div>
                    <Label forInput="name" value={t('Name')} />
                    <Input
                        type="text"
                        name="name"
                        value={name}
                        className="mt-1 block w-full rounded"
                        isFocused={true}
                        onChange={(e) => {
                            setName(e.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <Label forInput="description" value={t('Description')} />
                    <TextArea
                        type="text"
                        name="description"
                        value={desc}
                        cols={5}
                        style={{ height: '100px' }}
                        className="mt-1 block w-full rounded"
                        onChange={(e) => {
                            setDesc(e.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <Label forInput="cakeType" value={t('Cake Type')} />
                    <Select
                        name="cakeType"
                        className="mt-1 block w-full rounded"
                        onChange={(e) => {
                            setIdCakeType(e);
                        }}
                        defaultValue={idCakeType}
                        options={cakeTypeOptions}
                        required
                    />
                </div>
                <div>
                    <Label forInput="price" value={t('Price')} />
                    <Input
                        type="number"
                        name="price"
                        value={price}
                        className="mt-1 block w-full rounded"
                        onChange={(e) => {
                            setPrice(e.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <Label forInput="cookTime" value={t('TimeCook')} />
                    <Input
                        type="number"
                        name="cookTime"
                        value={cookTime}
                        className="mt-1 block w-full rounded"
                        onChange={(e) => {
                            setCookTime(e.value);
                        }}
                        required
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
            </form>
        </>
    );
}
