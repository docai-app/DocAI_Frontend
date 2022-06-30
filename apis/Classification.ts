// apis/Classification.ts
import axios, { Method } from 'axios';
import useAxios from 'axios-hooks';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Paramter {
    document: Array<any>;
}

interface requestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: Method;
}

export default class Classification {
    getAndPredictLastestUploadedDocument() {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: '/documents/lastest',
            method: 'GET'
        };
        return requestHeader;
    }

    confirmDocument() {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: '/classification/confirm',
            method: 'POST'
        };
        return requestHeader;
    }

    getDocumentsLabel() {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: '/documents/labels',
            method: 'GET'
        };
        return requestHeader;
    }

    getDocumentByLabelID(id: string) {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: `/documents/labels/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }
}
