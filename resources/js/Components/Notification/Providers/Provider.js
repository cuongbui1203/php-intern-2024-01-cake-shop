import React from 'react';
import NotificationContext from '../Contexts/Context';
import { notification } from 'antd';

export default function Provider({ children }) {
    const [api, contextHolder] = notification.useNotification();

    return (
        <NotificationContext.Provider value={api}>
            <>{contextHolder}</>
            {children}
        </NotificationContext.Provider>
    );
}
