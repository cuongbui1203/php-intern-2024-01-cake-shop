import React, { useEffect, useState } from 'react';
import Product from './Product'; // Assuming Product is a functional component
import Title from './Title';
import { useCookies } from 'react-cookie';

const ProductList = () => {
    // console.log(cakes);
    const [cakes, setCakes] = useState([]);
    const [cookies, setCookie] = useCookies();
    useEffect(() => {
        const getCakes = async () => {
            const res = await axios.get('/api/cakes', {
                headers: {
                    'X-XSRF-TOKEN': cookies['XSRF-TOKEN']
                }
            });
            setCakes(res.data.data);
        };
        getCakes();
    }, []);
    console.log(cakes);
    return (
        <div className="py-5">
            {/* <div className="container"> */}
            <Title name="our" title="products" />
            <div className="row">
                {cakes.map((cake) => (
                    <Product key={cake.id} product={cake} />
                ))}
            </div>
            {/* </div> */}
        </div>
    );
};

export default ProductList;
