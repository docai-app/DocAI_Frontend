// apis/Classification.ts
import { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Form {
    uploadAndRecognizeAbsenceForm() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/form/absence',
            method: 'POST'
        };
        return requestHeader;
    }

    updateFormData(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/form/datum/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }
}
