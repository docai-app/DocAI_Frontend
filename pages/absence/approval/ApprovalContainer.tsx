import ApprovalView from './ApprovalView';
import { useState } from 'react';

interface ApprovalViewProps {
    data: {
        id: number;
        employee_name: string;
        reason_of_absence: string;
        type_of_absence: string;
        type_of_leave: string;
        storage: string;
        status: 0 | 1 | 2;
    }[];
}

function ApprovalContainer() {
    const [props, setProps] = useState<ApprovalViewProps>({
        data: [
            {
                id: 1,
                employee_name: '陳大文',
                reason_of_absence: '中咗 COVID',
                type_of_absence: '緊急',
                type_of_leave: '病假',
                storage: '',
                status: 0
            },
            {
                id: 2,
                employee_name: '陳大文',
                reason_of_absence: '中咗 COVID',
                type_of_absence: '緊急',
                type_of_leave: '病假',
                storage: '',
                status: 1
            },
            {
                id: 3,
                employee_name: '陳大文',
                reason_of_absence: '中咗 COVID',
                type_of_absence: '緊急',
                type_of_leave: '病假',
                storage: '',
                status: 2
            }
        ]
    });

    return <ApprovalView {...props} />;
}

export default ApprovalContainer;
