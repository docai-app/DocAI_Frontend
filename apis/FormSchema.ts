import { AxiosRequestConfig } from 'axios';

// apis/FormSchema.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class FormSchema {
    getFormsSchemaByName(name: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/form/schemas/name/${name}`,
            method: 'GET'
        };
        return requestHeader;
    }
}
