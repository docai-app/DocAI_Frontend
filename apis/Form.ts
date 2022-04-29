// apis/Classification.ts
import axios from 'axios';
import useAxios from 'axios-hooks';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export default class Form {
    uploadAndRecognizeAbsenceForm() {
        const requestHeader: postRequestHeaderProps = {
            baseURL: baseURL,
            url: '/form/absence',
            method: 'POST'
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
