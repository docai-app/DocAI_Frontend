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

    updateMeProfile() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/users/me/profile`,
            method: 'PUT'
        };
        return requestHeader;
    }

    updateMePassword() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/users/me/password`,
            method: 'PUT'
        };
        return requestHeader;
    }

    getAllUsers() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/users`,
            method: 'GET'
        };
        return requestHeader;
    }

    googleSignInCallback() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/users/auth/google_oauth2/callback`,
            method: 'POST'
        };
        return requestHeader;
    }
}
