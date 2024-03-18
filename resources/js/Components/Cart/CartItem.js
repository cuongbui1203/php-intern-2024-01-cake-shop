import { Button, Image, InputNumber } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import img from '@/img/no_image.png';
import { DeleteFilled } from '@ant-design/icons';

export default function CartItem({ item }) {
    const [t] = useTranslation();
    const { amount, cake } = item;
    const { name, price, pictures } = cake;
    const imgLink =
        cake.pictures.length != 0
            ? route('api.image.show', { picture: pictures[0].id })
            : img;

    return (
        <div className="flex space-x-3 w-[100%]">
            <div>
                <Image src={imgLink} width={80} />
            </div>
            <div className=" w-[80%]">
                <div className=" text-lg">
                    {t('Name')}: {name}
                </div>
                <div className=" text-base text-red-500 font-bold">
                    {t('Price')}:{' '}
                    {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    }).format(price)}
                </div>
                <div>
                    {t('Amount')}: {amount}
                </div>
                <div className=" flex space-x-2 justify-content-end">
                    <Button
                        style={{
                            backgroundColor: 'red'
                        }}
                    >
                        <DeleteFilled
                            className=" relative text-white"
                            style={{
                                paddingBottom: '2px',
                                top: '-2px',
                                fontSize: '1,25rem'
                            }}
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
}
