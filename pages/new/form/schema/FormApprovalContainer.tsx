import { FieldProps, WidgetProps } from '@rjsf/core';
import axios from 'axios';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import Api from '../../../../apis/index';
import useAlert from '../../../../hooks/useAlert';
import FormApprovalView from './FormApprovalView';

const apiSetting = new Api();

function FormApprovalContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [formUrl, setFormUrl] = useState('');
    const [result, setResult] = useState({});
    const [approval, setApproval] = useState({});
    const [formSchema, setFormSchema] = useState({});
    const [preview, setPreview] = useState(false);
    const [reset, setReset] = useState(false);
    const [open, setOpen] = useState(false);
    const [actionContent, setActionContent] = useState("")
    const [visiable, setVisiable] = useState(false);
    const approvalButtonContainer = useCallback(
        () => (
            <div className="flex gap-2">
                <a
                    className=" cursor-pointer p-[0.75rem] rounded bg-red-600 text-white leading-none focus:ring-4 focus:ring-red-600/50"
                    // type="submit"
                    onClick={() => {
                        setReset(true)
                    }}
                >
                    重新填寫
                </a>
                <a
                    className=" cursor-pointer p-[0.75rem] ml-4 rounded bg-green-600 text-white leading-none focus:ring-4 focus:ring-green-600/50"
                    // type="submit"
                    onClick={() => {
                        setPreview(true)
                    }}
                >
                    預覽
                </a>
                <a
                    className=" cursor-pointer p-[0.75rem] ml-4 rounded bg-green-600 text-white leading-none focus:ring-4 focus:ring-green-600/50"
                    // type="submit"
                    onClick={() => {
                        setVisiable(true)
                    }}
                >
                    提交
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
        apiSetting.FormSchema.getFormsSchemaById(`${router.query.form_schema_id}`),
        { manual: true }
    );

    const [{ data: previewFormProjectionData, loading: previewFormProjectionLoading }, previewFormProjection] = useAxios(
        apiSetting.Form.previewFormProjection(),
        { manual: true }
    );

    const [{ data: confirmFormProjectionData, loading: confirmFormProjectionLoading }, confirmFormProjection] = useAxios(
        apiSetting.Form.confirmFormProjection(),
        { manual: true }
    );

    const onSubmit = useCallback(
        async (formData: any) => {
            const { approval, remark, signature } = formData;
        },
        [router]
    );

    const onConfirm = useCallback(
        async (data: any) => {
            const { filename, target_folder_id } = data;
            setActionContent("正在提交，請稍候。")
            setOpen(true)
            confirmFormProjection({
                data: {
                    form_schema_id: router.query.form_schema_id,
                    filename: filename,
                    target_folder_id: target_folder_id,
                    data: result
                }
            })
        },
        [router, result]
    );


    useEffect(() => {
        if (getFormsSchemaByIdData && getFormsSchemaByIdData.success === true) {
            setFormUrl(getFormsSchemaByIdData.form_schema.projection_image_url)
            setFormSchema(getFormsSchemaByIdData.form_schema.form_schema);
        }
    }, [getFormsSchemaByIdData]);

    useEffect(() => {
        if (previewFormProjectionData && previewFormProjectionData.success === true) {
            setFormUrl("data:image/jpg;base64," + previewFormProjectionData.image)
            setOpen(false)
        }
    }, [previewFormProjectionData]);

    useEffect(() => {
        if (confirmFormProjectionData && confirmFormProjectionData.success === true) {
            setAlert({ title: '提交成功', type: 'success' });
            init()
        } else if (confirmFormProjectionData && confirmFormProjectionData.success === false) {
            console.log('confirmFormProjectionData', confirmFormProjectionData);
            setAlert({ title: '提交失敗', type: 'error' });

        }
    }, [confirmFormProjectionData]);

    useEffect(() => {
        axios.defaults.headers.common['authorization'] =
            localStorage.getItem('authorization') || '';
        getFormsSchemaById();
    }, [getFormsSchemaById]);

    useEffect(() => {
        if (preview) {
            setActionContent("正在生成預覽圖，請稍候。")
            setOpen(true)
            previewFormProjection({
                data: {
                    form_schema_id: router.query.form_schema_id,
                    data: result
                }
            });
        }
    }, [router, preview]);

    const init = () => {
        setFormUrl(getFormsSchemaByIdData.form_schema.projection_image_url)
        setFormSchema(getFormsSchemaByIdData.form_schema.form_schema);
        setReset(false)
        setOpen(false)
        setResult({})
    }
    useEffect(() => {
        if (reset) {
            init()
        }
    }, [reset]);

    return (
        <>
            <FormApprovalView
                {...{
                    formUrl,
                    result,
                    setResult,
                    approval,
                    formSchema,
                    approvalSchema,
                    uiSchema,
                    approvalUiSchema,
                    widgets,
                    fields,
                    onSubmit,
                    onConfirm,
                    setPreview,
                    previewFormProjectionLoading,
                    open,
                    setOpen,
                    visiable,
                    setVisiable,
                    actionContent
                }}
            />
        </>
    );
}

export default FormApprovalContainer;