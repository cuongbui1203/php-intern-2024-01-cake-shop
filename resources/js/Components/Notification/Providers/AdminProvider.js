import React, { useMemo, useReducer } from 'react';
import AdminContext from '../Contexts/AdminContext';
import initState, { UpdateNotiState } from '../Hooks/Reducer';
import { newNoti } from '../Actions/action';
import { ROLE } from '@/const/role';

export default function Provider({ auth, children }) {
    const [noti, dispatch] = useReducer(UpdateNotiState, initState);
    useMemo(() => {
        if (auth.user) {
            if (
                (!noti.hasListener || noti.reConnect) &&
                auth.user.role_id === ROLE.ADMIN
            ) {
                window.Echo.channel('CakeReviewed').listen(
                    'CakeReviewedEvent',
                    ({ review }) => {
                        dispatch(newNoti(review));
                    }
                );
            }
        }
    }, []);

    useMemo(() => {
        localStorage.setItem('noti', JSON.stringify(noti));
    }, [noti]);

    return (
        <AdminContext.Provider value={[noti, dispatch]}>
            {children}
        </AdminContext.Provider>
    );
}
