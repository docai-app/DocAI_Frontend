import { Method } from 'axios';

// apis/Absence.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface requestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: Method;
    data?: any;
}

export default class Absence {
    getAbsenceFormByApprovalStatus(status: string) {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: `/form/absence/approval?status=${status}`,
            method: 'GET'
        };
        return requestHeader;
    }

    getAbsenceFormByApprovalApprovalID(id: string) {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: `/form/absence/approval/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    updateAbsenceFormApprovalStatus(id: string, status: string, remark: string = '') {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: `/form/absence/${id}/approval`,
            method: 'PUT',
            data: {
                status,
                remark
            }
        };
        return requestHeader;
    }
}
