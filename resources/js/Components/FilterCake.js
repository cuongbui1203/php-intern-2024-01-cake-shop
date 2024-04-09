import { Checkbox, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { formatCurrencyVN } from './FormatCurrency';
import Label from './Label';
import { useTranslation } from 'react-i18next';

export default function FilterCake({ onChangeData = () => {} }) {
    const [cakeType, setCakeType] = useState([]);
    const [checkedList, setCheckedList] = useState([]);
    const [value1, setValue1] = useState(1);
    const [t] = useTranslation();
    const priceOpt = [
        {
            label: formatCurrencyVN(0) + ' - ' + formatCurrencyVN(100000),
            value: 1
        },
        {
            label: formatCurrencyVN(100000) + ' - ' + formatCurrencyVN(200000),
            value: 2
        },
        {
            label: formatCurrencyVN(200000) + ' - ' + formatCurrencyVN(300000),
            value: 3
        },
        {
            label: formatCurrencyVN(300000) + ' - ' + formatCurrencyVN(400000),
            value: 4
        },
        {
            label: formatCurrencyVN(400000) + ' - ' + formatCurrencyVN(500000),
            value: 5
        },
        {
            label: formatCurrencyVN(500000) + ' + ',
            value: 6
        }
    ];
    useEffect(() => {
        const loadData = async () => {
            const res = await axios.get(route('api.cake-types.index'));
            const data = [];
            res.data.data.map((e) => {
                data.push({
                    label: e.name,
                    value: e.id
                });
            });
            setCakeType(data);
        };
        loadData();
    }, []);
    const onChange = (list) => {
        setCheckedList(list);
    };
    const onChange1 = ({ target: { value } }) => {
        setValue1(value);
    };
    const handle = () => {
        const data = {
            cakeType: JSON.stringify(checkedList),
            min: (value1 - 1) * 100000,
            max: value1 === 6 ? 999999999 : value1 * 100000
        };

        onChangeData(data);
    };
    return (
        <div className="flex flex-col items-center">
            <div>
                <Label value={'Cake Types'} />
                <Checkbox.Group
                    options={cakeType}
                    onChange={onChange}
                    value={checkedList}
                />
            </div>
            <div>
                <Label value={'Price'} />
                <Radio.Group
                    options={priceOpt}
                    onChange={onChange1}
                    value={value1}
                />
            </div>
            <div className="flex justify-center w-full my-2">
                <button
                    onClick={handle}
                    className="px-4 py-2 ml-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                    {t('ok')}
                </button>
            </div>
        </div>
    );
}
