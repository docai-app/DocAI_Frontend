import { useCallback, useEffect, useRef, useState } from 'react';
import AbsenceApprovalView from './AbsenceApprovalView';
import useAxios from 'axios-hooks';
import Api from '../../../../apis/index';
import { useRouter } from 'next/router';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { FieldProps, WidgetProps } from '@rjsf/core';

const apiSetting = new Api();

function AbsenceApprovalContainer() {
    const router = useRouter();
    const [formUrl, setFormUrl] = useState('');
    const [result, setResult] = useState({});
    const formSchema = useRef({});

    const approvalButtonContainer = useCallback(
        (props) => (
            <div className="flex gap-2">
                <button
                    className="p-[0.75rem] rounded bg-green-600 text-white leading-none focus:ring-4 focus:ring-green-600/50"
                    type="submit"
                    onClick={() => {
                        props.onChange('approved');
                    }}
                >
                    批准
                </button>
                <button
                    className="p-[0.75rem] rounded bg-red-600 text-white leading-none focus:ring-4 focus:ring-red-600/50"
                    type="submit"
                    onClick={() => {
                        props.onChange('rejected');
                    }}
                >
                    拒絕
                </button>
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
    const uiSchema = useRef({
        'ui:submitButtonOptions': {
            norender: true
        },
        approval: {
            'ui:widget': approvalButtonContainer
        }
    });

    const [{ data: getFormsSchemaByNameData }, getFormsSchemaByName] = useAxios(
        apiSetting.FormSchema.getFormsSchemaByName(encodeURI('請假表')),
        { manual: false }
    );

    const [{ data: getAbsenceFormByApprovalIdData }, getAbsenceFormByApprovalId] = useAxios('', {
        manual: true
    });

    const [{}, updateAbsenceFormApprovalStatus] = useAxios(
        apiSetting.Absence.updateAbsenceFormApprovalStatus('', ''),
        { manual: true }
    );

    const onSubmit = useCallback(
        async (formData: any) => {
            const { approval } = formData.formData;
            if (router.query.id) {
                const res = await updateAbsenceFormApprovalStatus(
                    apiSetting.Absence.updateAbsenceFormApprovalStatus(
                        router.query.id.toString(),
                        approval
                    )
                );
                if (res.data.status) {
                    alert('審批成功！');
                    router.push(`/absence/approval?status=${approval}`);
                }
            }
        },
        [router, updateAbsenceFormApprovalStatus]
    );

    useEffect(() => {
        getFormsSchemaByName();
    }, []);

    useEffect(() => {
        if (router.query.id) {
            getAbsenceFormByApprovalId(
                apiSetting.Absence.getAbsenceFormByApprovalApprovalID(router.query.id.toString())
            );
        }
    }, [router]);

    useEffect(() => {
        if (getAbsenceFormByApprovalIdData && getAbsenceFormByApprovalIdData.status === true) {
            setFormUrl(getAbsenceFormByApprovalIdData.absences_form.storage_url);
            setResult(
                JSON.parse(getAbsenceFormByApprovalIdData.absences_form.form_details[0].data)
            );
        }
    }, [getAbsenceFormByApprovalIdData]);

    useEffect(() => {
        if (getFormsSchemaByNameData && getFormsSchemaByNameData.status === true) {
            formSchema.current = JSON.parse(getFormsSchemaByNameData.forms_schema.form_schema);
            _set(formSchema.current, 'properties.approval', {
                title: '',
                type: 'string'
            });
        }
    }, [getFormsSchemaByNameData]);

    return (
        <>
            <AbsenceApprovalView
                {...{
                    formUrl,
                    result,
                    formSchema,
                    uiSchema,
                    widgets,
                    fields,
                    onSubmit
                }}
            />
        </>
    );
}

export default AbsenceApprovalContainer;
