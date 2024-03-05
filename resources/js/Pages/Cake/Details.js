import React, { useState } from 'react';
import Button from '@/Components/Button';
import { Link } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';
import img from '@/img/no_image.png';

const Detail = ({ cake }) => {
    const [t] = useTranslation();
    const [inCart, setInCart] = useState(false);

    const handleAddToCart = () => {
        setInCart(true); // Update button state after cart addition
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                    <h1>{cake.name}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    <img src={img} alt="product" className="img-fluid" />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <h2>
                        {t('Cake Type')}: {cake.type.name}
                    </h2>

                    <h4 className="text-blue">
                        <strong>
                            {t('Price')}: {cake.price} <span>VND</span>
                        </strong>
                    </h4>
                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                        {t('InfoCake')}:
                    </p>
                    <p className="text-muted lead">{cake.description}</p>
                    <div>
                        <Link href={route('cakes.edit', { cake: cake.id })}>
                            <Button>{t('Edit')}</Button>
                        </Link>
                        <Link href={route('cakes.addCake', { cake: cake.id })}>
                            <Button>{t('addNewCake')}</Button>
                        </Link>
                        <Link href="/">
                            <Button>{t('Back To Cakes')}</Button>
                        </Link>
                        <Button onClick={handleAddToCart}>
                            {inCart ? t('inCart') : t('Add to card')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
