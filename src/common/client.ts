import axios from 'axios';
import { IncomingMessage } from 'http';
import * as Cookies from 'js-cookie';

const DEFAULT_API_BASE_URL = 'http://api.pongpong.io';
const ANONYMOUS_API_KEY = 'anonymous';

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
    axios.defaults.baseURL = DEFAULT_API_BASE_URL;
    axios.defaults.headers = {
        apiKey: getApiKey(req),
    };
    return axios;
};
