import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import Paginate from '@/Components/Paginate';
import Product from '@/Components/Product';
import Title from '@/Components/Title';
import { Link } from '@inertiajs/inertia-react';

export default function ListCakes() {
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
            const res = await axios.get(route('api.cakes.all'), {
                params: {
                    page: current_page
                }
            });
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
        <>
            <div>
                <div className="py-5">
                    <Title title="Cakes" />
                    <div className="d-flex justify-content-end w-100">
                        <Link
                            as="button"
                            href={route('cakes.create')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                        >
                            {t('Create')}
                        </Link>
                    </div>
                    <div className="row">{ListCakes}</div>
                </div>
                <Paginate
                    page={current_page}
                    total={total}
                    pageSize={pageSize}
                    onChange={handelChangePage}
                />
            </div>
        </>
    );
}
