
const CONFIG = {
    LOCAL: {
        api: 'http://192.168.44.127:3000/api/story',
    },
    PROD: {
        api: 'https://www.vinekan.com:3000/api/story',
        // api: 'http://47.105.109.192:3000/api/story',
    },
};
interface ConfigObj {
    api: string;
}
let  ENV: ConfigObj;
if (window.location.href.includes('www.vinekan.com')) {
    ENV = CONFIG.PROD;
} else {
    ENV = CONFIG.LOCAL;
}
export default ENV;
