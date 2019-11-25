import Axios from 'axios';
import ENV from './env';
// 请求时间
Axios.defaults.timeout = 5000;
// 请求域名
Axios.defaults.baseURL = ENV.api || 'http://localhost:8080';
// 请求头的content-type
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Axios.defaults.withCredentials = true;
// aixos请求拦截
Axios.interceptors.request.use((config: any) => {
    return config;
}, (err: object) => {
    return Promise.reject(err);
});
// aixos response拦截
Axios.interceptors.response.use((config: any) => {
    if (config.data.code !== 200) {
        return Promise.reject(config.data);
    }
    return config.data;
}, (err: any) => {
    return Promise.reject(err);
});
export default Axios;
