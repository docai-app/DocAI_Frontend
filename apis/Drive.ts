import { AxiosRequestConfig } from 'axios';

// apis/DocumentApproval.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Drive {
    showAllRootItems(page = 1) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/drive/files?page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }
    showAllFolderItems(id: string, page = 1) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/drive/files/${id}?page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }
    shareFolderPermission(id: string, user_email: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/drive/folders/share`,
            method: 'POST',
            data: {
                id,
                user_email
            }
        };
        return requestHeader;
    }
    moveItemsToSpecificFolder() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/drive/items/move`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return requestHeader;
    }
    downloadItemsByIDs(data: any) {
        const requestHeader: AxiosRequestConfig = {
            baseURL,
            url: `/api/v1/drive/download_zip`,
            method: 'POST',
            data,
            responseType: 'blob'
        };
        return requestHeader;
    }
}
