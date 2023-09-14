import { AxiosRequestConfig } from 'axios';

// apis/Classification.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Tag {
    getAllTags() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/tags',
            method: 'GET'
        };
        return requestHeader;
    }

    getTagById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/tags/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    getTagByTagging() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/tags/tagging/document',
            method: 'GET'
        };
        return requestHeader;
    }

    addNewTag() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/tags',
            method: 'POST'
        };
        return requestHeader;
    }

    updateTagNameById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/tags/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }

    getTagFunctionsById(id?: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/tags/${id}/functions`,
            method: 'GET'
        };
        return requestHeader;
    }

    getTagFunctions() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/functions`,
            method: 'GET'
        };
        return requestHeader;
    }

    updateTagFunctions() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/tags/function`,
            method: 'POST'
        };
        return requestHeader;
    }

    deleteTagFunctions() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/tags/function`,
            method: 'DELETE'
        };
        return requestHeader;
    }

    updateTagFeatures(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/tags/${id}/features`,
            method: 'PUT'
        };
        return requestHeader;
    }
}
