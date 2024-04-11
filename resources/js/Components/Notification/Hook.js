import { useContext } from 'react';
import Context from './Context';

const useNotification = () => {
    const api = useContext(Context);
    const pushNoti = (title = '', desc, icon = null) => {
        const convertArrayToJsx = (array) => {
            const res = [];
            array.forEach((e) => {
                res.push(
                    <>
                        {e}
                        <br />
                    </>
                );
            });
            return res;
        };

        const convertObToJsx = (ob) => {
            const res = [];
            for (const [key, value] of Object.entries(ob)) {
                res.push(convertArrayToJsx(value));
            }
            return res;
        };

        const descContent = Array.isArray(desc)
            ? convertArrayToJsx(desc)
            : desc instanceof Object
            ? convertObToJsx(desc)
            : desc;
        api.success({
            message: title,
            description: <div>{descContent}</div>,
            placement: 'topRight',
            icon: icon ?? icon
        });
    };

    return [api, pushNoti];
};

export { useNotification };
