import { AxiosRequestConfig } from 'axios';

// apis/Chatbot.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Chatbot {
    showAllChatbots(page: number) {
        const requestHeader: AxiosRequestConfig = {
            baseURL,
            url: '/api/v1/chatbots',
            method: 'GET',
            params: { page }
        };
        return requestHeader;
    }
    createChatbot(name: string, description: string, source: { folder_id: string[] }) {
        const requestHeader: AxiosRequestConfig = {
            baseURL,
            url: '/api/v1/chatbots',
            method: 'POST',
            data: {
                name,
                description,
                source
            }
        };
        return requestHeader;
    }
}
