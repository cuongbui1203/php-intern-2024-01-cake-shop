import React, { useEffect, useState } from 'react';
import { Popover, Badge } from 'antd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTranslation } from 'react-i18next';
import { useAdminNotification } from './Hooks/Hook';
import clsx from 'clsx';
import NotificationItem from './NotificationItem';
import { removeAllNoti, seenAllNoti } from './Actions/action';

export default function Notification() {
    const [t] = useTranslation();
    const [noti, dispatch] = useAdminNotification();
    const [items, setItems] = useState([]);
    const [countNewNoti, setCountNewNoti] = useState(0);
    useEffect(() => {
        const tem = [];
        var count = 0;
        noti.noti.map((e) => {
            tem.push({ ...e });
            count += e.seen ? 0 : 1;
        });
        setItems(tem);
        setCountNewNoti(count);
    }, [noti]);
    console.log(items);
    return (
        <div>
            <Popover
                content={
                    <>
                        <div className="flex justify-center w-full">
                            {items.length === 0 ? (
                                <div className="my-[15px] mx-[60px]">
                                    {t('NoNoti')}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    {items.map((e) => {
                                        return (
                                            <NotificationItem
                                                key={e.id}
                                                item={e}
                                            />
                                        );
                                    })}
                                    <button
                                        onClick={() => {
                                            dispatch(removeAllNoti());
                                        }}
                                        className="btn w-fit"
                                    >
                                        {t('Clear')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                }
                title={
                    <>
                        <div className="flex justify-center">
                            <span className="text-2xl">
                                {t('NewNotifications')}
                            </span>
                        </div>
                        <p
                            onClick={() => {
                                dispatch(seenAllNoti());
                            }}
                            className={clsx(
                                'cursor-default hover:text-blue-700 hover:cursor-pointer text-right',
                                countNewNoti === 0 && 'hidden'
                            )}
                        >
                            {t('SeenAll')}
                        </p>
                    </>
                }
                trigger="click"
            >
                <div className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-black transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none hover:cursor-pointer">
                    <Badge count={countNewNoti}>
                        <NotificationsIcon />
                    </Badge>
                </div>
            </Popover>
        </div>
    );
}
