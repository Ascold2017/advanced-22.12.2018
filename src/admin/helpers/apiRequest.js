import Axios from 'axios';
import store from '@admin/store';
import {
    REFRESH_TOKEN,
    LOG_OUT
} from '@admin/store/actions/auth';

let isRefreshTokenRequest = false;
let waitRequestStack = [];

const apiRequest = ({ url, method, data, headers = {}, isRefresh, params, ...args}) => new Promise((resolve, reject) => {
    // IE fix
    if (url[url.length - 1] === '/') {
        url = url.slice(0, -1);
    }

    const instance = Axios.create({baseURL: 'https://webdev-api.loftschool.com'});

    const request = ({ reqData: { headers, method, url, data, params }, resolve, reject }) => {

        params = params || {};

        if (store.state.auth.token) {
            params['token'] = store.state.auth.token || '';
            headers['token'] = store.state.auth.token || '';
        }
        return instance.request({headers, method, url, data, params})
            .then(response => resolve(response.data))
            .catch(error => {
                console.error(error)
                reject(error)
            });
    }
    
    const isTokenExpired = store.state.auth.expiredAt <= +new Date();

    if (store.state.auth.token && isTokenExpired) {
        
        !isRefresh && waitRequestStack.push({ reqData: {url, method, headers, data, fromWaitingStack: true, ...args}, resolve, reject });
        // if this request is not regenerateToken - call REFRESH TOKEN and set isRefreshTokenRequest to true
        if (!isRefresh && !isRefreshTokenRequest) {
            isRefreshTokenRequest = true;
            store.dispatch(REFRESH_TOKEN)
            .then(() => {
                // when tokens is refreshed - we can execute requests from stack
                isRefreshTokenRequest = false;
                Promise.all(waitRequestStack.map(waitingRequest => request(waitingRequest)))
            })
        }
        else if (isRefresh || isLogout) {
            return request({ reqData: {headers, method, url, data}, resolve, reject });
        }
    } else {
        return request({ reqData: {headers, method, url, data}, resolve, reject });
    }
});

export default apiRequest;
