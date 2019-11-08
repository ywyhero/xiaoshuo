import http from '../config/http';
const Common = {
    getBooks(data: any) {
        return http('POST', '/getBooks', data);
    },
    getChapters(data: any) {
        return http('POST', '/getChapters', data);
    },
    getContent(data: any) {
        return http('POST', '/getContent', data);
    },
};
export default Common;
