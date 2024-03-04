import React, { Component } from 'react';
import Button from '@/Components/Button';
import { Link } from '@inertiajs/inertia-react';
import { t } from 'i18next';

export default class Detail extends Component {
    render() {
        const { id, type, img, description, price, name } = this.props.cake;
        const inCart = false;
        return (
            <div className="container py-5">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                        <h1>{name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10 mx-auto col-md-6 my-3">
                        <img
                            src={
                                'https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg'
                            }
                            alt="product"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                        <h2>
                            {t('Cake Type')}: {type.name}
                        </h2>

                        <h4 className="text-blue">
                            <strong>
                                {t('Price')}: {price} <span>VND</span>
                            </strong>
                        </h4>
                        <p className="text-capitalize font-weight-bold mt-3 mb-0">
                            {t('InfoCake')}:
                        </p>
                        <p className="text-muted lead">{description}</p>
                        <div>
                            <Link href="/">
                                <Button>{t('Back To Cakes')}</Button>
                            </Link>
                            <Button
                                onClick={() => {
                                    console.log(id);
                                }}
                            >
                                {inCart ? t('inCart') : t('Add to card')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
