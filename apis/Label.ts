// apis/Classification.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface requestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: string;
}

interface postRequestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: string;
}

interface ConfirmDocumentProps {
    id: string;
    label_id: number;
}

export default class Label {
    getAllLabels() {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: '/labels',
            method: 'GET'
        };
        return requestHeader;
    }

    addNewLabel() {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: '/labels',
            method: 'POST'
        };
        return requestHeader;
    }
}
