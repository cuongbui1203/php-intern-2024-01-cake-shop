import React, { Component } from 'react';
import Button, { ButtonContainer } from '@/Components/Button';
import { Link } from '@inertiajs/inertia-react';
// import { createGlobalStyle } from 'styled-components';
// import { ProductConsumer } from '../context';
// import { Link } from 'react-router-dom';

export default class Detail extends Component {
    render() {
        const { id, type, img, description, price, name } = this.props.cake;
        console.log(this.props.cake);
        const inCart = false;
        return (
            <div className="container py-5">
                {/* title */}
                <div className="row">
                    <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                        <h1>{name}</h1>
                    </div>
                </div>
                {/* end title */}
                {/* product info */}
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
                    {/* product text */}
                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                        <h2>type: {type.name}</h2>

                        <h4 className="text-blue">
                            <strong>
                                price: {price} <span>VND</span>
                            </strong>
                        </h4>
                        <p className="text-capitalize font-weight-bold mt-3 mb-0">
                            some info about product:
                        </p>
                        <p className="text-muted lead">{description}</p>
                        {/* buttons */}
                        <div>
                            <Link href="/">
                                <Button>back to products</Button>
                            </Link>
                            <Button
                                // cart
                                // disable={inCart ? true : false}
                                onClick={() => {
                                    console.log(id);
                                }}
                            >
                                {inCart ? 'inCart' : 'add to cart'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            // )
            // }}
            // </ProductConsumer>
        );
    }
}
