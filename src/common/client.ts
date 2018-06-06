import axios from 'axios';
import { IncomingMessage } from 'http';
import * as Cookies from 'js-cookie';

const DEFAULT_API_BASE_URL = 'http://api.pongpong.io';
const DEFAULT_INTERNAL_API_BASE_URL = 'http://kong-proxy.kong';
const ANONYMOUS_API_KEY = 'anonymous';

/**
 * 서버와 브라우져에서 fetch를 호출할 때 도메인 주소를 따로 설정함
 * @param req request
 */
const getBaseUrl = (req?: IncomingMessage) => {
    return (req && process.env.NODE_ENV == 'production') ? DEFAULT_INTERNAL_API_BASE_URL : DEFAULT_API_BASE_URL;
};

const getApiKey = (req?: IncomingMessage) => {
    let apiKey;
    if (req) {
        const rawCookies = (req.headers.cookie! as string).split('; ');
        const apiKeyCookie = rawCookies.find((c: string) => c.split('=')[0] == 'apiKey');
        apiKey = apiKeyCookie ? apiKeyCookie.split('=')[1] : ANONYMOUS_API_KEY;
    } else {
        apiKey = Cookies.get('apiKey') || ANONYMOUS_API_KEY;
    }

    return apiKey;
};

export const client = (req?: IncomingMessage) => {
    const opt = {
        baseURL: getBaseUrl(req),
        headers: {
            apiKey: getApiKey(req),
        },
    };
    return axios.create(opt);
};
