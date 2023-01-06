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
    showFolderAncestors(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/folders/${id}/ancestors`,
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
    updateFoldertNameById(id: string, name: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/folders/${id}`,
            method: 'PUT',
            data: {
                name: name
            }
        };
        return requestHeader;
    }
    updateFolderById(folder_id: string, parent_id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/folders/${folder_id}`,
            method: 'PUT',
            data: {
                parent_id
            }
        };
        return requestHeader;
    }
    deleteFolderById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/folders/${id}`,
            method: 'DELETE'
        };
        return requestHeader;
    }
}
