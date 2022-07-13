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
    getAndPredictLatestUploadedDocument() {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: '/documents/latest',
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
}
