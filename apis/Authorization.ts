import { AxiosRequestConfig } from 'axios';

// apis/Authorization.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class FormSchema {
    signIn(email: string, password: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json'
            },
            url: `/users/sign_in.json`,
            method: 'POST',
            data: {
                user: {
                    email,
                    password
                }
            }
        };
        return requestHeader;
    }
}
