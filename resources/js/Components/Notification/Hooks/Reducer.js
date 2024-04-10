import {
    NEW_NOTI,
    REMOVE_ALL_NOTI,
    REMOVE_NOTI,
    SEEN_ALL_NOTI,
    SEEN_NOTI
} from '@/const/contains';

const old = localStorage.getItem('noti');

const initState = !old
    ? {
          noti: [],
          hasListener: false,
          reConnect: false
      }
    : { ...JSON.parse(old), hasListener: false, reConnect: true };

const UpdateNotiState = (state, action) => {
    switch (action.type) {
        case NEW_NOTI:
            state.noti.push(action.data);
            return {
                ...state,
                hasListener: true,
                reConnect: false
            };
        case REMOVE_NOTI:
            state.noti = state.noti.filter((e) => e.id !== action.data);
            return {
                ...state
            };
        case SEEN_NOTI:
            state.noti.map((e) => {
                if (e.id === action.data) {
                    e.seen = true;
                }
            });
            return {
                ...state
            };
        case SEEN_ALL_NOTI:
            state.noti.map((e) => {
                e.seen = true;
            });
            return {
                ...state
            };
        case REMOVE_ALL_NOTI:
            return {
                ...state,
                noti: []
            };
        default:
            throw new Error('Invalid Action');
    }
};

export default initState;
export { UpdateNotiState };
