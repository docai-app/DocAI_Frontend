import { useEffect, useState } from 'react';
import ValidateView from './ValidateView';
import Api from '../../../apis/index';
import { useRouter } from 'next/router';

const apiSetting = new Api();

function ValidateContainer() {
    const router = useRouter();
    const [formUrl, setFormUrl] = useState('');
    const [result, setResult] = useState([
        {
            type: 'MultipleChoice',
            data: {
                title: '',
                options: [
                    {
                        name: '緊急',
                        selected: true
                    },
                    {
                        name: '電話通知',
                        selected: false
                    },
                    {
                        name: '預先批准',
                        selected: false
                    }
                ]
            }
        },
        {
            type: 'MultipleChoice',
            data: {
                title: '假期類型',
                options: [
                    {
                        name: '放假',
                        selected: false
                    },
                    {
                        name: '病假',
                        selected: true
                    },
                    {
                        name: '無薪*',
                        selected: false
                    },
                    {
                        name: '個人需要',
                        selected: false
                    },
                    {
                        name: '事假',
                        selected: false
                    },
                    {
                        name: '補休',
                        selected: false
                    },
                    {
                        name: '員工補償**',
                        selected: false
                    },
                    {
                        name: '喪假',
                        selected: false
                    },
                    {
                        name: '其他',
                        selected: false
                    }
                ]
            }
        },
        {
            type: 'TextInput',
            data: {
                title: '名稱',
                value: '尹小明'
            }
        },
        {
            type: 'TextInput',
            data: {
                title: '部門',
                value: '保安'
            }
        },
        {
            type: 'TextInput',
            data: {
                title: '編號',
                value: '23'
            }
        },
        {
            type: 'MultipleChoice',
            data: {
                title: '',
                options: [
                    {
                        name: '行政人員',
                        selected: true
                    },
                    {
                        name: '',
                        selected: false
                    },
                    {
                        name: '',
                        selected: false
                    }
                ]
            }
        },
        {
            type: 'DateInput',
            data: {
                title: '日期',
                value: '2022/04/29'
            }
        },
        {
            type: 'NumberInput',
            data: {
                title: '每天的時數',
                value: 12
            }
        },
        {
            type: 'NumberInput',
            data: {
                title: '總天數',
                value: 2
            }
        },
        {
            type: 'NumberInput',
            data: {
                title: '總時數',
                value: 24
            }
        }
    ]);
    const [formSchema, setFormSchema] = useState({
        title: 'A registration form',
        description: 'A simple form example.',
        type: 'object',
        required: ['firstName', 'lastName'],
        properties: {
            firstName: {
                type: 'string',
                title: 'First name',
                default: 'Chuck'
            },
            lastName: {
                type: 'string',
                title: 'Last name'
            },
            telephone: {
                type: 'string',
                title: 'Telephone',
                minLength: 10
            }
        }
    });
    const [uiSchema, setUiSchema] = useState({
        classNames: 'custom-css-class'
    });

    useEffect(() => {
        if (router.query.form_url && router.query.result) {
            setFormUrl(`${router.query.form_url}`);
            // setResult(JSON.parse(`${router.query.result}`));
        }
    }, [router]);

    return (
        <>
            <ValidateView
                {...{
                    formUrl,
                    result,
                    setResult,
                    formSchema,
                    uiSchema
                }}
            />
        </>
    );
}

export default ValidateContainer;
