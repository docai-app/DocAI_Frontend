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
    createChatbot(
        name: string,
        description: string,
        is_public: boolean,
        expired_at: string,
        source: { folder_id: string[] },
        chain_features: []
    ) {
        const requestHeader: AxiosRequestConfig = {
            baseURL,
            url: '/api/v1/chatbots',
            method: 'POST',
            data: {
                name,
                description,
                is_public,
                expired_at,
                source,
                chain_features
            }
        };
        return requestHeader;
    }
    getChatbotById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL,
            url: `/api/v1/chatbots/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }
    updateChatbotById(
        id: string,
        name: string,
        description: string,
        is_public: boolean,
        expired_at: string,
        source: { folder_id: string[] },
        chain_features: []
    ) {
        const requestHeader: AxiosRequestConfig = {
            baseURL,
            url: `/api/v1/chatbots/${id}`,
            method: 'PUT',
            data: {
                name,
                description,
                is_public,
                expired_at,
                source,
                chain_features
            }
        };
        return requestHeader;
    }
}
