import { AxiosRequestConfig } from 'axios';

// apis/Document.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class MiniApp {
    getMiniApps(page = 1) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/mini_apps?page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }

    create() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/mini_apps`,
            method: 'POST'
        };
        return requestHeader;
    }

    update(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/mini_apps/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }

    showMiniAppById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/mini_apps/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }
}
