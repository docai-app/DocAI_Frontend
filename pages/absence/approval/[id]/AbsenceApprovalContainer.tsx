import { useCallback, useEffect, useState } from 'react';
import AbsenceApprovalView from './AbsenceApprovalView';
import useAxios from 'axios-hooks';
import Api from '../../../../apis/index';
import { useRouter } from 'next/router';
import _get from 'lodash/get';

const apiSetting = new Api();

function AbsenceApprovalContainer() {
    const router = useRouter();
    const [formUrl, setFormUrl] = useState('');
    const [result, setResult] = useState({});
    const [formSchema, setFormSchema] = useState({
        title: '請假表',
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

    const [demoFormData, setDemoFormData] = useState({
        department: 'FO',
        employee_id: '229',
        administrator: true,
        employee_name: '蘇 中 央',
        type_of_leave: {
            sick: true,
            other: false,
            non_paid: false,
            vacation: false,
            bereavement: false,
            workers_comp: false,
            comp_time_used: false,
            personal_business: false,
            personal_necessity: false
        },
        date_of_filling: '2022/04/23',
        type_of_absence: { call_in: false, emergency: true, pre_approved: false },
        duration_of_absence: {
            total_days: '2',
            total_hours: '16',
            hours_per_day: '00',
            date_of_absence: '2022/04/29',
            reason_of_absence: '看 醫 生'
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
    const [uiSchema, setUiSchema] = useState({
        'ui:submitButtonOptions': {
            norender: true
        },
        approval: {
            'ui:widget': approvalButtonContainer
        }
    });

    const [
        {
            data: getDocumentByIdData,
            loading: getDocumentByIdLoading,
            error: getDocumentByIdError,
            response: getDocumentByIdResponse
        },
        getDocumentById
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
        (formData: any) => {
            console.log(formData);
            const { approval } = formData.formData;
            if (router.query.id)
                updateAbsenceFormApprovalStatus(
                    apiSetting.Absence.updateAbsenceFormApprovalStatus(
                        router.query.id.toString(),
                        approval
                    )
                );
        },
        [router]
    );

    useEffect(() => {
        if (getDocumentByIdData) {
            setResult(JSON.parse(getDocumentByIdData.form_details[0].data));
            setFormUrl(getDocumentByIdData.storage_url);
        } else if (getDocumentByIdError) {
            setResult(demoFormData);
        }
    }, [getDocumentByIdData, getDocumentByIdError]);

    useEffect(() => {
        console.log(router.query);
        if (router.query.document_id) {
            getDocumentById(
                apiSetting.Document.getDocumentById(router.query.document_id.toString())
            );
        }
    }, [router]);

    return (
        <>
            <AbsenceApprovalView
                {...{
                    formUrl,
                    result,
                    formSchema,
                    uiSchema,
                    onSubmit
                }}
            />
        </>
    );
}

export default AbsenceApprovalContainer;
