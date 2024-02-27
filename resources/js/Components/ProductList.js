import React, { useEffect, useState } from 'react';
import Product from './Product';
import Title from './Title';

const ProductList = () => {
    const [cakes, setCakes] = useState([]);
    useEffect(() => {
        const getCakes = async () => {
            const res = await axios.get('/api/cakes');
            setCakes(res.data.data);
        };
        getCakes();
    }, []);
    console.log(cakes);
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
