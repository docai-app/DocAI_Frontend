import { AxiosRequestConfig } from 'axios';

// apis/SmartExtractionSchemas.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class SmartExtractionSchemas {
    getSmartExtractionSchemasByLabel(id: string, page = 1) {
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

    //?has_label=false
    // true就喺顯示有label嘅所有schema，false就是數據總表那些
    getSmartExtractionSchemas(has_label = '', page = 1) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/smart_extraction_schemas?&has_label=${has_label}&page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }

    createSchemasByDocuemnts() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/smart_extraction_schemas/documents`,
            method: 'POST'
        };
        return requestHeader;
    }

    updateSchemasByDocuemntsById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/smart_extraction_schemas/documents/${id}`,
            method: 'POST'
        };
        return requestHeader;
    }
    deleteSchemasByDocuemntsById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/smart_extraction_schemas/${id}`,
            method: 'DELETE'
        };
        return requestHeader;
    }

    searchSmartExtractionSchemasDataById(id: string, page = 1) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/document_smart_extraction_datum/${id}/search?page=${page}`,
            method: 'POST'
        };
        return requestHeader;
    }

    getSmartExtractionSchemasFormDataById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/document_smart_extraction_datum/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    updateSmartExtractionSchemasFormDataById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/document_smart_extraction_datum/${id}/data`,
            method: 'PUT'
        };
        return requestHeader;
    }

    deleteSmartExtractionSchemasFormDataById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/document_smart_extraction_datum/${id}`,
            method: 'DELETE'
        };
        return requestHeader;
    }

    generateChart(smart_extraction_schema_id: string, query: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/smart_extraction_schemas/generate/chart`,
            method: 'POST',
            data: {
                query,
                smart_extraction_schema_id
            }
        };
        return requestHeader;
    }

    generateStatistics(smart_extraction_schema_id: string, query: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/smart_extraction_schemas/generate/statistics`,
            method: 'POST',
            data: {
                query,
                smart_extraction_schema_id
            }
        };
        return requestHeader;
    }
}
