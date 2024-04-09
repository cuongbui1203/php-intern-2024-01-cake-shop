import {
    NEW_NOTI,
    REMOVE_ALL_NOTI,
    REMOVE_NOTI,
    SEEN_ALL_NOTI,
    SEEN_NOTI
} from '@/const/contains';

const newNoti = (data) => {
    const res = {
        type: NEW_NOTI,
        data: {
            ...data,
            seen: false
        }
    };

    return res;
};

const seenNoti = (id) => {
    return {
        type: SEEN_NOTI,
        data: id
    };
};

const removeNoti = (id) => {
    return {
        type: REMOVE_NOTI,
        data: id
    };
};

const removeAllNoti = () => {
    return {
        type: REMOVE_ALL_NOTI
    };
};

const seenAllNoti = () => {
    return {
        type: SEEN_ALL_NOTI
    };
};

export { newNoti, seenNoti, removeAllNoti, removeNoti, seenAllNoti };
