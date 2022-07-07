// apis/Storage.ts
import { Method } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: Method;
    headers: Record<string, string>;
}

export default class Storage {
    upload() {
        const requestHeader: RequestHeaderProps = {
            baseURL: baseURL,
            url: '/upload',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return requestHeader;
    }

    uploadBulkWithSameLabel() {
        const requestHeader: RequestHeaderProps = {
            baseURL: baseURL,
            url: '/upload/bulk/label',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return requestHeader;
    }
}
