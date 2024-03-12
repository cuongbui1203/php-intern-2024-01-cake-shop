import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';
import img from '@/img/no_image.png';
import Navbar from '@/Components/Navbar';
import ListImage from '@/Components/ListImage';
import { Button, Image, Table } from 'antd';
import { ROLE } from '@/const/role';

const Detail = ({ cake, auth }) => {
    const [t] = useTranslation();
    const [inCart, setInCart] = useState(false);
    const roleId = auth.user?.role_id ? auth.user.role_id : ROLE.USER;
    const imgLink =
        cake.pictures.length != 0
            ? route('api.image.show', { picture: cake.pictures[0].id })
            : img;

    const handleAddToCart = () => {
        setInCart(true); // Update button state after cart addition
    };
    const col = [
        {
            title: t('Ingredient'),
            dataIndex: 'name'
        }
    ];

    const data = [];
    cake.ingredients.map((e) => {
        data.push({
            name: e.name
        });
    });

    return (
        <>
            <Navbar auth={auth} />
            <div className="container py-5">
                <Button
                    onClick={() => {
                        location.pathname = '/';
                    }}
                >
                    {t('Back')}
                </Button>
                <div className="row">
                    <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                        <h1>{cake.name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10 mx-auto col-md-6 my-3">
                        <Image src={imgLink} alt="product" width={500} />
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
                        <p>
                            {t('TimeCook')}:{' '}
                            {t('Min', {
                                min: cake.cook_time
                            })}
                        </p>
                        <Table columns={col} dataSource={data} />
                    </div>
                </div>
                <ListImage image={cake.pictures} />
                {roleId === ROLE.USER ? (
                    <div className="d-flex w-100 justify-content-center">
                        <Link>
                            <Button
                                onClick={handleAddToCart}
                                className=" mr-2 ml-2"
                            >
                                {inCart ? t('inCart') : t('Add to card')}
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default Detail;
