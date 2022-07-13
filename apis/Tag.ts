import { Method } from 'axios';

// apis/Classification.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface requestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: Method;
}

export default class Tag {
    getAllTags() {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: '/labels',
            method: 'GET'
        };
        return requestHeader;
    }

    getTagByTagging() {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: '/api/v1/tags/tagging/document',
            method: 'GET'
        };
        return requestHeader;
    }

    addNewTag() {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: '/labels',
            method: 'POST'
        };
        return requestHeader;
    }
}
