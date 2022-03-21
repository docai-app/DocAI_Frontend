// apis/Classification.ts
import axios from 'axios';
import useAxios from 'axios-hooks';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Paramter {
    document: Array<any>;
}

interface requestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: string;
}

interface postRequestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: string;
}

interface ConfirmDocumentProps {
    id: string;
    label_id: number;
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
        const requestHeader: postRequestHeaderProps = {
            baseURL: baseURL,
            url: '/classification/confirm',
            method: 'POST'
        };
        return requestHeader;
    }
}
