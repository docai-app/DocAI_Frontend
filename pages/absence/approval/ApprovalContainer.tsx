import useAxios from 'axios-hooks';
import Api from '../../../apis';
import ApprovalView from './ApprovalView';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const apiSetting = new Api();

function ApprovalContainer() {
    const router = useRouter();
    //點擊“已審批”時，需要把“已批准”和“已拒絕”同時獲取出來
    const [currentTabStatus, setCurrentTabStatus] = useState<'approved' | 'awaiting' | 'rejected'>(
        'awaiting'
    );

    //請假紙，工場維修，店鋪維修，name是隨便起的，到時根據DB改名
    const [currentTypeTabStatus, setCurrentTypeTabStatus] = useState<
        'vacation' | 'factory' | 'shop'
    >('vacation');
    const [days, setDays] = useState(3);
    const [page, setPage] = useState(1);

    const [
        {
            data: getAbsenceFormByApprovalStatusData,
            loading: getAbsenceFormByApprovalStatusLoading,
            error: getAbsenceFormByApprovalStatusError
        },
        getAbsenceFormByApprovalStatus
    ] = useAxios(apiSetting.Absence.getAbsenceFormByApprovalStatus(currentTabStatus, days, page), {
        manual: true
    });
    const [formSchema, setFormSchema] = useState({});
    const [props, setProps] = useState<any>({
        data: [],
        meta: null,
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
            data: getAbsenceFormByApprovalStatusData?.absence_forms || p.data,
            meta: getAbsenceFormByApprovalStatusData?.meta || p.meta
        }));
    }, [getAbsenceFormByApprovalStatusData]);

    useEffect(() => {
        setProps((p: any) => ({
            ...p,
            currentTabStatus: currentTabStatus,
            setCurrentTabStatus: setCurrentTabStatus
        }));
        getAbsenceFormByApprovalStatus({
            url: `/api/v1/form/absence/approval?status=${currentTabStatus}&days=${days}&page=${page}`
        });
    }, [currentTabStatus, days, page, getAbsenceFormByApprovalStatus]);

    useEffect(() => {
        setProps((p: any) => ({
            ...p,
            currentTypeTabStatus: currentTypeTabStatus,
            setCurrentTypeTabStatus: setCurrentTypeTabStatus,
            days,
            setDays
        }));
    }, [currentTypeTabStatus, days, page]);

    useEffect(() => {
        if (router.query.page) {
            setPage(parseInt(router.query.page + '') || 1);
        }
    }, [router.query.page]);
    return (
        <ApprovalView
            loading={getAbsenceFormByApprovalStatusLoading}
            error={getAbsenceFormByApprovalStatusError}
            {...props}
        />
    );
}

export default ApprovalContainer;
