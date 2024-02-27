import { Link } from '@inertiajs/inertia-react';
import { Button, Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ListCakeType({ data }) {
    console.log(data);
    const [t] = useTranslation();
    const col = [
        {
            title: t('Name'),
            dataIndex: 'name'
        },
        {
            title: t('Description'),
            dataIndex: 'description'
        },
        {
            title: t('Quantity'),
            dataIndex: 'quantity'
        },
        {
            title: t('Action'),
            dataIndex: 'action'
        }
    ];
    const dataSource = [];
    data.map((e) => {
        dataSource.push({
            name: e.name,
            description: e.description,
            action: (
                <div style={{ width: 'fit-content', display: 'flex' }}>
                    <Link
                        href={route('cake-types.show', {
                            cakeType: e.id
                        })}
                        as="button"
                        className="ant-btn css-dev-only-do-not-override-1k979oh ant-btn-default"
                    >
                        <span>{t('View')}</span>
                    </Link>
                    <Button>
                        <span>{t('Edit')}</span>
                    </Button>
                    <Button>
                        <span>{t('Delete')}</span>
                    </Button>
                </div>
            ),
            quantity: e.cakes.length
        });
    });
    console.log(data);
    return <Table columns={col} dataSource={dataSource}></Table>;
}
