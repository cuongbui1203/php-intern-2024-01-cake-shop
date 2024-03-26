import OrderInfo from '@/Components/Cart/OrderInfo';
import { formatCurrencyVN } from '@/Components/FormatCurrency';
import Modal from '@/Components/Modal';
import Title from '@/Components/Title';
import Authenticated from '@/Layouts/Authenticated';
import { STATUS } from '@/const/status';
import { Head } from '@inertiajs/inertia-react';
import { Select, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const otps = [
    {
        label: 'Accept',
        value: STATUS.ACCEPT
    },
    {
        label: 'Pending',
        value: STATUS.PENDING
    },
    {
        label: 'Shipping',
        value: STATUS.SHIPPING
    },
    {
        label: 'Done',
        value: STATUS.DONE
    },
    {
        label: 'Fail',
        value: STATUS.FAIL
    },
    {
        label: 'Cancel',
        value: STATUS.CANCEL
    }
];

const RenderStatusTag = ({ type, text }) => {
    const tagTypes = ['lime', 'green', 'gold', 'green', 'red', 'orange'];

    if (tagTypes[type - 1]) {
        return (
            <Tag color={tagTypes[type - 1]} value={type}>
                {text}
            </Tag>
        );
    }

    return (
        <Tag color="cyan" value={type}>
            {text}
        </Tag>
    );
};

const renderAction = (order) => {
    const [t] = useTranslation();
    const [status, setStatus] = useState(order.status_id);
    return (
        <Modal
            key={order.id}
            title={
                <div className=" capitalize font-bold text-[30px]">
                    {t('OrderDetail')}
                </div>
            }
            width={800}
            footer={
                <div className="flex justify-end w-full space-x-3">
                    <Modal
                        onOk={async () => {
                            const res = await axios.put(
                                route('api.orders.updateStatus', {
                                    order: order.id
                                }),
                                {
                                    status_id: status
                                }
                            );
                            if (res.data.success) {
                                location.pathname = location.pathname;
                            }
                        }}
                    >
                        <Modal.Trigger>
                            <button className="px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                {t('Action')}
                            </button>
                        </Modal.Trigger>
                        <Modal.Content>
                            <div>
                                <Title name={t('UpdateStatus')} />
                                <label className="mr-2">
                                    {t('SelectStatus')}
                                </label>
                                <Select
                                    options={otps}
                                    defaultValue={status}
                                    onChange={(e) => setStatus(e)}
                                />
                            </div>
                        </Modal.Content>
                    </Modal>
                    <button className="px-4 py-2 mx-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
                        {t('Cancel')}
                    </button>
                </div>
            }
        >
            <Modal.Trigger>
                <button className="px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    {t('View')}
                </button>
            </Modal.Trigger>
            <Modal.Content>
                <OrderInfo order={order} />
            </Modal.Content>
        </Modal>
    );
};

export default function ListOrder({ auth, orders }) {
    const [t] = useTranslation();
    const data = [];
    const cols = [
        {
            title: t('CustomerName'),
            dataIndex: 'customerName'
        },
        {
            title: t('TotalAmount'),
            dataIndex: 'totalAmount'
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            filters: [
                {
                    text: 'accept',
                    value: STATUS.ACCEPT
                },
                {
                    text: 'pending',
                    value: STATUS.PENDING
                },
                {
                    text: 'shipping',
                    value: STATUS.SHIPPING
                },
                {
                    text: 'done',
                    value: STATUS.DONE
                },
                {
                    text: 'fail',
                    value: STATUS.FAIL
                },
                {
                    text: 'cancel',
                    value: STATUS.CANCEL
                }
            ],
            filterMode: 'tree',
            // filterDropdown: <>test</>,
            onFilter: (value, record) => value === record.status.props.type
        },
        {
            title: t('Action'),
            dataIndex: 'action'
        }
    ];

    orders.map((e) => {
        var total = 0;
        e.details.map((detail) => {
            total += detail.amount * detail.cake.price;
        });
        data.push({
            key: e.id,
            customerName: e.user.name,
            totalAmount: formatCurrencyVN(total),
            status: <RenderStatusTag type={e.status_id} text={e.status.name} />,
            action: renderAction(e)
        });
    });

    return (
        <>
            <Authenticated auth={auth}>
                <Head title={t('ListOrders')} />
                <Title name={t('ListOrders')} />
                <Table
                    style={{
                        width: '80vw'
                    }}
                    columns={cols}
                    dataSource={data}
                />
            </Authenticated>
        </>
    );
}

export { RenderStatusTag };
