import useAxios from 'axios-hooks';
import Api from '../../../apis';
import ApprovalView from './ApprovalView';
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiSetting = new Api();

function ApprovalContainer() {
    //點擊“已審批”時，需要把“已批准”和“已拒絕”同時獲取出來
    const [currentTabStatus, setCurrentTabStatus] = useState<'approved' | 'awaiting' | 'rejected'>(
        'awaiting'
    );

    //請假紙，工場維修，店鋪維修，name是隨便起的，到時根據DB改名
    const [currentTypeTabStatus, setCurrentTypeTabStatus] = useState<'vacation' | 'factory' | 'shop'>(
        'vacation'
    );
    const [
        {
            data: getAbsenceFormByApprovalStatusData,
            loading: getAbsenceFormByApprovalStatusLoading,
            error: getAbsenceFormByApprovalStatusError,
            response: getAbsenceFormByApprovalStatusResponse
        },
        getAbsenceFormByApprovalStatus
    ] = useAxios(apiSetting.Absence.getAbsenceFormByApprovalStatus(currentTabStatus), {
        manual: true
    });
    const [formSchema, setFormSchema] = useState({});
    const [props, setProps] = useState<any>({
        data: [],
        currentTabStatus: currentTabStatus,
        setCurrentTabStatus: setCurrentTabStatus,
        currentTypeTabStatus: currentTypeTabStatus,
        setCurrentTypeTabStatus: setCurrentTypeTabStatus,
        formSchema: formSchema
    });

    const [{ data: getFormsSchemaByNameData }, getFormsSchemaByName] = useAxios(
        apiSetting.FormSchema.getFormsSchemaByName(encodeURI('請假表')),
        { manual: true }
    );
    useEffect(() => {
        axios.defaults.headers.common['authorization'] =
            localStorage.getItem('authorization') || '';
        getFormsSchemaByName();
    }, [getFormsSchemaByName]);

    useEffect(() => {
        if (getFormsSchemaByNameData && getFormsSchemaByNameData.success === true) {
            setFormSchema(getFormsSchemaByNameData.form_schema.form_schema);
            setProps((p: any) => ({
                ...p,
                formSchema: getFormsSchemaByNameData.form_schema.form_schema
            }));
        }
    }, [getFormsSchemaByNameData]);

    useEffect(() => {
        setProps((p: any) => ({
            ...p,
            data: getAbsenceFormByApprovalStatusData?.absence_forms || p.data
        }));
    }, [getAbsenceFormByApprovalStatusData]);

    useEffect(() => {
        setProps((p: any) => ({
            ...p,
            currentTabStatus: currentTabStatus,
            setCurrentTabStatus: setCurrentTabStatus
        }));
        getAbsenceFormByApprovalStatus({
            url: `/api/v1/form/absence/approval?status=${currentTabStatus}`
        });
    }, [currentTabStatus, getAbsenceFormByApprovalStatus]);

    useEffect(() => {
        setProps((p: any) => ({
            ...p,
            currentTypeTabStatus: currentTypeTabStatus,
            setCurrentTypeTabStatus: setCurrentTypeTabStatus
        }));
    }, [currentTypeTabStatus]);

    return (
        <ApprovalView
            loading={getAbsenceFormByApprovalStatusLoading}
            error={getAbsenceFormByApprovalStatusError}
            {...props}
        />
    );
}

export default ApprovalContainer;
