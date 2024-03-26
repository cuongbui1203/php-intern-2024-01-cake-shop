import Paginate from '@/Components/Paginate';
import Product from '@/Components/Product';
import Title from '@/Components/Title'
import Authenticated from '@/Layouts/Authenticated'
import i18n from '@/i18n';
import { Head } from '@inertiajs/inertia-react';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function ListCakesByType({cakeType,auth}) {
  const [t] = useTranslation();
    const [cakes, setCakes] = useState([]);
    const [current_page, setCurrent_page] = useState(1);
    const [total, setTotal] = useState(1);
    const [ListCakes, setListCakes] = useState(<></>);
    const [pageSize, setPageSize] = useState(4);
    const handelChangePage = (pageNum, pageSize) => {
        setCurrent_page(pageNum);
        setPageSize(pageSize);
    };
    useEffect(() => {
        const loadData = async () => {
            const res = await axios.get(
                route('api.cakes.getCakeByType',{
                  cakeType:cakeType.id
                }),
                {
                    params: {
                        page: current_page
                    }
                },
                {
                    headers: {
                        'X-localization': i18n.language
                    }
                }
            );
            setCakes(res.data.data);
            setTotal(res.data.total);
            setPageSize(res.data.pageSize);
        };
        loadData();
    }, [current_page, total, pageSize]);

    const RenderData = () => {
        if (cakes.length != 0) {
            setListCakes(
                <>
                    {cakes.map((cake) => {
                        return <Product key={cake.id} product={cake} />;
                    })}
                </>
            );
            return;
        }
        setListCakes(<>{t('Not Found')}</>);
        return;
    };
    useEffect(() => {
        RenderData();
    }, [cakes]);

    return (
        <Authenticated auth={auth}>
        <Head title={cakeType.name} />
            <div
                style={{
                    marginLeft: '0px',
                    marginRight: '0px',
                    width: 'auto',
                    padding: '0px 100px'
                }}
            >
                <div className="py-5">
                    <Title title={cakeType.name} />
                    <div className="row">{ListCakes}</div>
                </div>
                <Paginate
                    page={current_page}
                    total={total}
                    pageSize={pageSize}
                    onChange={handelChangePage}
                />
            </div>
        </Authenticated>
    );
}
