import { Method } from 'axios';

// apis/Search.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface getRequestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: Method;
}

export default class Statistics {
    countTagsByDate(date: string) {
        const requestHeader: getRequestHeaderProps = {
            baseURL: baseURL,
            url: `/api/v1/statistics/count/tags/${date}`,
            method: 'GET'
        };
        return requestHeader;
    }

    countDocumentsByDate(date: string) {
        const requestHeader: getRequestHeaderProps = {
            baseURL: baseURL,
            url: `/api/v1/statistics/count/documents/${date}`,
            method: 'GET'
        };
        return requestHeader;
    }
}
