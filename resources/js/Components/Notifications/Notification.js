import React from 'react';
import { Popover, Badge } from 'antd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTranslation } from 'react-i18next';
import NotificationItem from './NotificationItem';
import { rating } from '@material-tailwind/react';
import Comments from '../Comments';

export default function Notification() {
    const [t] = useTranslation();

    return (
        <div>
            <Popover
                content={
                    <>
                        <div>
                            <NotificationItem
                                item={{
                                    cakeName: 'cake',
                                    reviewer: {
                                        name: 'test thoi'
                                    },
                                    rating: 2,
                                    comment:
                                        'commenthfjahkdhkhfksdjhfksjdhfksjdhfksjhfkshksjhfksjhdfkjshdkfjhlqeirwoieur;woieruwoiuerowieuroiwur'
                                }}
                            />
                        </div>
                        <div className="flex justify-center w-full">
                            <button className="btn">{t('Clear')}</button>
                        </div>
                    </>
                }
                title={
                    <span className="text-2xl">{t('NewNotifications')}</span>
                }
                trigger="click"
            >
                <div className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-black transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none hover:cursor-pointer">
                    <Badge count={5}>
                        <NotificationsIcon />
                    </Badge>
                </div>
            </Popover>
        </div>
    );
}
