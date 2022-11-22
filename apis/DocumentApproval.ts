import { AxiosRequestConfig } from 'axios';

// apis/DocumentApproval.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class DocumentApproval {
    updateFormApprovalStatus(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/approval/documents/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }

    getFormsByApprovalStatus(
        status: string,
        days: number = 3,
        page: number = 1,
        form_schema_id: string = ''
    ) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/approval/form/documents?status=${status}&days=${days}&page=${page}&form_schema_id=${form_schema_id}`,
            method: 'GET'
        };
        return requestHeader;
    }
}
