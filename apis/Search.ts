import { AxiosRequestConfig } from 'axios';

// apis/Search.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Search {
    searchDocumentByContent() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/search/documents/content`,
            method: 'GET'
        };
        return requestHeader;
    }

    searchDocumentByTagContent() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/search/documents/tag_content`,
            method: 'GET'
        };
        return requestHeader;
    }

    searchDocumentByDate() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/search/documents/date`,
            method: 'GET'
        };
        return requestHeader;
    }

    searchFormByLabelAndDate(label: string, date: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/search/form/${encodeURI(label)}/${date}`,
            method: 'GET'
        };
        return requestHeader;
    }
}
