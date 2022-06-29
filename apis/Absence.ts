// apis/Absence.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface requestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: string;
}

export default class Absence {
    getAbsenceFormByApprovalStatus() {
        // Coding on here...
    }

    updateAbsenceFormApprovalStatus() {
        // Coding on here...
    }
}
