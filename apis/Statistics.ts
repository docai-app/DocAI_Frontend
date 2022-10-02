import { AxiosRequestConfig } from 'axios';

// apis/Search.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Statistics {
    countTagsByDate(date: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/statistics/count/tags/${date}`,
            method: 'GET'
        };
        return requestHeader;
    }

    countDocumentsByDate(date: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/statistics/count/documents/${date}`,
            method: 'GET'
        };
        return requestHeader;
    }

    countDocumentsStatusByDate(date: string, page: any) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/statistics/count/documents/status/${date}?page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }
}
