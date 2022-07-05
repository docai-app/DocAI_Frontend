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
        apiSetting.FormSchema.getFormsSchemaByName('請假表'),
        { manual: false }
    );

    useEffect(() => {
        if (getFormsSchemaByNameData && getFormsSchemaByNameData.status === true) {
            setFormSchema(JSON.parse(getFormsSchemaByNameData.forms_schema.form_schema));
            setProps({
                ...props,
                formSchema: JSON.parse(getFormsSchemaByNameData.forms_schema.form_schema)
            });
            console.log(JSON.parse(getFormsSchemaByNameData.forms_schema.form_schema));
        }
    }, [getFormsSchemaByNameData]);

    useEffect(() => {
        setProps({
            ...props,
            data: getAbsenceFormByApprovalStatusData?.absences_form || props.data
        });
    }, [getAbsenceFormByApprovalStatusData]);

    useEffect(() => {
        setProps({
            ...props,
            currentTabStatus: currentTabStatus,
            setCurrentTabStatus: setCurrentTabStatus
        });
        getAbsenceFormByApprovalStatus({
            url: `/form/absence/approval?status=${currentTabStatus}`
        });
    }, [currentTabStatus]);

    return (
        <ApprovalView
            loading={getAbsenceFormByApprovalStatusLoading}
            error={getAbsenceFormByApprovalStatusError}
            {...props}
        />
    );
}

export default ApprovalContainer;
