import Modal from '@/Components/Modal';
import Title from '@/Components/Title';
import Authenticated from '@/Layouts/Authenticated';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Head } from '@inertiajs/inertia-react';
import { Timeline } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PendingIcon from '@mui/icons-material/Pending';
import OrderInfo from '@/Components/Cart/OrderInfo';
import { STATUS } from '@/const/status';

const formatDate = (date) => {
    return new Intl.DateTimeFormat('vi-VN', {
        timeStyle: 'short',
        dateStyle: 'short'
    }).format(new Date(date));
};

export default function History({ auth, orders }) {
    const [t] = useTranslation();
    const data = [];
    orders.map((order) => {
        const dotIcon =
            order.status_id === STATUS.DONE ? (
                <CheckCircleFilled className="text-lg" />
            ) : order.status_id === STATUS.CANCEL ||
              order.status_id === STATUS.FAIL ? (
                <CloseCircleFilled className="text-lg text-red-500" />
            ) : (
                <PendingIcon className="text-lg" />
            );
        data.push({
            label: (
                <div className="text-lg">{formatDate(order.created_at)}</div>
            ),
            children: (
                <div>
                    <div>{order.shipping_address}</div>
                    <Modal width={800}>
                        <Modal.Trigger>
                            <span className="text-[#007bff] hover:underline hover:text-[#0056b3] cursor-pointer w-fit">
                                {t('Detail')}
                            </span>
                        </Modal.Trigger>
                        <Modal.Content>
                            <OrderInfo order={order} />
                        </Modal.Content>
                    </Modal>
                </div>
            ),
            dot: dotIcon
        });
    });
    return (
        <Authenticated auth={auth}>
            <Head title={t('OrderHistory')} />
            <Title name={t('OrderHistory')} />
            <div className="flex flex-col justify-center w-full mt-[40px]">
                <Timeline mode="left" reverse items={data} />
            </div>
        </Authenticated>
    );
}
