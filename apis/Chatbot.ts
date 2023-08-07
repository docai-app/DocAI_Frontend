import { AxiosRequestConfig } from 'axios';

// apis/Chatbot.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Chatbot {
    showAllChatbots(page: number) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/chatbots',
            method: 'GET',
            params: { page }
        };
        return requestHeader;
    }
}
