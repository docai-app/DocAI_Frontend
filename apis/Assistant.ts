import { AxiosRequestConfig } from 'axios';

// apis/Chatbot.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Assistant {
    assistant_agents() {
        const requestHeader: AxiosRequestConfig = {
            baseURL,
            url: '/api/v1/assistant_agents',
            method: 'GET'
        };
        return requestHeader;
    }
}
