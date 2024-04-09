import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import img from '@/img/no_image.png';
import Navbar from '@/Components/Navbar';
import ListImage from '@/Components/ListImage';
import { Button, Image, Input, Modal, Rate, Table, Tooltip } from 'antd';
import { formatCurrencyVN } from '@/Components/FormatCurrency';
import clsx from 'clsx';

const Detail = ({ cake, auth, canReview }) => {
    const [t] = useTranslation();
    const [openModal, setOpenModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleComment = (e) => {
        console.log(e.target.value);
        setComment(e.target.value);
    };
    const handleChangeRating = (e) => {
        setRating(e);
    };
    const imgLink =
        cake.pictures.length != 0
            ? route('api.image.show', { picture: cake.pictures[0].id })
            : img;

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
                    <div className="mx-auto my-5 text-center col-10 text-slanted text-blue">
                        <h1>{cake.name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="mx-auto my-3 space-y-5 col-10 col-md-6">
                        <Image src={imgLink} alt="product" width={500} />
                        <ListImage image={cake.pictures} />
                    </div>
                    <div className="mx-auto my-3 col-10 col-md-6 text-capitalize">
                        <h2>
                            {t('Cake Type')}: {cake.type.name}
                        </h2>
                        <div className="flex items-center space-x-8">
                            <span className="text-3xl font-bold text-red-500">
                                {formatCurrencyVN(cake.price)}
                            </span>
                            <Tooltip title="2.8">
                                <Rate allowHalf value={2.8} disabled />
                            </Tooltip>
                        </div>
                        <p>
                            {t('TimeCook')}:{' '}
                            {t('Min', {
                                min: cake.cook_time
                            })}
                        </p>
                        <p className="mt-3 mb-0 text-capitalize font-weight-bold">
                            {t('InfoCake')}:
                        </p>
                        <p className="text-muted lead">{cake.description}</p>
                        <Table
                            pagination={{
                                pageSize: 4
                            }}
                            columns={col}
                            dataSource={data}
                        />
                        <button
                            onClick={() => setOpenModal(true)}
                            className={clsx(
                                !canReview && 'hidden',
                                'px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
                            )}
                        >
                            {t('Review')}
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                open={openModal}
                onOk={() => setOpenModal(false)}
                onCancel={() => setOpenModal(false)}
                title={t('Review')}
            >
                <div className="mt-2 space-y-3">
                    <Rate
                        className="text-[30px]"
                        allowHalf
                        onChange={handleChangeRating}
                        value={rating}
                    />
                    <div>
                        <label>{t('Comment')}</label>
                        <Input.TextArea
                            onChange={handleComment}
                            value={comment}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Detail;
