import { Method } from 'axios';

// apis/Absence.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface requestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: Method;
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

    updateAbsenceFormApprovalStatus() {
        // Coding on here...
    }
}
