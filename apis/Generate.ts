import { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Generate {
    query(document_id: string, query: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/ai/query`,
            method: 'POST',
            data: {
                document_id,
                query
            }
        };
        return requestHeader;
    }
}
