import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Rate } from 'antd';
import { useTranslation } from 'react-i18next';

export default function Comments({ comments = [] }) {
    const content = [];
    const [t] = useTranslation();
    comments.map((e, i) => {
        content.push(
            <React.Fragment key={e.id}>
                {i === 0 ? <></> : <Divider variant="inset" component="li" />}
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <div className=" w-[40px] h-[40px] text-[1.25rem] relative leading-[1] uppercase bg-[#bdbdbd] flex justify-center items-center text-white rounded-full ">
                            {e.reviewer.name.slice(0, 1)}
                        </div>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <div className="flex justify-between pr-10">
                                <span>{e.reviewer.name}</span>
                                <Rate disabled allowHalf value={e.rating} />
                            </div>
                        }
                        secondary={e.comment}
                    />
                </ListItem>
            </React.Fragment>
        );
    });

    if (content.length === 0) {
        content.push(<>{t('NoReview')}</>);
    }

    return (
        <List
            sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}
        >
            {content}
        </List>
    );
}
