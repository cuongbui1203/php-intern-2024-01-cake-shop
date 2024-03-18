import { Button, Popover } from 'antd';
import React, { useEffect, useState } from 'react';

import CartItem from './CartItem';
import { useTranslation } from 'react-i18next';

const CartLayout = ({ children, total = 0 }) => {
    const [t] = useTranslation();
    return (
        <div className=" w-[350px] h-full px-3 mt-3">
            <div className="w-[100%] text-center text-xl font-extrabold uppercase">
                {t('Cart')}
            </div>
            <div className="w-[80%] mx-[10%] bg-slate-400 h-[2px] mb-2"> </div>
            <div className="flex flex-col space-y-2 mt-3 max-h-[370px] overflow-auto">
                {children}
            </div>
            <div className=" text-xl font-extrabold text-red-500 text-center mt-2">
                {t('TotalAmount')}:{' '}
                {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }).format(total)}
            </div>
            <div className=" text-right mt-4">
                <Button>{t('Order')}</Button>
            </div>
        </div>
    );
};

const Cart = ({ className }) => {
    const [t] = useTranslation();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);
    const [content, setContent] = useState(<></>);
    useEffect(() => {
        const loadData = async () => {
            const res = await axios.get(route('api.orders.index'));
            setData(res.data);
        };
        if (open) {
            loadData();
            setOpen(false);
        }
    }, [open]);

    useEffect(() => {
        if (data) {
            const temp = [];
            if (data.details.length != 0) {
                var total = 0;
                data.details.map((e) => {
                    total += parseInt(e.amount) * parseInt(e.cake.price);
                    temp.push(<CartItem item={e} />);
                });
                setContent(<CartLayout total={total}>{temp}</CartLayout>);
            } else {
                setContent(
                    <CartLayout>
                        <div className=" flex w-full justify-center">
                            {t('Nothing')}
                        </div>
                    </CartLayout>
                );
            }
        } else {
            setContent(<></>);
        }
    }, [data]);

    return (
        <div>
            <Popover content={content} trigger="click" placement="bottomRight">
                <Button className={className} onClick={() => setOpen(true)}>
                    <span>
                        <i className="fas fa-cart-plus"></i>
                    </span>
                </Button>
            </Popover>
        </div>
    );
};

export default Cart;
