import { Method } from 'axios';

// apis/Search.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface getRequestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: Method;
}

export default class Search {
    searchDocumentByContent() {
        const requestHeader: getRequestHeaderProps = {
            baseURL: baseURL,
            url: `/api/v1/search/documents/content`,
            method: 'GET'
        };
        return requestHeader;
    }

    searchFormByLabelAndDate(label: string, date: string) {
        const requestHeader: getRequestHeaderProps = {
            baseURL: baseURL,
            url: `/api/v1/search/form/${encodeURI(label)}/${date}`,
            method: 'GET'
        };
        return requestHeader;
    }
}
