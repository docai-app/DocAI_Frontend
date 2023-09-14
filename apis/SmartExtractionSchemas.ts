import { AxiosRequestConfig } from 'axios';

// apis/SmartExtractionSchemas.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class SmartExtractionSchemas {
    getAllSmartExtractionSchemas(id: string, page = 1) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/smart_extraction_schemas/label/${id}?page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }

    getSmartExtractionSchemasById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/smart_extraction_schemas/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    getSmartExtractionSchemasDataById(id: string, page = 1) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/smart_extraction_schemas/${id}/data?page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }

    createSmartExtractionSchemas() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/smart_extraction_schemas`,
            method: 'POST'
        };
        return requestHeader;
    }

    updateSmartExtractionSchemasById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/smart_extraction_schemas/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }
}
