import useAxios from 'axios-hooks';
import Api from '../../../apis';
import ApprovalView from './ApprovalView';
import { useEffect, useState } from 'react';

interface ApprovalViewProps {
    data: {
        id: number;
        employee_name: string;
        reason_of_absence: string;
        type_of_absence: string;
        type_of_leave: string;
        status: 'approved' | 'awaiting' | 'rejected';
    }[];
    currentTabStatus: 'approved' | 'awaiting' | 'rejected';
    setCurrentTabStatus: any;
}

const apiSetting = new Api();

function ApprovalContainer() {
    const [currentTabStatus, setCurrentTabStatus] = useState<'approved' | 'awaiting' | 'rejected'>(
        'approved'
    );
    const [
        {
            data: getAbsenceFormByApprovalStatusData,
            loading: getAbsenceFormByApprovalStatusLoading,
            error: getAbsenceFormByApprovalStatusError,
            response: getAbsenceFormByApprovalStatusResponse
        },
        getAbsenceFormByApprovalStatus
    ] = useAxios(apiSetting.Absence.getAbsenceFormByApprovalStatus(currentTabStatus));
    const [props, setProps] = useState<ApprovalViewProps>({
        data: [
            {
                id: 1,
                employee_name: '陳大文',
                reason_of_absence: '中咗 COVID',
                type_of_absence: '緊急',
                type_of_leave: '病假',
                status: 'approved'
            },
            {
                id: 2,
                employee_name: '陳大文',
                reason_of_absence: '中咗 COVID',
                type_of_absence: '緊急',
                type_of_leave: '病假',
                status: 'awaiting'
            },
            {
                id: 3,
                employee_name: '陳大文',
                reason_of_absence: '中咗 COVID',
                type_of_absence: '緊急',
                type_of_leave: '病假',
                status: 'rejected'
            }
        ],
        currentTabStatus: currentTabStatus,
        setCurrentTabStatus: setCurrentTabStatus
    });
    useEffect(() => {
        getAbsenceFormByApprovalStatus({
            url: `/form/absense/approval?status=${currentTabStatus}`
        }).then((res) => {
            setProps({
                data: res.data,
                currentTabStatus: currentTabStatus,
                setCurrentTabStatus: setCurrentTabStatus
            });
        });
    }, [currentTabStatus]);

    return <ApprovalView {...props} />;
}

export default ApprovalContainer;
