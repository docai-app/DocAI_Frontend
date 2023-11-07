// File Path: pages/form/approval/ApprovalView.tsx

import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import { Parser } from 'json2csv';
import moment from 'moment';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import DocumentPreview from '../../../components/common/Widget/DocumentPreview';
import InputRemarkModal from '../../../components/common/Widget/InputRemarkModal';
import MyDateDropdown from '../../../components/common/Widget/MyDateDropdown';
import MyModal from '../../../components/common/Widget/MyModal';
import PaginationView from '../../../components/common/Widget/PaginationView';
import { getDownloadFields, matchFormSchemaAndFormData } from '../../../utils/form';

function ApprovalView(props: any) {
    const {
        data = [],
        meta,
        currentTabStatus,
        setCurrentTabStatus,
        currentTypeTabStatus,
        setCurrentTypeTabStatus,
        formSchema,
        formSchemaList = [],
        loading,
        setDays,
        setDepartment,
        onSubmit,
        setDocuments,
        uploadLoading
    } = props;
    const [visable, setVisable] = useState(false);
    const [visableRemark, setVisableRemark] = useState(false);
    const [approvalStatus, setApprovalStatus] = useState('');
    const [absenceFormId, setAbsenceFormId] = useState('');

    const working_departments = [
        {
            name: '全部',
            value: 'all'
        },
        {
            name: '309',
            value: '309'
        },
        {
            name: 'OFF',
            value: 'off'
        },
        {
            name: 'SML',
            value: 'sml'
        },
        {
            name: 'CPG',
            value: 'cpg'
        },
        {
            name: 'CPG20',
            value: 'cpg20'
        },
        {
            name: 'TSB5',
            value: 'tsb5'
        },
        {
            name: 'HZM',
            value: 'hzm'
        },
        {
            name: 'TSB28',
            value: 'tsb28'
        },
        {
            name: 'BGA',
            value: 'bga'
        },
        {
            name: 'YAO',
            value: 'yao'
        },
        {
            name: 'TPA',
            value: 'tpa'
        },
        {
            name: 'TFT',
            value: 'tft'
        },
        {
            name: 'GLP',
            value: 'glp'
        },
        {
            name: 'MGM',
            value: 'mgm'
        },
        {
            name: 'FTY',
            value: 'fty'
        },
        {
            name: 'CUN',
            value: 'cun'
        },
        {
            name: '其他',
            value: 'other'
        }
    ];

    const statusDatas = [
        {
            name: '已批准',
            value: 'approved'
        },
        {
            name: '已拒絕',
            value: 'rejected'
        }
    ];

    const dates = [
        {
            name: '最近三天',
            value: '3'
        },
        {
            name: '最近一周',
            value: '7'
        },
        {
            name: '最近一個月',
            value: '30'
        },
        {
            name: '最近三個月',
            value: '90'
        },
        {
            name: '最近半年',
            value: '180'
        }
    ];
    const [date, setDate] = useState(dates[0].name);
    const [status, setStatus] = useState(statusDatas[0].name);
    const [working_department, setWorking_departments] = useState(working_departments[0].name);

    const approvalStatusFactory: any = useCallback(
        (
            approval_status: string,
            id: string,
            signature: string,
            remark: string,
            approval_user: any
        ) => {
            if (approval_status === 'awaiting') {
                if (currentTypeTabStatus != 'normal') {
                    return (
                        <Link
                            href={`/form/approval/${id.toString()}?form_schema_id=${currentTypeTabStatus}`}
                        >
                            <a className=" cursor-pointer text-indigo-600 hover:text-indigo-900 underline">
                                立即審批
                            </a>
                        </Link>
                    );
                } else {
                    return (
                        <Link
                            href={`/form/approval/normal/?id=${id.toString()}`}
                        >
                            <a className=" cursor-pointer text-indigo-600 hover:text-indigo-900 underline">
                                立即審批
                            </a>
                        </Link>
                        // <a
                        //     onClick={() => {
                        //         setAbsenceFormId(id.toString());
                        //         setVisable(true);
                        //     }}
                        //     className=" cursor-pointer text-indigo-600 hover:text-indigo-900 underline"
                        // >
                        //     立即審批
                        // </a>
                    );
                }
            } else if (approval_status === 'approved') {
                return (
                    <div>
                        <p className=" text-green-600 text-sm">
                            <label className="text-xl">●</label>
                            {signature} 批准
                        </p>
                        {approval_user ? (
                            <p className=" text-green-600 text-sm">
                                用戶 {approval_user.nickname} 進行了操作
                            </p>
                        ) : null}
                        <p className="text-sm">備註：{remark || '無'}</p>
                    </div>
                );
            } else if (approval_status === 'rejected') {
                return (
                    <div>
                        <p className=" text-red-600 text-sm">
                            <label className="text-xl">●</label>
                            {signature} 拒絕
                        </p>
                        {approval_user ? (
                            <p className=" text-red-600 text-sm">
                                用戶 {approval_user.nickname} 進行了操作
                            </p>
                        ) : null}
                        <p className="text-sm">備註：{remark || '無'}</p>
                    </div>
                );
            }
        },
        [currentTypeTabStatus]
    );

    const onSwitch = (date: any) => {
        setDate(date.name);
        setDays(date.value);
    };
    const onSwitchWorkingDepartment = (working_department: any) => {
        setWorking_departments(working_department.name);
        setDepartment(working_department.value);
    };
    const onSwitchStatus = (status: any) => {
        setStatus(status.name);
        setCurrentTabStatus(status.value);
    };
    const downloadCSV = () => {
        const absencesFormData: Array<any> = [];
        let fields: any[] = [];
        data.map((item: any, i: number) => {
            const itemJSON = item.form_data.data;
            const tempData: any = {};
            const matchedData: any[] = matchFormSchemaAndFormData(formSchema, itemJSON);
            matchedData.map((item: any) => {
                tempData[item.keyName] = item.value;
            });
            tempData['storage_url'] = item.document.storage_url;
            absencesFormData.push(tempData);
            if (i + 1 === data.length) {
                fields = getDownloadFields(matchedData);
            }
            fields.push({
                label: '文檔連結',
                value: 'storage_url'
            });
        });
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(absencesFormData);
        const link = document.createElement('a');
        link.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
        link.download = `${formSchema?.title}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <>
            <div className="my-0 container mx-auto md:px-4 lg:px-6">
                <div className="mb-2  ">
                    <ul className="flex flex-row -my-px flex-wrap">
                        <li
                            onClick={() => setCurrentTypeTabStatus('normal')}
                            className={`p-4 cursor-pointer ${currentTypeTabStatus === 'normal'
                                ? 'text-black border-b-2 border-black'
                                : 'text-gray-400'
                                } font-bold text-sm`}
                        >
                            普通文件
                        </li>
                        {formSchemaList.map((item: any) => {
                            return (
                                <li
                                    key={item.id}
                                    onClick={() => setCurrentTypeTabStatus(item.id)}
                                    className={`p-4 cursor-pointer ${currentTypeTabStatus === item.id
                                        ? 'text-black border-b-2 border-black'
                                        : 'text-gray-400'
                                        } font-bold text-sm`}
                                >
                                    {item.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="my-8 container mx-auto md:px-4 lg:px-6">
                <div className="mb-4 border-gray-300 border-b">
                    <ul className="flex flex-row -my-px">
                        <li
                            onClick={() => setCurrentTabStatus('awaiting')}
                            className={`p-4 cursor-pointer ${currentTabStatus === 'awaiting'
                                ? 'text-indigo-700 border-b-2 border-indigo-700'
                                : 'text-gray-400'
                                } font-bold text-sm`}
                        >
                            待審批
                        </li>
                        <li
                            onClick={() => setCurrentTabStatus('approved')}
                            className={`p-4 cursor-pointer ${currentTabStatus === 'approved' || currentTabStatus === 'rejected'
                                ? 'text-indigo-700 border-b-2 border-indigo-700'
                                : 'text-gray-400'
                                } font-bold text-sm`}
                        >
                            已審批
                        </li>
                    </ul>
                </div>
                {loading ? (
                    <div>載入中...</div>
                ) : (
                    data && (
                        <>
                            <div className="flex flex-row justify-between m-4">
                                <div className="flex flex-row">
                                    <MyDateDropdown
                                        value={date}
                                        datas={dates}
                                        onSwitch={onSwitch}
                                    />
                                    {currentTypeTabStatus != 'normal' &&
                                        formSchema?.title === '請假表' ? (
                                        <div className="ml-4">
                                            <MyDateDropdown
                                                value={working_department}
                                                datas={working_departments}
                                                onSwitch={onSwitchWorkingDepartment}
                                            />
                                        </div>
                                    ) : null}
                                    {(currentTabStatus === 'approved' ||
                                        currentTabStatus === 'rejected') && (
                                            <div className="ml-4">
                                                <MyDateDropdown
                                                    value={status}
                                                    datas={statusDatas}
                                                    onSwitch={onSwitchStatus}
                                                />
                                            </div>
                                        )}
                                </div>
                                {currentTypeTabStatus != 'normal' ? (
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={downloadCSV}
                                    >
                                        <ArrowDownTrayIcon
                                            className="-ml-0.5 mr-2 h-4 w-4"
                                            aria-hidden="true"
                                        />
                                        下載
                                    </button>
                                ) : null}
                            </div>
                            <div className="shadow w-full sm:rounded-lg overflow-hidden ring-1 ring-black ring-opacity-5">
                                <table className="w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left">
                                                序號
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left">
                                                文檔
                                            </th>
                                            {currentTypeTabStatus != 'normal' ? (
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left w-1/3"
                                                >
                                                    內容
                                                </th>
                                            ) : null}
                                            <th scope="col" className="px-6 py-3 text-left">
                                                上傳日期
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left">
                                                審批狀態
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {data.map((item: any, index: number) => {
                                            const {
                                                id = null,
                                                remark = null,
                                                approval_status = null,
                                                signature = null,
                                                signature_image_url = null,
                                                approval_user = null
                                            } = item;
                                            // console.log(item.approval_user);
                                            // const { storage_url: formUrl = null } = item.document;
                                            const formUrl = item.document?.storage_url;
                                            if (
                                                item.form_data?.data == null &&
                                                currentTypeTabStatus != 'normal'
                                            )
                                                return;
                                            const created_at = moment(item.created_at).fromNow();
                                            return (
                                                <tr key={id}>
                                                    <td className="px-6 py-4 text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 text-left">
                                                        {formUrl && (
                                                            <DocumentPreview
                                                                document={item.document}
                                                            />
                                                        )}
                                                    </td>
                                                    {currentTypeTabStatus != 'normal' ? (
                                                        <td className="px-6 py-4 text-left overflow-hidden">
                                                            {matchFormSchemaAndFormData(
                                                                formSchema,
                                                                item.form_data.data
                                                            ).map((element: any, i: number) => {
                                                                if (
                                                                    element.value === false ||
                                                                    element.value === ''
                                                                )
                                                                    return;
                                                                return (
                                                                    <div
                                                                        key={i}
                                                                        className="flex flex-row text-sm"
                                                                    >
                                                                        <div className="flex-1">
                                                                            <label>
                                                                                {element?.title}:{' '}
                                                                            </label>
                                                                        </div>
                                                                        <div className="flex-1 text-left  text-sm">
                                                                            <label className="text-sm font-bold">
                                                                                {element.value ===
                                                                                    true
                                                                                    ? '✅'
                                                                                    : element.value}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </td>
                                                    ) : null}
                                                    <td className="px-6 py-4 text-left">
                                                        {created_at}
                                                    </td>
                                                    <td className="py-3.5 pl-3 pr-4 sm:pr-6 text-left">
                                                        {approvalStatusFactory(
                                                            approval_status,
                                                            id,
                                                            signature,
                                                            remark,
                                                            approval_user
                                                        )}
                                                        {signature_image_url && (
                                                            <img
                                                                src={signature_image_url}
                                                                alt="signature"
                                                                className="h-20 max-w-md"
                                                            />
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                )}
            </div>
            <PaginationView meta={meta} pathname={'/form/approval'} params={null} />
            <MyModal
                visable={visable}
                description={'是否同意審批？'}
                confirmText={'同意'}
                cancelText={'取消'}
                otherText={'拒絕'}
                cancelClick={() => {
                    console.log('cancelClick');
                    setVisable(false);
                }}
                otherClick={() => {
                    console.log('otherClick');
                    setApprovalStatus('rejected');
                    setVisable(false);
                    setVisableRemark(true);
                }}
                confirmClick={(data: any) => {
                    console.log('confirmClick');
                    setApprovalStatus('approved');
                    setVisable(false);
                    setVisableRemark(true);
                }}
            />
            <InputRemarkModal
                visable={visableRemark}
                approval={approvalStatus}
                uploadLoading={uploadLoading}
                cancelClick={() => setVisableRemark(false)}
                confirmClick={(data: any) => {
                    setVisableRemark(false);
                    onSubmit({
                        ...data,
                        absenceFormId: absenceFormId
                    });
                }}
                setDocuments={(files: any) => {
                    setDocuments(files);
                }}
            />
        </>
    );
}

export default ApprovalView;
