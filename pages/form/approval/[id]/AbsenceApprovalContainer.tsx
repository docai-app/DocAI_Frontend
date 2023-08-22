import { useCallback, useEffect, useRef, useState } from 'react';
import AbsenceApprovalView from './AbsenceApprovalView';
import useAxios from 'axios-hooks';
import Api from '../../../../apis/index';
import { NextRouter, useRouter } from 'next/router';
import _get from 'lodash/get';
import { FieldProps, WidgetProps } from '@rjsf/core';
import axios from 'axios';
import useAlert from '../../../../hooks/useAlert';

const apiSetting = new Api();

function AbsenceApprovalContainer() {
    const router: any = useRouter();
    const { setAlert } = useAlert();
    const [formUrl, setFormUrl] = useState('');
    const [result, setResult] = useState();
    const [approval, setApproval] = useState({});
    const [formSchema, setFormSchema] = useState({});
    const [visable, setVisable] = useState(false);
    const [extraData, setExtraData] = useState({});
    const [documents, setDocuments] = useState([]);
    const [signature_image_url, set_signature_image_url] = useState('');

    const approvalButtonContainer = useCallback(
        () => (
            <div className="flex gap-2">
                <a
                    className=" cursor-pointer p-[0.75rem] rounded bg-red-600 text-white leading-none focus:ring-4 focus:ring-red-600/50"
                    // type="submit"
                    onClick={() => {
                        setVisable(true);
                        setApproval('rejected');
                        // props.onChange('rejected');
                    }}
                >
                    拒絕
                </a>
                <a
                    className=" cursor-pointer p-[0.75rem] ml-4 rounded bg-green-600 text-white leading-none focus:ring-4 focus:ring-green-600/50"
                    // type="submit"
                    onClick={() => {
                        setVisable(true);
                        setApproval('approved');
                        // props.onChange('approved');
                    }}
                >
                    批准並簽名
                </a>
            </div>
        ),
        []
    );

    const widgets = useRef({
        TextWidget: (props: WidgetProps) => (
            <label>
                <h3 className="font-bold">{`${props.label}${props.required ? '*' : ''}`}</h3>
                <input
                    type="text"
                    value={props.value || ''}
                    className="mt-1 border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 w-full"
                    onChange={(e) => {
                        props.onChange(e.target.value);
                    }}
                />
            </label>
        ),
        CheckboxWidget: (props: WidgetProps) => (
            <label className="flex flex-row items-center">
                <input
                    className="rounded-md p-2 checked:text-slate-500 focus:ring-3 focus:ring-offset-0 focus:ring-slate-300 shadow"
                    type="checkbox"
                    checked={props.value || false}
                    onChange={(e) => {
                        props.onChange(e.target.checked);
                    }}
                />
                <div className="ml-1">{props.label}</div>
            </label>
        )
    });

    const fields = useRef({
        TitleField: (props: FieldProps) => (
            <div>
                <h3 className="text-xl font-bold mb-2">{props.title}</h3>
            </div>
        )
    });

    const approvalSchema = useRef({
        type: 'object',
        properties: {
            approval: {
                title: '',
                type: 'string'
            }
        }
    });
    const uiSchema = useRef({
        'ui:submitButtonOptions': {
            norender: true
        }
    });
    const approvalUiSchema = useRef({
        'ui:submitButtonOptions': {
            norender: true
        },
        approval: {
            'ui:widget': approvalButtonContainer
        }
    });

    const [{ data: getFormsSchemaByIdData }, getFormsSchemaById] = useAxios(
        apiSetting.FormSchema.getFormsSchemaById(`${router?.query?.form_schema_id}`),
        {
            manual: true
        }
    );

    const [{ data: getAbsenceFormByApprovalIdData }, getAbsenceFormByApprovalId] = useAxios('', {
        manual: true
    });

    const [{ data: updateFormApprovalStatusData }, updateFormApprovalStatus] = useAxios(
        apiSetting.DocumentApproval.updateFormApprovalStatus(_get(router, 'query.id')),
        {
            manual: true
        }
    );

    const [
        { data: uploadData, loading: uploadLoading, error: uploadError, response: uploadResponse },
        upload
    ] = useAxios(apiSetting.Storage.uploadDirectly(), { manual: true });

    const onSubmit = useCallback(
        async (formData: any) => {
            const { approval, remark, signature } = formData;
            if (router.query.id) {
                updateFormApprovalStatus({
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [documents]);

    useEffect(() => {
        if (uploadData && uploadData.success === true) {
            set_signature_image_url(uploadData.file_url);
        } else if (uploadData && uploadData.success === false) {
            setAlert({ title: 'Upload failed! Please try again!', type: 'error' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, uploadData]);

    useEffect(() => {
        axios.defaults.headers.common['authorization'] =
            localStorage.getItem('authorization') || '';
        getFormsSchemaById();
    }, [getFormsSchemaById]);

    useEffect(() => {
        if (router?.query?.id && router?.query?.form_schema_id) {
            getAbsenceFormByApprovalId(
                apiSetting.Absence.getAbsenceFormByApprovalApprovalID(router.query.id.toString())
            );
            getFormsSchemaById();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, getAbsenceFormByApprovalId]);

    useEffect(() => {
        if (getAbsenceFormByApprovalIdData && getAbsenceFormByApprovalIdData.success === true) {
            setFormUrl(getAbsenceFormByApprovalIdData.absence_form.document.storage_url);
            setResult(getAbsenceFormByApprovalIdData.absence_form.form_data.data);
            setApproval({ remark: getAbsenceFormByApprovalIdData.absence_form?.remark || '' });
        }
    }, [getAbsenceFormByApprovalIdData]);

    useEffect(() => {
        if (getFormsSchemaByIdData && getFormsSchemaByIdData.success === true) {
            setFormSchema(getFormsSchemaByIdData.form_schema.form_schema);
        }
    }, [getFormsSchemaByIdData]);

    useEffect(() => {
        if (updateFormApprovalStatusData && updateFormApprovalStatusData.success === true) {
            setAlert({ title: '審批成功！', type: 'success' });
            router.push(`/form/approval`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, updateFormApprovalStatusData]);

    return (
        <>
            <AbsenceApprovalView
                {...{
                    formUrl,
                    result,
                    approval,
                    formSchema,
                    approvalSchema,
                    uiSchema,
                    approvalUiSchema,
                    widgets,
                    fields,
                    onSubmit,
                    visable,
                    setVisable,
                    extraData,
                    setExtraData,
                    setDocuments,
                    uploadLoading
                }}
            />
        </>
    );
}

export default AbsenceApprovalContainer;
