import { AxiosRequestConfig } from 'axios';

// apis/DocumentApproval.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class User {
    showCurrentUser() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/users/me',
            method: 'GET'
        };
        return requestHeader;
    }

    updateUserByID(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/users/${id}/profile`,
            method: 'PUT'
        };
        return requestHeader;
    }
}
