import { useEffect, useState } from 'react';
import AbsenceApprovalView from './AbsenceApprovalView';
import useAxios from 'axios-hooks';
import Api from '../../../../apis/index';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
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
            }
        }
    });
    const [uiSchema, setUiSchema] = useState({
        'ui:submitButtonOptions': {
            submitText: '批准'
        }
    });
    const absenceFormFormik = useFormik({
        initialValues: {
            form: result
        },
        onSubmit: async (values) => {
            console.log(values.form);
            let res = await updateFormData({
                data: {
                    form: values.form
                }
            });
            console.log(res);
            if (res.data.status === 'success') {
                alert('審批成功！');
                router.push('/');
            }
        }
    });
    const [
        {
            data: lastestPredictionData,
            loading: lastestPredictionLoading,
            error: lastestPredictionError,
            response: lastestPredictionResponse
        },
        updateFormData
    ] = useAxios(apiSetting.Form.updateFormData(_get(router, 'query.form_id')), {
        manual: true
    });

    useEffect(() => {
        console.log(router.query);
        if (router.query.form_url && router.query.result) {
            setFormUrl(`${router.query.form_url}`);
            setResult(JSON.parse(`${router.query.result}`));
            console.log(result);
        }
    }, [router]);

    return (
        <>
            <AbsenceApprovalView 
                {...{
                    formUrl,
                    result,
                    setResult,
                    formSchema,
                    uiSchema,
                    absenceFormFormik
                }}
            />
        </>
    );
}

export default AbsenceApprovalContainer;