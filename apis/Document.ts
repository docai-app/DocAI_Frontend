import { Method } from 'axios';

// apis/Document.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface requestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: Method;
}

export default class Absence {
    getAllDocuments() {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: `/documents`,
            method: 'GET'
        };
        return requestHeader;
    }

    getDocumentById(id: string) {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: `/documents/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    getDocumentsByTagID(id: string) {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: `/api/v1/documents/tags/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    getAllUploadedDocuments() {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: `/documents/uploaded`,
            method: 'GET'
        };
        return requestHeader;
    }

    getAndPredictLatestUploadedDocument() {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: `/documents/latest`,
            method: 'GET'
        };
        return requestHeader;
    }
}
