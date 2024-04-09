import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CancelIcon from '@mui/icons-material/Cancel';
import { Rate, Badge } from 'antd';
import { useTranslation } from 'react-i18next';
import { removeNoti, seenNoti } from './Actions/action';
import { useAdminNotification } from './Hooks/Hook';
import clsx from 'clsx';
export default function NotificationItem({ item }) {
    const [t] = useTranslation();
    const [noti, dispatch] = useAdminNotification();
    return (
        <div
            onClick={() => {
                dispatch(seenNoti(item.id));
            }}
        >
            <div>
                {t('Cake')}: {item.cake.name}
            </div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <div className="w-[40px] h-[40px] text-[1.25rem] relative leading-[1] uppercase bg-[#bdbdbd] flex justify-center items-center text-white rounded-full">
                        {item.reviewer.name.slice(0, 1)}
                    </div>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <div className="flex justify-between">
                            <Badge
                                dot={!item.seen}
                                offset={[8, 0]}
                                style={{
                                    width: '10px',
                                    height: '10px'
                                }}
                            >
                                <span
                                    className={clsx(
                                        !item.seen && 'font-extrabold'
                                    )}
                                >
                                    {item.reviewer.name}
                                </span>
                            </Badge>
                            <Rate
                                disabled
                                allowHalf
                                value={item.rating}
                                className=" mr-[10px]"
                            />
                        </div>
                    }
                    secondary={
                        <div className="truncate w-[20rem]">{item.comment}</div>
                    }
                />
                <div
                    onClick={() => dispatch(removeNoti(item.id))}
                    className="flex items-center justify-center h-[50px] text-red-500 hover:cursor-pointer hover:text-red-700"
                >
                    <CancelIcon />
                </div>
            </ListItem>
        </div>
    );
}
