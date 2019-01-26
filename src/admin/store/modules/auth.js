import {
    SET_TOKEN_DATA,
    REFRESH_TOKEN,
    LOG_OUT
} from '@admin/store/actions/auth';
import apiRequest from '@admin/helpers/apiRequest';

export default {
    state: {
        token: null,
        expiredAt: null,
    },
    mutations: {
        [SET_TOKEN_DATA]: (state, { token, expiredAt }) => {
            state.token = token;
            state.expiredAt = expiredAt;
        },
    },
    actions: {
        [SET_TOKEN_DATA]: ({ commit }, { token, ttl }) => new Promise((resolve) => {
            let tokenData = {
                token,
                expired_at: Date.now() + ttl * 1000
            }
            localStorage.setItem('token_data', JSON.stringify(tokenData));
            commit(SET_TOKEN_DATA, { token: tokenData.token, expiredAt: token.expired_at });
            resolve();
        }),
        [REFRESH_TOKEN]: ({ dispatch }) => new Promise((resolve, reject) => {
            apiRequest({ url: '/refreshToken', method: 'POST', isRefresh: true })
            .then(({ token, ttl }) => {
                dispatch(SET_TOKEN_DATA, { token, ttl }).then(resolve);
            })
            .catch(reject)
        }),
        [LOG_OUT]: ({ commit }) => new Promise((resolve, reject) => {
            apiRequest({ url: '/logout', method: 'POST', isLogout: true })
            .then(() => {
                localStorage.removeItem('token_data');
                commit(SET_TOKEN_DATA, { token: null, expiredAt: null });
                resolve();
                window.location.href = '/';
            })
            .catch(reject);
           
        })
    }
}