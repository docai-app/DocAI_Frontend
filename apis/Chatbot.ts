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
    createChatbot() {
        const requestHeader: AxiosRequestConfig = {
            baseURL,
            url: '/api/v1/chatbots',
            method: 'POST'
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
    updateChatbotById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL,
            url: `/api/v1/chatbots/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }

    getShareSignature(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL,
            url: `/api/v1/chatbots/${id}/share`,
            method: 'POST'
        };
        return requestHeader;
    }

    deleteChatbotById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL,
            url: `/api/v1/chatbots/${id}`,
            method: 'DELETE'
        };
        return requestHeader;
    }

    updateChatbotAssistiveQuestionsById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL,
            url: `/api/v1/chatbots/${id}/assistive_questions`,
            method: 'PUT'
        };
        return requestHeader;
    }
}
