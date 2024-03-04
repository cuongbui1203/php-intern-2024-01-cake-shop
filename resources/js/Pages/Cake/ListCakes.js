import React, { useEffect, useState } from 'react';
import Paginate from '@/Components/Paginate';
import Product from '@/Components/Product';
import Title from '@/Components/Title';
import axios from 'axios';

export default function ListCakes() {
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
                    page: current_page,
                    pageSize: pageSize
                }
            });
            setCakes(res.data.data);
            console.log(res.data);
            // setCurrent_page()
            setTotal(res.data.total);
        };
        loadData();
    }, [current_page]);

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
        setListCakes(<>not found</>);
        return;
    };
    useEffect(() => {
        RenderData();
    }, [cakes]);
    console.log(cakes);
    return (
        <div>
            <div className="py-5">
                <Title title="Cakes" />
                <div className="row">{ListCakes}</div>
            </div>
            <Paginate
                page={current_page}
                total={total}
                pageSize={pageSize}
                onChange={handelChangePage}
            />
        </div>
    );
}
