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
}
