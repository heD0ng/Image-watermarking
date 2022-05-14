import axios from 'axios';

export default function request(data={}) {
    let http = axios.create({
        timeout: 30000,
    })
    // 存在特殊的请求头
    if (Object.keys(data).length > 0) {
        http = axios.create({
            timeout: 30 * 1000,
            data: {
                ...data,
            }
        })
    }
    http.interceptors.request.use(config => {
        return config
    }, (err) => {
        return Promise.reject(err)
    });
    http.interceptors.response.use(res => {
        return Promise.resolve(res.data)
    }, err => {
        return Promise.reject(err)
    });
    
    return http;
}