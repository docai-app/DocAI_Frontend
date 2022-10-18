import _findKey from 'lodash/findKey';
import Link from 'next/link';
import { DownloadIcon } from '@heroicons/react/solid';
import { Parser } from 'json2csv';
import _get from 'lodash/get';
import { useState } from 'react';
import MyDateDropdown from '../../../components/common/Widget/MyDateDropdown';
import moment from 'moment';
import PaginationView from '../../../components/common/Widget/PaginationView';
import InputRemarkModal from '../../../components/common/Widget/InputRemarkModal';

function ApprovalView(props: any) {
    const {
        data = [],
        meta,
        currentTabStatus,
        setCurrentTabStatus,
        currentTypeTabStatus,
        setCurrentTypeTabStatus,
        formSchema,
        loading,
        setDays,
        setDepartment,
        onSubmit,
        setDocuments,
        uploadLoading
    } = props;
    const [visable, setVisable] = useState(false);
    const [absenceFormId, setAbsenceFormId] = useState('');
    const fields = [
        {
            label: '員工編號',
            value: 'employee_id'
        },
        {
            label: '員工姓名',
            value: 'employee_name'
        },
        {
            label: '工作部門',
            value: 'working_department'
        },
        {
            label: '申請假期類別',
            value: 'type_of_leave'
        },
        {
            label: '職稱',
            value: 'employee_position'
        },
        {
            label: '申請理由',
            value: 'reason_of_absence'
        },
        {
            label: '填表日期',
            value: 'date_of_filling'
        }
        // {
        //     label: '申請放假日期',
        //     value: 'duration_of_absence'
        // },
        // {
        //     label: '店長/部門主管簽名及意見',
        //     value: 'administrative_approval'
        // }
    ];

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
        data.map((item: any) => {
            const itemJSON = item.form_data.data;
            const tempData = itemJSON;
            const working_department = _findKey(itemJSON.working_department, function (value) {
                return value === true;
            });
            const type_of_leave = _findKey(itemJSON.type_of_leave, function (value: boolean) {
                return value === true;
            });
            tempData.working_department = working_department;
            tempData.type_of_leave =
                formSchema.properties.type_of_leave.properties[`${type_of_leave}`].title;
            absencesFormData.push(tempData);
        });
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(absencesFormData);
        const link = document.createElement('a');
        link.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
        link.download = '請假表.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <>
            {/* <div className="bg-indigo-700 py-6">
                <div className="container mx-auto px-4 lg:px-6">
                    <h1 className="text-white text-3xl font-bold">請假審批</h1>
                </div>
            </div> */}
            <div className="my-0 container mx-auto md:px-4 lg:px-6">
                <div className="mb-2  ">
                    <ul className="flex flex-row -my-px">
                        <li
                            onClick={() => setCurrentTypeTabStatus('vacation')}
                            className={`p-4 cursor-pointer ${
                                currentTypeTabStatus === 'vacation'
                                    ? 'text-black border-b-2 border-black'
                                    : 'text-gray-400'
                            } font-bold text-sm`}
                        >
                            請假紙
                        </li>
                        <li
                            onClick={() => setCurrentTypeTabStatus('normal')}
                            className={`p-4 cursor-pointer ${
                                currentTypeTabStatus === 'normal'
                                    ? 'text-black border-b-2 border-black'
                                    : 'text-gray-400'
                            } font-bold text-sm`}
                        >
                            普通文件
                        </li>
                        <li
                            onClick={() => setCurrentTypeTabStatus('factory')}
                            className={`p-4 cursor-pointer ${
                                currentTypeTabStatus === 'factory'
                                    ? 'text-black border-b-2 border-black'
                                    : 'text-gray-400'
                            } font-bold text-sm`}
                        >
                            工場維修
                        </li>
                        <li
                            onClick={() => setCurrentTypeTabStatus('shop')}
                            className={`p-4 cursor-pointer ${
                                currentTypeTabStatus === 'shop'
                                    ? 'text-black border-b-2 border-black'
                                    : 'text-gray-400'
                            } font-bold text-sm`}
                        >
                            店鋪維修
                        </li>
                    </ul>
                </div>
            </div>
            <div className="my-8 container mx-auto md:px-4 lg:px-6">
                <div className="mb-4 border-gray-300 border-b">
                    <ul className="flex flex-row -my-px">
                        <li
                            onClick={() => setCurrentTabStatus('awaiting')}
                            className={`p-4 cursor-pointer ${
                                currentTabStatus === 'awaiting'
                                    ? 'text-indigo-700 border-b-2 border-indigo-700'
                                    : 'text-gray-400'
                            } font-bold text-sm`}
                        >
                            待審批
                        </li>
                        <li
                            onClick={() => setCurrentTabStatus('approved')}
                            className={`p-4 cursor-pointer ${
                                currentTabStatus === 'approved' || currentTabStatus === 'rejected'
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
                                    {currentTypeTabStatus === 'vacation' ? (
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
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={downloadCSV}
                                >
                                    <DownloadIcon
                                        className="-ml-0.5 mr-2 h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    下載請假表
                                </button>
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
                                            {currentTypeTabStatus === 'vacation' ? (
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
                                            {/* <th scope="col" className="px-6 py-3 text-right">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={downloadCSV}
                                                >
                                                    <DownloadIcon
                                                        className="-ml-0.5 mr-2 h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                    下載請假表
                                                </button>
                                            </th> */}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {data.map((item: any, index: number) => {
                                            const {
                                                id = null,
                                                remark = null,
                                                approval_status = null,
                                                signature = null,
                                                signature_image_url = null
                                            } = item;
                                            const { storage_url: formUrl = null } = item.document;
                                            if (
                                                item.form_data?.data == null &&
                                                currentTypeTabStatus === 'vacation'
                                            )
                                                return;
                                            const {
                                                employee_id = null,
                                                employee_name = null,
                                                reason_of_absence = null,
                                                employee_position = null,
                                                type_of_leave: type_of_leave_obj = null,
                                                working_department: working_department_obj = null
                                            } = item.form_data?.data || {};
                                            const created_at = moment(item.created_at).fromNow();
                                            const type_of_leave = _findKey(
                                                type_of_leave_obj,
                                                (value) => value
                                            );
                                            const working_department = _findKey(
                                                working_department_obj,
                                                (value) => value
                                            );
                                            return (
                                                <tr key={id}>
                                                    <td className="px-6 py-4 text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 text-left">
                                                        {formUrl &&
                                                        formUrl.split('.').pop() === 'pdf' ? (
                                                            <object
                                                                className="object-center object-cover   flex justify-center items-center"
                                                                type="application/pdf"
                                                                data={formUrl + '#toolbar=0'}
                                                                width="200"
                                                                height={200}
                                                            >
                                                                <img
                                                                    src={
                                                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                                                                    }
                                                                    alt="PDF file icon"
                                                                    className="w-1/3 h-1/3 object-contain object-center"
                                                                />
                                                            </object>
                                                        ) : (
                                                            <img
                                                                className="object-contain h-full object-center  "
                                                                style={{ width: 200, height: 200 }}
                                                                src={formUrl}
                                                                alt={formUrl}
                                                            />
                                                        )}
                                                    </td>
                                                    {currentTypeTabStatus === 'vacation' ? (
                                                        <td className="px-6 py-4 text-left overflow-hidden">
                                                            <div className="flex flex-row  text-sm">
                                                                <div className="flex-1">
                                                                    <label>員工編號:</label>
                                                                </div>
                                                                <div className="flex-1 text-left  text-sm">
                                                                    <label className="text-sm font-bold">
                                                                        {employee_id}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-row  text-sm">
                                                                <div className="flex-1">
                                                                    <label>員工姓名:</label>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <label className="text-sm font-bold">
                                                                        {employee_name}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-row  text-sm">
                                                                <div className="flex-1">
                                                                    <label>職稱:</label>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <label className="text-sm font-bold">
                                                                        {employee_position || ''}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-row text-sm">
                                                                <div className="flex-1">
                                                                    <label>申請理由:</label>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <label className="text-sm font-bold">
                                                                        {reason_of_absence}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-row  text-sm">
                                                                <div className="flex-1">
                                                                    <label>工作部門:</label>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <label className="text-sm font-bold">
                                                                        {working_department &&
                                                                            _get(
                                                                                formSchema,
                                                                                `properties.working_department.properties[${working_department}].title`
                                                                            )}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-row  text-sm">
                                                                <div className="flex-1">
                                                                    <label>申請假期類別:</label>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <label className="text-sm font-bold">
                                                                        {type_of_leave &&
                                                                            _get(
                                                                                formSchema,
                                                                                `properties.type_of_leave.properties[${type_of_leave}].title`
                                                                            )}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <a
                                                                href={formUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-sm text-indigo-600 underline"
                                                            >
                                                                更多{'>>'}
                                                            </a>
                                                            {/* {reason_of_absence} */}
                                                        </td>
                                                    ) : null}
                                                    {/* <td className="px-6 py-4 text-left">
                                                        {type_of_leave &&
                                                            _get(
                                                                formSchema,
                                                                `properties.type_of_leave.properties[${type_of_leave}].title`
                                                            )}
                                                    </td> */}
                                                    <td className="px-6 py-4 text-left">
                                                        {created_at}
                                                    </td>
                                                    <td className="py-3.5 pl-3 pr-4 sm:pr-6 text-left">
                                                        {approval_status === 'awaiting' ? (
                                                            currentTypeTabStatus == 'vacation' ? (
                                                                <Link
                                                                    href={`/absence/approval/${id.toString()}`}
                                                                >
                                                                    <a className=" cursor-pointer text-indigo-600 hover:text-indigo-900 underline">
                                                                        立即審批
                                                                    </a>
                                                                </Link>
                                                            ) : (
                                                                <a
                                                                    onClick={() => {
                                                                        setAbsenceFormId(
                                                                            id.toString()
                                                                        );
                                                                        setVisable(true);
                                                                    }}
                                                                    className=" cursor-pointer text-indigo-600 hover:text-indigo-900 underline"
                                                                >
                                                                    立即審批
                                                                </a>
                                                            )
                                                        ) : approval_status === 'approved' ? (
                                                            // <a className="text-green-600 hover:text-green-900 underline">
                                                            //     已審批
                                                            // </a>
                                                            <div>
                                                                <p className=" text-green-600 text-sm">
                                                                    <label className="text-xl">
                                                                        ●
                                                                    </label>
                                                                    {signature} 批准
                                                                </p>
                                                                <p className="text-sm">
                                                                    備註：{remark || '無'}
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            // <a className="text-red-600 hover:text-red-900 underline">
                                                            //     已拒絕
                                                            // </a>
                                                            <div>
                                                                <p className=" text-red-600 text-sm">
                                                                    <label className="text-xl">
                                                                        ●
                                                                    </label>
                                                                    {signature} 拒絕
                                                                </p>
                                                                <p className="text-sm">
                                                                    備註：{remark || '無'}
                                                                </p>
                                                            </div>
                                                        )}
                                                        {signature_image_url && (
                                                            <img
                                                                src={signature_image_url}
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
            <PaginationView meta={meta} pathname={'/absence/approval'} params={null} />
            <InputRemarkModal
                visable={visable}
                approval={'approved'}
                uploadLoading={uploadLoading}
                cancelClick={() => setVisable(false)}
                confirmClick={(data: any) => {
                    setVisable(false);
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
