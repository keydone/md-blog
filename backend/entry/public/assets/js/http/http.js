import httpCreate from './httpCreate';

const http = (params = {}) => {
    const methods = params.methods.toLowerCase();
    const url = params.url;

    return new Promise((resolve, reject) => {
        httpCreate[methods](url, {
            params,
        })
            .then((res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err.data);
            });
    });
};

export default http;
