import { useCallback, useEffect, useRef, useState } from 'react';
import AbsenceApprovalView from './AbsenceApprovalView';
import useAxios from 'axios-hooks';
import Api from '../../../../apis/index';
import { useRouter } from 'next/router';
import _get from 'lodash/get';
import { FieldProps, WidgetProps } from '@rjsf/core';

const apiSetting = new Api();

function AbsenceApprovalContainer() {
    const router = useRouter();
    const [formUrl, setFormUrl] = useState('');
    const [result, setResult] = useState({});
    const formSchema = useRef({
        type: 'object',
        required: ['employee_name', 'department', 'employee_id'],
        properties: {
            type_of_absence: {
                type: 'object',
                title: '請假類型',
                properties: {
                    emergency: {
                        type: 'boolean',
                        title: '緊急'
                    },
                    電話通知: {
                        type: 'boolean',
                        title: '電話通知'
                    },
                    pre_approved: {
                        type: 'boolean',
                        title: '預先批准'
                    }
                }
            },
            type_of_leave: {
                type: 'object',
                title: '假期類型',
                properties: {
                    vacation: {
                        type: 'boolean',
                        title: '放假'
                    },
                    sick: {
                        type: 'boolean',
                        title: '病假'
                    },
                    non_paid: {
                        type: 'boolean',
                        title: '無薪'
                    },
                    personal_necessity: {
                        type: 'boolean',
                        title: '個人需要'
                    },
                    personal_business: {
                        type: 'boolean',
                        title: '事假'
                    },
                    comp_time_used: {
                        type: 'boolean',
                        title: '補休'
                    },
                    workers_comp: {
                        type: 'boolean',
                        title: '員工補償'
                    },
                    bereavement: {
                        type: 'boolean',
                        title: '喪假'
                    },
                    other: {
                        type: 'boolean',
                        title: '其他'
                    }
                }
            },
            employee_name: {
                type: 'string',
                title: '員工名稱'
            },
            department: {
                type: 'string',
                title: '部門'
            },
            employee_id: {
                type: 'string',
                title: '員工編號'
            },
            administrator: {
                type: 'boolean',
                title: '行政人員'
            },
            duration_of_absence: {
                type: 'object',
                title: '缺勤時間',
                properties: {
                    date_of_absence: {
                        type: 'string',
                        title: '申請放假日期'
                    },
                    hours_per_day: {
                        type: 'string',
                        title: '每天時數'
                    },
                    total_days: {
                        type: 'string',
                        title: '請假天數'
                    },
                    total_hours: {
                        type: 'string',
                        title: '請假時數'
                    },
                    reason_of_absence: {
                        type: 'string',
                        title: '申請理由'
                    }
                }
            },
            date_of_filling: {
                type: 'string',
                title: '填表日期'
            },
            approval: {
                title: '',
                type: 'string'
            }
        }
    });

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

    const [
        {
            data: getAbsenceFormByApprovalIdData,
            loading: getAbsenceFormByApprovalIdLoading,
            error: getAbsenceFormByApprovalIdError,
            response: getAbsenceFormByApprovalIdResponse
        },
        getAbsenceFormByApprovalId
    ] = useAxios('', { manual: true });

    const [
        {
            data: updateAbsenceFormApprovalStatusData,
            loading: updateAbsenceFormApprovalStatusLoading,
            error: updateAbsenceFormApprovalStatusError,
            response: updateAbsenceFormApprovalStatusResponse
        },
        updateAbsenceFormApprovalStatus
    ] = useAxios('', { manual: true });

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
        if (router.query.id) {
            getAbsenceFormByApprovalId(
                apiSetting.Absence.getAbsenceFormByApprovalApprovalID(router.query.id.toString())
            );
        }
    }, [router]);

    useEffect(() => {
        if (getAbsenceFormByApprovalIdData && getAbsenceFormByApprovalIdData.status === true) {
            console.log(getAbsenceFormByApprovalIdData);
            setFormUrl(getAbsenceFormByApprovalIdData.absences_form.storage_url);
            setResult(
                JSON.parse(getAbsenceFormByApprovalIdData.absences_form.form_details[0].data)
            );
        }
    }, [getAbsenceFormByApprovalIdData]);

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
