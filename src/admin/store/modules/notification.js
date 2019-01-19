import {
    OPEN_NOTIFICATION,
    CLOSE_NOTIFICATION
} from '@admin/store/actions/notification';

export default {
    state: {
        title: null,
        isOpen: false
    },

    getters: {
        title: ({ title }) => title,
        isOpen: ({ isOpen }) => isOpen
    },

    mutations: {
        [OPEN_NOTIFICATION]: (state, { text }) => {
            state.isOpen = true;
            state.title = text;
        },
        [CLOSE_NOTIFICATION]: (state) => {
            state.isOpen = false;
            state.title = null;
        }
    }
}