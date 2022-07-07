// apis/Classification.ts
import axios, { Method } from 'axios';
import useAxios from 'axios-hooks';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface requestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: Method;
}

interface postRequestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: Method;
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

    updateFormData(id: string) {
        const requestHeader: postRequestHeaderProps = {
            baseURL: baseURL,
            url: `/form/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }
}
