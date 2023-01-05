import { FieldProps, WidgetProps } from '@rjsf/core';
import axios from 'axios';
import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Api from '../../../apis/index';
import useAlert from '../../../hooks/useAlert';
import ValidateView from './ValidateView';

const apiSetting = new Api();

function ValidateContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [formUrl, setFormUrl] = useState('');
    const [formId, setFormId] = useState('');
    const [formSchemaId, setFormSchemaId] = useState('');
    const [result, setResult] = useState({});
    const [formSchema, setFormSchema] = useState({});
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

    const uiSchema = useRef({
        'ui:submitButtonOptions': {
            submitText: '提交',
            props: {
                className: 'leading-none p-3 bg-blue-500 cursor-pointer text-white rounded'
            }
        }
    });

    const absenceFormFormik = useFormik({
        initialValues: {
            data: result
        },
        onSubmit: async (values) => {
            updateFormData({
                data: {
                    data: values.data
                }
            });
        }
    });

    const [
        { data: getFormsSchemaByIdData, loading: getFormsSchemaByIdDataLoading },
        getFormsSchemaById
    ] = useAxios(apiSetting.FormSchema.getFormsSchemaById(_get(router, 'query.form_schema_id')), {
        manual: true
    });

    const [
        {
            data: updateFormDataData,
            loading: updateFormDataLoading,
            error: updateFormDataError,
            response: updateFormDataResponse
        },
        updateFormData
    ] = useAxios(apiSetting.Form.updateFormData(formId), {
        manual: true
    });

    useEffect(() => {
        if (router.query.form_url && router.query.result) {
            setFormUrl(`${router.query.form_url}`);
            setResult(JSON.parse(`${router.query.result}`));
            setFormId(`${router.query.form_id}`);
            setFormSchemaId(`${router.query.form_schema_id}`);
            console.log('form_schema_id: ', `${router.query.form_schema_id}`);
            getFormsSchemaById();
        }
    }, [router]);

    useEffect(() => {
        if (getFormsSchemaByIdData && getFormsSchemaByIdData.success === true) {
            setFormSchema(getFormsSchemaByIdData?.form_schema?.form_schema);
        }
    }, [getFormsSchemaByIdData]);

    useEffect(() => {
        if (updateFormDataData && updateFormDataData.success === true) {
            setAlert({ title: '資料提交成功！', type: 'success' });
            // router.push('/');
            router.back();
        }
    }, [router, updateFormDataData]);

    return (
        <>
            <ValidateView
                {...{
                    formUrl,
                    result,
                    setResult,
                    formSchema,
                    uiSchema,
                    widgets,
                    fields,
                    absenceFormFormik,
                    getFormsSchemaByIdDataLoading
                }}
            />
        </>
    );
}

export default ValidateContainer;
