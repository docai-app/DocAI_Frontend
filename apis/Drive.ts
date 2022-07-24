import { AxiosRequestConfig } from 'axios';

// apis/DocumentApproval.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Drive {
    showAllRootItems() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/drive/files`,
            method: 'GET'
        };
        return requestHeader;
    }
    showAllFolderItems(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/drive/files/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }
}
