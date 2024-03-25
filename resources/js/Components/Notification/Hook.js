import { useContext } from 'react';
import Context from './Context';

const useNotification = () => {
    const api = useContext(Context);
    const pushNoti = (title = '', desc = '', icon = null) => {
        api.success({
            message: title,
            description: <div>{desc}</div>,
            placement: 'topRight',
            icon: icon ?? icon
        });
    };

    return [api, pushNoti];
};

export { useNotification };
