// apis/Classification.ts
import { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Form {
    showFormsByFilterAndFormSchemaId(formSchemaId: string, page = 1) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `api/v1/form/datum/${formSchemaId}/search?page=${page}`,
            method: 'POST'
        };
        return requestHeader;
    }

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

    deleteFormById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/form/datum/${id}`,
            method: 'DELETE'
        };
        return requestHeader;
    }

    schemasStatusReady() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/form/schemas/status/ready`,
            method: 'GET'
        };
        return requestHeader;
    }

    updateFormRecognition() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/form/recognition`,
            method: 'POST'
        };
        return requestHeader;
    }

    previewFormProjection() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/form/projection/preview`,
            method: 'POST'
        };
        return requestHeader;
    }
    confirmFormProjection() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/form/projection/confirm`,
            method: 'POST'
        };
        return requestHeader;
    }

    generateChart(form_data_ids: [], query: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/form/datum/generate/chart`,
            method: 'POST',
            data: {
                query,
                form_data_ids
            }
        };
        return requestHeader;
    }
}
