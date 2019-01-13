
const apiRequest = ({ url, method, data }) => {
    const baseURL = 'https://webdev-api.loftschool.com';

    return new Promise((resolve, reject) => {
        fetch(`${baseURL + url}`, {
            method,
            body: JSON.stringify(data),
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(data => {
            if (data.status === 200) {
                data.json().then(v => resolve(v));
            } else {
                data.json().then(v => reject(v.error));
            }
        })
        .catch(e => reject(e))
    });
}

export default apiRequest;
