import React, { useEffect, useState } from 'react';
import Product from './Product';
import Title from './Title';
import i18n from '@/i18n';

const ProductList = () => {
    const [cakes, setCakes] = useState([]);
    useEffect(() => {
        const getCakes = async () => {
            const res = await axios.get('/api/cakes', {
                headers: {
                    'X-localization': i18n.language
                }
            });
            setCakes(res.data.data);
        };
        getCakes();
    }, []);

    return (
        <div className="py-5">
            <Title title="Cakes" />
            <div className="row">
                {cakes.map((cake) => (
                    <Product key={cake.id} product={cake} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
