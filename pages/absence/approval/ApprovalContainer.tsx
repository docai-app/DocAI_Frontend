import useAxios from 'axios-hooks';
import Api from '../../../apis';
import ApprovalView from './ApprovalView';
import { useEffect, useState } from 'react';

const apiSetting = new Api();

function ApprovalContainer() {
    const [currentTabStatus, setCurrentTabStatus] = useState<'approved' | 'awaiting' | 'rejected'>(
        'awaiting'
    );
    const [
        {
            data: getAbsenceFormByApprovalStatusData,
            loading: getAbsenceFormByApprovalStatusLoading,
            error: getAbsenceFormByApprovalStatusError,
            response: getAbsenceFormByApprovalStatusResponse
        },
        getAbsenceFormByApprovalStatus
    ] = useAxios(apiSetting.Absence.getAbsenceFormByApprovalStatus(currentTabStatus));
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
    const [props, setProps] = useState<any>({
        data: [
            {
                approval_details: [
                    {
                        approved_by: 'a305f520-2a36-4f3b-8bab-72113e04f355',
                        created_at: '2022-06-27 19:06:38.823405',
                        document_id: '1e21e901-fab0-42dc-822c-bcdd7d710c39',
                        id: '6d164356-1be2-49bd-95ac-e1da199ca070',
                        status: 'awaiting',
                        updated_at: '2022-06-27 19:06:38.823377'
                    }
                ],
                content:
                    '缺勤通知/請假 申請☑緊急□ 電話通知□預先批准假期類型放假個人需要□ 喪假☑病假事假與死者關係:(請選擇一個)無薪*補休員工補償 **其他:(僅批准的受傷索賠) *** 需要文件/批准蘇中朱FO名稱部門129編號□行政人員□缺勤時間:(所有員工應填寫)2022/04/298日期每天的時數216總天數總時數說明(如有需要)看醫生of員工簽署主管審查/批准2022/04/23日期日期收到電話通知日期日期正本–_轉發給人力資源部副本– 始發部門最後更新:',
                created_at: '2022-06-27 19:06:25.314595',
                form_details: [
                    {
                        created_at: '2022-06-27 19:06:38.491675',
                        data: '{"department": "FO", "employee_id": "229", "administrator": true, "employee_name": "蘇 中 央", "type_of_leave": {"sick": true, "other": false, "non_paid": false, "vacation": false, "bereavement": false, "workers_comp": false, "comp_time_used": false, "personal_business": false, "personal_necessity": false}, "date_of_filling": "2022/04/23", "type_of_absence": {"call_in": false, "emergency": true, "pre_approved": false}, "duration_of_absence": {"total_days": "2", "total_hours": "16", "hours_per_day": "00", "date_of_absence": "2022/04/29", "reason_of_absence": "看 醫 生"}}',
                        document_id: '1e21e901-fab0-42dc-822c-bcdd7d710c39',
                        id: 'a1fa7b41-2393-467e-871e-0b2b7d388c31',
                        schema_id: '18166bf2-ad61-43d6-a923-993cd594a846',
                        updated_at: '2022-06-27 19:06:38.491664'
                    }
                ],
                id: '1e21e901-fab0-42dc-822c-bcdd7d710c39',
                label_id: 'None',
                name: 'new_absent_form_20_7e.pdf',
                status: 'uploaded',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/1e21e901-fab0-42dc-822c-bcdd7d710c39.pdf',
                updated_at: '2022-06-27 19:06:25.314588'
            },
            {
                approval_details: [
                    {
                        approved_by: 'a305f520-2a36-4f3b-8bab-72113e04f355',
                        created_at: '2022-06-27 18:44:44.005617',
                        document_id: '1a9c4f80-3619-43f1-ba47-9332c17df5a3',
                        id: '38d7f22b-b2c0-4902-ab4a-364fcf627422',
                        status: 'awaiting',
                        updated_at: '2022-06-29 05:20:10.882357'
                    }
                ],
                content:
                    '缺勤通知/請假 申請☑緊急□ 電話通知□預先批准假期類型放假個人需要□ 喪假☑病假事假與死者關係:(請選擇一個)無薪*補休員工補償 **其他:(僅批准的受傷索賠) *** 需要文件/批准蘇中朱FO名稱部門129編號□行政人員□缺勤時間:(所有員工應填寫)2022/04/298日期每天的時數216總天數總時數說明(如有需要)看醫生of員工簽署主管審查/批准2022/04/23日期日期收到電話通知日期日期正本–_轉發給人力資源部副本– 始發部門最後更新:',
                created_at: '2022-06-27 18:44:30.977366',
                form_details: [
                    {
                        created_at: '2022-06-27 18:44:43.802241',
                        data: '{"department": "FO", "employee_id": "229", "administrator": true, "employee_name": "蘇 中 央", "type_of_leave": {"sick": true, "other": false, "non_paid": false, "vacation": false, "bereavement": false, "workers_comp": false, "comp_time_used": false, "personal_business": false, "personal_necessity": false}, "date_of_filling": "2022/04/23", "type_of_absence": {"call_in": false, "emergency": true, "pre_approved": false}, "duration_of_absence": {"total_days": "2", "total_hours": "16", "hours_per_day": "00", "date_of_absence": "2022/04/29", "reason_of_absence": "看醫生！"}}',
                        document_id: '1a9c4f80-3619-43f1-ba47-9332c17df5a3',
                        id: '90ee5920-ad99-4323-af93-87731e8c7ec3',
                        schema_id: '18166bf2-ad61-43d6-a923-993cd594a846',
                        updated_at: '2022-06-27 18:48:51.168052'
                    }
                ],
                id: '1a9c4f80-3619-43f1-ba47-9332c17df5a3',
                label_id: 'None',
                name: 'new_absent_form_20_7e.pdf',
                status: 'uploaded',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/1a9c4f80-3619-43f1-ba47-9332c17df5a3.pdf',
                updated_at: '2022-06-27 18:44:30.977350'
            }
        ],
        currentTabStatus: currentTabStatus,
        setCurrentTabStatus: setCurrentTabStatus,
        formSchema: formSchema
    });

    const changeTab = async () => {
        await getAbsenceFormByApprovalStatus({
            url: `/form/absense/approval?status=${currentTabStatus}`
        });
        setProps({
            data: getAbsenceFormByApprovalStatusData.absencesForm,
            currentTabStatus: currentTabStatus,
            setCurrentTabStatus: setCurrentTabStatus
        });
    };

    useEffect(() => {
        changeTab();
    }, [currentTabStatus]);

    return <ApprovalView {...props} />;
}

export default ApprovalContainer;
