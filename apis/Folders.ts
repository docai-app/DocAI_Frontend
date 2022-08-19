import { AxiosRequestConfig } from 'axios';

// apis/DocumentApproval.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Folders {
    showAllFolders(page: number) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/folders?page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }
    showFolderByID(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/folders/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }
    createFolder(name: string, parent_id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/folders`,
            method: 'POST',
            data: {
                name,
                parent_id
            }
        };
        return requestHeader;
    }
}
