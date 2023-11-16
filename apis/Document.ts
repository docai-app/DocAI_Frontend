import { AxiosRequestConfig } from 'axios';

// apis/Document.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Absence {
    getAllDocuments() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/documents`,
            method: 'GET'
        };
        return requestHeader;
    }

    getDocumentById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/documents/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    deleteDocumentById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/documents/${id}`,
            method: 'DELETE'
        };
        return requestHeader;
    }

    getDocumentsByTagID(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/documents/tags/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    getAllUploadedDocuments() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/documents/uploaded`,
            method: 'GET'
        };
        return requestHeader;
    }

    getAndPredictLatestUploadedDocument(page = 1) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/documents/latest/predict?page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }

    getAndPredictByDateUploadedDocument(page = 1, date: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/documents/${date}/predict?page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }

    updateDocumentById(document_id: string, folder_id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/documents/${document_id}`,
            method: 'PUT',
            data: {
                folder_id
            }
        };
        return requestHeader;
    }

    updateDocumentNameById(document_id: string, name: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/documents/${document_id}`,
            method: 'PUT',
            data: {
                name: name
            }
        };
        return requestHeader;
    }

    deepUnderstandingDocument() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/documents/deep_understanding`,
            method: 'POST'
        };
        return requestHeader;
    }

    getCollectionDocuments() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/documents/collection`,
            method: 'GET'
        };
        return requestHeader;
    }

    page_details() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/documents/pdf/page_details`,
            method: 'GET'
        };
        return requestHeader;
    }
    pdf_search() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/documents/pdf/search/keyword`,
            method: 'POST'
        };
        return requestHeader;
    }
}
