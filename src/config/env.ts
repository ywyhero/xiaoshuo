const htp = location.protocol;
console.log(htp)
const CONFIG = {
    LOCAL: {
        api: 'http://192.168.44.96:3000/api/story',
    },
    PROD: {
        api: `${htp}//www.vinekan.com:3000/api/story`,
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
