import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { router } from '@inertiajs/react';

const Product = ({ product }) => {
    const { id, name, price } = product;
    const inCart = false;
    const handleImageClick = () => {
        console.log('cleic2');
        // Choose either Inertia.js or React Router for navigation
        // page.setPage('cakes.show', { cake: id }); // Using Inertia.js
        router.visit('cakes/' + id);
    };

    const handleAddToCart = () => {
        // Implement your cart-related logic here
        console.log('click');
    };
    console.log(product);
    return (
        <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
            <div className="card">
                <div className="img-container p-5" onClick={handleImageClick}>
                    <img
                        src="https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg"
                        alt="product"
                        className="card-img-top"
                        // onClick={handleImageClick}
                    />
                    {/* <div>{name}</div> */}
                    <button
                        className="cart-btn"
                        disabled={inCart}
                        onClick={handleAddToCart}
                    >
                        {inCart ? (
                            <p className="text-capitalize mb-0">in cart</p>
                        ) : (
                            <i className="fas fa-cart-plus"></i>
                        )}
                    </button>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <p className="align-seft-center mb-0">{name}</p>
                    <h5 className="text-blue font-italic mb-0">
                        <span className="mr-1">$</span>
                        {price}
                    </h5>
                </div>
            </div>
        </ProductWrapper>
    );
};

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inCart: PropTypes.bool.isRequired
    }).isRequired
};

// ... ProductWrapper styled component definition
const ProductWrapper = styled.div`
    .card {
        border-color: transparent;
        transition: all 0.5s linear;
    }
    .card-footer {
        background: transparent;
        border-top: transparent;
        transition: all 0.5s linear;
    }
    &:hover {
        .card {
            border: 0.04rem solid rgba(0, 0, 0, 0.2);
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
        }
        .card-footer {
            background: rgba(247, 247, 247);
        }
    }
    .img-container {
        position: relative;
        overflow: hidden;
    }
    .card-img-top {
        transition: all 0.5s linear;
    }
    .img-container:hover .card-img-top {
        transform: scale(1.2);
    }
    .cart-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0.2rem 0.4rem;
        background: var(--lightBlue);
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: 0.5rem 0 0 0;
        transform: translate(100%, 100%);
        transition: all 0.5s linear;
    }
    .img-container:hover .cart-btn {
        transform: translate(0, 0);
    }
    .cart-btn:hover {
        color: var(--mainBlue);
        cursor: pointer;
    }
`;
export default Product;
