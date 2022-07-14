import { useEffect, useState, useRef } from 'react';
import ValidateView from './ValidateView';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import _get from 'lodash/get';
import { WidgetProps, FieldProps } from '@rjsf/core';

const apiSetting = new Api();

function ValidateContainer() {
    const router = useRouter();
    const [formUrl, setFormUrl] = useState('');
    const [result, setResult] = useState({});
    const [formSchema, setFormSchema] = useState({});
    // const formSchema = useRef({});
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

    const [{ data: getFormsSchemaByNameData }, getFormsSchemaByName] = useAxios(
        apiSetting.FormSchema.getFormsSchemaByName(encodeURI('請假表')),
        { manual: true }
    );

    const [
        {
            data: updateFormDataData,
            loading: updateFormDataLoading,
            error: updateFormDataError,
            response: updateFormDataResponse
        },
        updateFormData
    ] = useAxios(apiSetting.Form.updateFormData(_get(router, 'query.form_id')), {
        manual: true
    });

    useEffect(() => {
        getFormsSchemaByName();
    }, []);

    useEffect(() => {
        if (router.query.form_url && router.query.result) {
            setFormUrl(`${router.query.form_url}`);
            setResult(JSON.parse(`${router.query.result}`));
        }
    }, [router]);

    useEffect(() => {
        if (getFormsSchemaByNameData && getFormsSchemaByNameData.success === true) {
            setFormSchema(getFormsSchemaByNameData.form_schema.form_schema);
        }
    }, [getFormsSchemaByNameData]);

    useEffect(() => {
        if (updateFormDataData && updateFormDataData.success === true) {
            alert('請假表提交成功！');
            router.push('/');
        }
    }, [updateFormDataData]);

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
                    absenceFormFormik
                }}
            />
        </>
    );
}

export default ValidateContainer;
