import React from 'react';
import styled from 'styled-components';
import { router } from '@inertiajs/react';
import img from '@/img/no_image.png';
import { useTranslation } from 'react-i18next';

const Product = ({ product }) => {
    const { id, name, price, pictures } = product;
    const inCart = false;
    const handleImageClick = () => {
        router.visit('cakes/' + id);
    };
    const [t] = useTranslation();
    var imgLink =
        pictures.length != 0
            ? route('api.image.show', {
                  picture: pictures[0]
              })
            : img;

    const handleAddToCart = async () => {
        const data = {
            cakeId: id,
            amount: 1
        };
        const res = await axios.post(route('api.orders.addItem'), data);
    };

    return (
        <ProductWrapper className="col-9 col-md-6 col-lg-3 my-3">
            <div className="card">
                <div className="img-container">
                    <img
                        src={imgLink}
                        alt="product"
                        className="card-img-top"
                        onClick={handleImageClick}
                    />
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
                        {t('price2', {
                            gia: price
                        })}
                    </h5>
                </div>
            </div>
        </ProductWrapper>
    );
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
        width: 200;
        height: 300;
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
