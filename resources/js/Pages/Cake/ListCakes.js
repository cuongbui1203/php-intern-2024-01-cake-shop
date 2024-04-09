import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Paginate from '@/Components/Paginate';
import Product from '@/Components/Product';
import Title from '@/Components/Title';
import { Link } from '@inertiajs/inertia-react';
import { ROLE } from '@/const/role';
import i18n from '@/i18n';

export default function ListCakes({ auth, filter = {} }) {
    const [t] = useTranslation();
    const [cakes, setCakes] = useState([]);
    const [current_page, setCurrent_page] = useState(1);
    const [total, setTotal] = useState(1);
    const [ListCakes, setListCakes] = useState(<></>);
    const [pageSize, setPageSize] = useState(4);
    const roleId = auth.user?.role_id ? auth.user.role_id : ROLE.USER;

    const handelChangePage = (pageNum, pageSize) => {
        setCurrent_page(pageNum);
        setPageSize(pageSize);
    };
    useEffect(() => {
        const loadData = async () => {
            const res = await axios.get(
                route('api.cakes.index'),
                {
                    params: {
                        page: current_page,
                        ...filter
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
    }, [current_page, total, pageSize, filter]);

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
        <div>
            <div
                style={{
                    marginLeft: '0px',
                    marginRight: '0px',
                    width: 'auto',
                    padding: '0px 100px'
                }}
            >
                <div className="py-5">
                    <div className="d-flex justify-content-end w-100">
                        {roleId === ROLE.ADMIN ? (
                            <Link
                                as="button"
                                href={route('admin.cakes.create')}
                                className="btn"
                            >
                                {t('Create')}
                            </Link>
                        ) : (
                            <></>
                        )}
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
        </div>
    );
}
