import useAxios from 'axios-hooks';
import Api from '../../../apis';
import ApprovalView from './ApprovalView';
import { useEffect, useState } from 'react';

const apiSetting = new Api();

function ApprovalContainer() {
    const [currentTabStatus, setCurrentTabStatus] = useState<'approved' | 'awaiting' | 'rejected'>(
        'awaiting'
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
        formSchema: formSchema
    });

    const [{ data: getFormsSchemaByNameData }, getFormsSchemaByName] = useAxios(
        apiSetting.FormSchema.getFormsSchemaByName(encodeURI('請假表')),
        { manual: true }
    );

    useEffect(() => {
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

    return (
        <ApprovalView
            loading={getAbsenceFormByApprovalStatusLoading}
            error={getAbsenceFormByApprovalStatusError}
            {...props}
        />
    );
}

export default ApprovalContainer;
