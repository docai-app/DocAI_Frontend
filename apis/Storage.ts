// apis/Storage.ts
import { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Storage {
    upload() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/storage/upload',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return requestHeader;
    }

    uploadByBatchTag() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/storage/upload/batch/tag',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return requestHeader;
    }

    uploadBulkWithSameTag() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/storage/upload/bulk/tag',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return requestHeader;
    }

    uploadDirectly() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/storage/upload/directly',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return requestHeader;
    }
}
