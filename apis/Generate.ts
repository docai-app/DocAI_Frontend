import { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Generate {
    query(
        document_id: string,
        query: string,
        format: string,
        language: string,
        topic: string,
        style: string
    ) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/ai/query`,
            method: 'POST',
            data: {
                document_id,
                query,
                response_format: format,
                language,
                topic,
                style
            }
        };
        return requestHeader;
    }

    queryByDocuments(
        document_ids: [],
        query: string,
        format: string,
        language: string,
        topic: string,
        style: string
    ) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/ai/query/documents`,
            method: 'POST',
            data: {
                document_ids,
                query,
                response_format: format,
                language,
                topic,
                style
            }
        };
        return requestHeader;
    }
}
