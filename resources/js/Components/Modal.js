import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/inertia-react';
import Button from './Button';

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    #modal {
        background: var(--mainWhite);
    }
`;

const Modal = () => {
    const [t] = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(modalOpen);
    }, [modalOpen]);

    if (!isOpen) {
        return null;
    }

    const { img, title, price } = useContext(ProductConsumer).modalProduct;

    return (
        <ModalContainer>
            <div className="container">
                <div className="row">
                    <div
                        id="modal"
                        className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
                    >
                        <h5>{t('ItemAddedCard')}</h5>
                        <img src={img} alt="" className="img-fluid" />
                        <h5>{title}</h5>
                        <h5 className="text-muted">
                            {t('Price')}: ${price}
                        </h5>
                        <Link to="/">
                            <Button onClick={closeModal}>store</Button>
                        </Link>
                        <Link to="/cart">
                            <Button cart onClick={closeModal}>
                                go to cart
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </ModalContainer>
    );
};

export default Modal;
