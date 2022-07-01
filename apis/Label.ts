import { Method } from 'axios';

// apis/Classification.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface requestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: Method;
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
