import { Image } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ListImage({ image }) {
    const [t] = useTranslation();
    return (
        <div className=' max-w-[600px]'>
            {image?.length != 0 ? <p>{t('Images')}:</p> : <></>}
            <Image.PreviewGroup>
            <div
            style={{
                    display: 'flex',
                    overflow: 'auto'
                }}
                >
                {image?.map((e) => {
                    return (
                        <>
                            <div
                                style={{
                                    margin: '0px 10px'
                                }}
                            >
                                <Image
                                    width={200}
                                    height={200}
                                    src={route('api.image.show', {
                                        picture: e.id
                                    })}
                                />
                            </div>
                        </>
                    );
                })}
                </div>
            </Image.PreviewGroup>
        </div>
    );
}
