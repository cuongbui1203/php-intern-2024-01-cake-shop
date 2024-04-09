import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import img from '@/img/no_image.png';
import Navbar from '@/Components/Navbar';
import ListImage from '@/Components/ListImage';
import { Button, Image, Input, Modal, Rate, Table, Tooltip } from 'antd';
import { formatCurrencyVN } from '@/Components/FormatCurrency';
import clsx from 'clsx';
import { useNotification } from '@/Components/Notification';
import { CloseCircleFilled } from '@ant-design/icons';
import i18n from '@/i18n';
import Comments from '@/Components/Comments';

const Detail = ({ cake, auth, canReview }) => {
    const [t] = useTranslation();
    const [api, pushNoti] = useNotification();
    const [openModal, setOpenModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
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
            key: e.id,
            name: e.name
        });
    });
    const handleComment = (e) => {
        setComment(e.target.value);
    };
    const handleChangeRating = (e) => {
        setRating(e);
    };
    const handleReview = async () => {
        const data = {
            rating: rating,
            comment: comment
        };
        try {
            const res = await axios.post(
                route('api.cakes.review', {
                    cake: cake.id
                }),
                data,
                {
                    headers: {
                        'X-localization': i18n.language
                    }
                }
            );
            pushNoti(t('Success', t('SendReviewSuccess')));
            location.pathname = location.pathname;
        } catch (e) {
            pushNoti(
                t('Error'),
                e.response.data.errors,
                <CloseCircleFilled className="text-red-500" />
            );
        }
    };
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
                            <Tooltip
                                title={
                                    cake.rating === 0
                                        ? t('DontHaveRating')
                                        : cake.rating
                                }
                            >
                                <Rate allowHalf value={cake.rating} disabled />
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
                    </div>
                </div>
                <div className="flex flex-col items-end w-full">
                    <div
                        className={clsx(
                            'flex w-[500px]',
                            canReview && 'justify-between',
                            !canReview && 'justify-end'
                        )}
                    >
                        <button
                            onClick={() => setOpenModal(true)}
                            className={clsx(!canReview && 'hidden', 'btn')}
                        >
                            {t('Review')}
                        </button>
                        <div>{t('Comments')}</div>
                    </div>
                    <Comments comments={cake.reviews ?? []} />
                </div>
            </div>
            <Modal
                open={openModal}
                onOk={handleReview}
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
                            rows={4}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Detail;
