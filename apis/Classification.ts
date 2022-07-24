// apis/Classification.ts
import { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Classification {
    confirmDocument() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/classification/confirm',
            method: 'POST'
        };
        return requestHeader;
    }
}
