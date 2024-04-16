import React, { useEffect, useState } from 'react';
import { Button, Select, Table, Upload, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import Label from '@/Components/Label';
import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import ValidationErrors from '@/Components/ValidationErrors';
import i18n from '@/i18n';
import { Head } from '@inertiajs/inertia-react';

export default function Edit({ auth, cake }) {
    const [t] = useTranslation();
    const [errors, setErrors] = useState({});
    const [cakeTypes, setCakeTypes] = useState([]);
    const [cakeTypeOptions, setCakeTypeOptions] = useState([]);
    const [name, setName] = useState(cake.name);
    const [desc, setDesc] = useState(cake.description);
    const [idCakeType, setIdCakeType] = useState(cake.type_id);
    const [price, setPrice] = useState(parseInt(cake.price));
    const [cookTime, setCookTime] = useState(parseInt(cake.cook_time));
    const [ingredients, setIngredients] = useState([]);
    const data = [];
    cake.ingredients.map((e) => {
        data.push(e.id);
    });
    const [ingredientSelected, setIngredientSelected] = useState(
        JSON.stringify(data)
    );
    const [defaultIngredient, setDefaultIngredient] = useState(data);

    const handleChange = (value) => {
        setIngredientSelected(JSON.stringify(value));
    };
    const { TextArea } = Input;
    const col = [
        {
            title: t('Picture'),
            dataIndex: 'image'
        },
        {
            title: t('Action'),
            dataIndex: 'action'
        }
    ];
    const handelDeleteImg = async (id) => {
        const res = await axios.delete(
            route('api.image.destroy', {
                picture: id
            }),
            {
                headers: {
                    'X-localization': i18n.language
                }
            }
        );
        location.pathname = location.pathname;
    };
    const dataSource = [];
    cake.pictures?.map((e) => {
        dataSource.push({
            image: (
                <>
                    <img
                        src={route('api.image.show', {
                            picture: e.id
                        })}
                        width={500}
                    />
                </>
            ),
            action: (
                <>
                    <Button danger onClick={() => handelDeleteImg(e.id)}>
                        {t('Remove')}
                    </Button>
                </>
            )
        });
    });

    const submit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                name: name,
                description: desc,
                idCakeType: idCakeType,
                price: price,
                cookTime: cookTime,
                ingredients: ingredientSelected
            };

            const res = await axios.put(
                route('api.cakes.update', {
                    cake: cake.id
                }),
                data,
                {
                    headers: {
                        'X-localization': i18n.language
                    }
                }
            );
            setErrors({});
            alert(t('Update success'));
            window.location.pathname = window.location.pathname;
        } catch (e) {
            setErrors(e.response.data.errors);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(route('api.cake-types.index'));
                const res2 = await axios.get(route('api.ingredient.index'));

                const data = [];
                res2.data.data.map((e) => {
                    data.push({
                        label: e.name,
                        value: e.id
                    });
                });

                setIngredients(data);
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
            <Head title="Edit cake" />
            <ValidationErrors errors={errors} />
            <Title title={t('Edit')} />
            <form style={{ width: '500px', margin: 'auto' }}>
                <div>
                    <Label forInput="name" value={t('Name')} />
                    <Input
                        type="text"
                        name="name"
                        value={name}
                        className="block w-full mt-1"
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
                        className="block w-full mt-1"
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
                        className="block w-full mt-1"
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
                        className="block w-full mt-1"
                        onChange={(e) => {
                            setPrice(parseInt(e.value));
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
                        className="block w-full mt-1"
                        onChange={(e) => {
                            setCookTime(parseInt(e.value));
                        }}
                        required
                    />
                </div>
                <div>
                    <Label forInput="ingredient" value={t('Ingredient')} />
                    <Select
                        mode="multiple"
                        size={'middle'}
                        className="block w-full mt-1"
                        placeholder={t('PleaseSelect') + ' ...'}
                        defaultValue={defaultIngredient}
                        onChange={handleChange}
                        style={{
                            width: '100%'
                        }}
                        options={ingredients}
                    />
                </div>
                <div className="mt-5">
                    <Label>{t('Images')}</Label>
                    <div className="d-flex">
                        <Upload
                            name="image"
                            action={route('api.image.store', {
                                cakeId: cake.id
                            })}
                        >
                            <Button>{t('Upload')}</Button>
                        </Upload>
                    </div>
                    <div>
                        <Table
                            columns={col}
                            dataSource={dataSource}
                            style={{ maxHeight: '500px' }}
                        />
                    </div>
                </div>
                <div className="justify-center m-2 d-flex">
                    <button onClick={submit} className="btn">
                        {t('Edit')}
                    </button>
                </div>
            </form>
        </>
    );
}
