import axios from 'axios';
import useAxios from 'axios-hooks';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import ApprovalView from './ApprovalView';

const apiSetting = new Api();

function ApprovalContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    //點擊“已審批”時，需要把“已批准”和“已拒絕”同時獲取出來
    const [currentTabStatus, setCurrentTabStatus] = useState<'approved' | 'awaiting' | 'rejected'>(
        'awaiting'
    );

    //請假紙，普通文件, 工場維修，店鋪維修
    const [currentTypeTabStatus, setCurrentTypeTabStatus] = useState<'normal'>('normal');
    const [days, setDays] = useState(3);
    const [page, setPage] = useState(1);
    const [department, setDepartment] = useState('');
    const [signature_image_url, set_signature_image_url] = useState('');
    const [documents, setDocuments] = useState([]);
    const [formSchemaId, setFormSchemaId] = useState('');
    const [formSchemaList, setFormSchemaList] = useState([]);

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

    const [{ data: getFormsSchemaByIdData }, getFormsSchemaById] = useAxios(
        apiSetting.FormSchema.getFormsSchemaById(currentTypeTabStatus),
        { manual: true }
    );

    const [{ data: updateFormApprovalStatusData }, updateFormApprovalStatus] = useAxios(
        apiSetting.DocumentApproval.updateFormApprovalStatus(''),
        {
            manual: true
        }
    );

    const [{ data: schemasStatusReadyData }, schemasStatusReady] = useAxios(
        apiSetting.Form.schemasStatusReady(),
        {
            manual: false
        }
    );

    const [
        { data: uploadData, loading: uploadLoading, error: uploadError, response: uploadResponse },
        upload
    ] = useAxios(apiSetting.Storage.uploadDirectly(), { manual: true });

    useEffect(() => {
        if (schemasStatusReadyData) {
            setFormSchemaList(schemasStatusReadyData.form_schema);
        }
    }, [schemasStatusReadyData]);

    useEffect(() => {
        axios.defaults.headers.common['authorization'] =
            localStorage.getItem('authorization') || '';
        getFormsSchemaById();
    }, [getFormsSchemaById]);

    useEffect(() => {
        if (getFormsSchemaByIdData && getFormsSchemaByIdData.success === true) {
            setFormSchema(getFormsSchemaByIdData.form_schema.form_schema);
            setProps((p: any) => ({
                ...p,
                formSchema: getFormsSchemaByIdData.form_schema.form_schema
            }));
        }
    }, [getFormsSchemaByIdData]);

    useEffect(() => {
        setProps((p: any) => ({
            ...p,
            data: getAbsenceFormByApprovalStatusData?.forms || p.data,
            meta: getAbsenceFormByApprovalStatusData?.meta || p.meta
        }));
    }, [getAbsenceFormByApprovalStatusData]);

    useEffect(() => {
        setProps((p: any) => ({
            ...p,
            currentTabStatus: currentTabStatus,
            setCurrentTabStatus: setCurrentTabStatus
        }));
        // console.log('currentTypeTabStatus', currentTypeTabStatus);

        currentTypeTabStatus != 'normal'
            ? getAbsenceFormByApprovalStatus({
                  url: `/api/v1/approval/form/documents?status=${currentTabStatus}&days=${days}&page=${page}&form_schema_id=${currentTypeTabStatus}`
              })
            : currentTypeTabStatus == 'normal'
            ? getAbsenceFormByApprovalStatus({
                  url: `/api/v1/approval/normal/documents?status=${currentTabStatus}&days=${days}&page=${page}`
              })
            : null;
    }, [currentTypeTabStatus, currentTabStatus, days, page, getAbsenceFormByApprovalStatus]);

    useEffect(() => {
        let data: any = [];
        if (department) {
            data = _.filter(getAbsenceFormByApprovalStatusData?.forms, function (o) {
                return o.form_data.data?.working_department[department] == true;
            });
            if (department == 'all') data = getAbsenceFormByApprovalStatusData?.forms;
        }
        setProps((p: any) => ({
            ...p,
            data: data || p.data,
            currentTypeTabStatus: currentTypeTabStatus,
            setCurrentTypeTabStatus: setCurrentTypeTabStatus,
            days,
            setDays,
            department,
            setDepartment
        }));
    }, [currentTypeTabStatus, days, page, department]);

    useEffect(() => {
        if (router.query.page) {
            setPage(parseInt(router.query.page + '') || 1);
        }
    }, [router.query.page]);

    const onSubmit = useCallback(
        async (formData: any) => {
            const { approval, remark, signature, absenceFormId } = formData;
            // console.log("form", formData);
            if (absenceFormId) {
                updateFormApprovalStatus({
                    ...apiSetting.DocumentApproval.updateFormApprovalStatus(absenceFormId),
                    data: {
                        approval_status: approval,
                        remark: remark,
                        signature: signature,
                        signature_image_url: signature_image_url
                    }
                });
            }
            setDocuments([]);
            set_signature_image_url('');
        },
        [router, signature_image_url, updateFormApprovalStatus]
    );

    useEffect(() => {
        if (documents && documents.length > 0) {
            const formData = new FormData();
            for (const i of documents) {
                formData.append('file', i);
            }
            upload({
                data: formData
            });
        }
    }, [documents]);

    useEffect(() => {
        if (uploadData && uploadData.success === true) {
            set_signature_image_url(uploadData.file_url);
        } else if (uploadData && uploadData.success === false) {
            setAlert({ title: 'Upload failed! Please try again!', type: 'error' });
        }
    }, [router, uploadData]);

    useEffect(() => {
        if (updateFormApprovalStatusData && updateFormApprovalStatusData.success === true) {
            setAlert({ title: '審批成功！', type: 'success' });
            // router.reload()
            getAbsenceFormByApprovalStatus({
                url: `/api/v1/approval/normal/documents?status=${currentTabStatus}&days=${days}&page=${page}`
            });
        }
    }, [updateFormApprovalStatusData]);

    return (
        <ApprovalView
            loading={getAbsenceFormByApprovalStatusLoading}
            error={getAbsenceFormByApprovalStatusError}
            onSubmit={onSubmit}
            setDocuments={setDocuments}
            uploadLoading={uploadLoading}
            formSchemaList={formSchemaList}
            {...props}
        />
    );
}

export default ApprovalContainer;
