// apis/Search.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface getRequestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: string;
}

interface postRequestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: string;
}

export default class Search {
    searchDocumentByContent() {
        const requestHeader: getRequestHeaderProps = {
            baseURL: baseURL,
            url: `/search/content`,
            method: 'GET'
        };
        return requestHeader;
    }

    countEachLabelDocumentByDate(date: string) {
        const requestHeader: getRequestHeaderProps = {
            baseURL: baseURL,
            url: `/count/document/${date}`,
            method: 'GET'
        };
        return requestHeader;
    }

    searchFormByLabelAndDate(label: string, date: string) {
        const requestHeader: getRequestHeaderProps = {
            baseURL: baseURL,
            url: `/search/form/${encodeURI(label)}/${date}`,
            method: 'GET'
        };
        return requestHeader;
    }
}
