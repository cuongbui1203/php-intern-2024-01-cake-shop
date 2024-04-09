import { Rate, Tooltip } from 'antd';
import React from 'react';
import img from '@/img/no_image.png';
import { useTranslation } from 'react-i18next';

export default function TopCakeItem({ cake }) {
    const { rating, name, pictures } = cake;
    const [t] = useTranslation();
    var imgLink =
        pictures.length != 0
            ? route('api.image.show', {
                  picture: pictures[0]
              })
            : img;

    return (
        <div className="flex w-full rounded-[1rem]  px-[7px]  space-x-7 shadow-md">
            <img className="h-[150px] w-[120px] rounded" src={imgLink} />
            <div className="py-[5px] space-y-4">
                <div className="text-2xl">{name}</div>
                <div>
                    <Tooltip
                        title={rating === 0 ? t('DontHaveRating') : rating}
                    >
                        <Rate allowHalf value={rating} disabled />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
