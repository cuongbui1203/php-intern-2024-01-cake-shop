import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CancelIcon from '@mui/icons-material/Cancel';
import { Rate } from 'antd';
import { useTranslation } from 'react-i18next';
export default function NotificationItem({ item, onDelete = () => {} }) {
    const [t] = useTranslation();

    return (
        <>
            <div>
                {t('Cake')}: {item.cakeName}
            </div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <div className="w-[40px] h-[40px] text-[1.25rem] relative leading-[1] uppercase bg-[#bdbdbd] flex justify-center items-center text-white rounded-full ">
                        {item.reviewer.name.slice(0, 1)}
                    </div>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <div className="flex justify-between">
                            <span className="mr-4">{item.reviewer.name}</span>
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
                    onClick={() => onDelete}
                    className="flex items-center justify-center h-[50px] text-red-500 hover:cursor-pointer hover:text-red-700"
                >
                    <CancelIcon />
                </div>
            </ListItem>
        </>
    );
}
