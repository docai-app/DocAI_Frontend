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
            url: '/api/v1/form/absence',
            method: 'POST'
        };
        return requestHeader;
    }

    updateFormData(id: string) {
        const requestHeader: postRequestHeaderProps = {
            baseURL: baseURL,
            url: `/api/v1/form/datum/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }
}
