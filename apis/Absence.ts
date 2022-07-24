import { AxiosRequestConfig } from 'axios';

// apis/Absence.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Absence {
    getAbsenceFormByApprovalStatus(status: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/form/absence/approval?status=${status}`,
            method: 'GET'
        };
        return requestHeader;
    }

    getAbsenceFormByApprovalApprovalID(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/form/absence/approval/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    updateAbsenceFormApprovalStatus(id: string, status: string, remark: string = '') {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/form/absence/${id}/approval?status=${status}`,
            method: 'PUT',
            data: {
                status,
                remark
            }
        };
        return requestHeader;
    }
}
