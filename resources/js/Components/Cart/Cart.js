import React, { useState } from 'react';
import Title from '../Title';
import CartColumns from './CartColumn';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from './CartTotals';

const Cart = () => {
    const [cart, setCart] = useState([]); // Use useState for state management

    useEffect(() => {
        // If cart data retrieval logic is necessary
        // fetchCartData().then(data => setCart(data));
    }, []);

    const conditionalRendering = () => {
        if (cart.length > 0) {
            return (
                <React.Fragment>
                    <Title name="your" title="cart" />
                    <CartColumns />
                    <CartList value={{ cart }} /> // Pass cart directly to
                    CartList
                    <CartTotals value={{ cart }} history="" />
                </React.Fragment>
            );
        } else {
            return <EmptyCart />;
        }
    };

    return (
        <section>
            <ProductConsumer>
                {(value) => conditionalRendering(value)}
            </ProductConsumer>
        </section>
    );
};

export default Cart;
