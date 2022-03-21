// apis/Storage.ts
import axios from 'axios';
import useAxios from 'axios-hooks';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: string;
}

export default class Storage {
    upload() {
        const requestHeader: any = {
            baseURL: baseURL,
            url: '/upload',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return requestHeader;
    }
}
