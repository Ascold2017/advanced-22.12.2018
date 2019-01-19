import Axios from 'axios';
import store from '@admin/store';

const apiRequest = ({ url, method, data, headers = {}, params, ...args}) => new Promise((resolve, reject) => {
    // IE fix
    if (url[url.length - 1] === '/') {
        url = url.slice(0, -1);
    }

    const instance = Axios.create({baseURL: 'https://webdev-api.loftschool.com'});

    if (args.responseType) {
        instance.defaults.responseType = args.responseType;
    }

    params = params || {};
    if (store.state.auth.token) {
        params['token'] = store.state.auth.token || '';
        headers['token'] = store.state.auth.token || '';
    }

    instance.request({headers, method, url, data, params})
    .then(response => resolve(response.data))
    .catch(error => {
        console.error(error)
        reject(error)
    });
});

export default apiRequest;
