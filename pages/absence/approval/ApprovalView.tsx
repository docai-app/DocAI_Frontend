import _findKey from 'lodash/findKey';
import Link from 'next/link';
import { DownloadIcon } from '@heroicons/react/solid';
import { Parser } from 'json2csv';
import _get from 'lodash/get';
import MyDropdown from '../../../components/common/Widget/MyDropdown';
import { useState } from 'react';
import MyDateDropdown from '../../../components/common/Widget/MyDateDropdown';
import  moment  from 'moment';
import PaginationView from '../../../components/common/Widget/PaginationView';

function ApprovalView(props: any) {
    const { data = [], meta, currentTabStatus, setCurrentTabStatus,currentTypeTabStatus, setCurrentTypeTabStatus, formSchema, loading, days, setDays, error } = props;
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
        },
    ]
    const statusDatas = [
        {
            name: '已批准',
            value: 'approved'
        },
        {
            name: '已拒絕',
            value: 'rejected'
        }
    ]
    const [date, setDate] = useState(dates[0].name)
    const [status, setStatus] = useState(statusDatas[0].name)

    const onSwitch = (date: any) => {
        setDate(date.name)
        setDays(date.value)
    }
    const onSwitchStatus = (status: any) => {
        setStatus(status.name)
        setCurrentTabStatus(status.value)
    }
    const downloadCSV = () => {
        let absencesFormData: Array<any> = [];
        data.map((item: any) => {
            const itemJSON = item.form_data.data;
            let tempData = itemJSON;
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
                            <div className='flex flex-row justify-between m-4'>
                                <div className='flex flex-row'>
                                    <MyDateDropdown value={date} datas={dates} onSwitch={onSwitch} />
                                    { (currentTabStatus === 'approved' || currentTabStatus === 'rejected') &&
                                        <div className='ml-4'>
                                            <MyDateDropdown value={status} datas={statusDatas} onSwitch={onSwitchStatus} />
                                        </div>
                                    }
                                    
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
                                            <th scope="col" className="px-6 py-3 text-left w-1/3">
                                                內容
                                            </th>
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
                                            //console.log(data);
                                            const {
                                                id = null,
                                                remark = null,
                                                approval_status = null
                                            } = item;
                                            const {
                                                storage_url: formUrl = null
                                            } = item.document;
                                            if (item.form_data.data == null) return;
                                            const {
                                                employee_id = null,
                                                employee_name = null,
                                                reason_of_absence = null,
                                                employee_position = null,
                                                type_of_leave: type_of_leave_obj = null,
                                                working_department: working_department_obj = null,
                                                // formUrl = 'https://m2mda.blob.core.windows.net/chyb-document-storage/23fbc66d-2cd3-4e26-8eea-031eb6d99651_de0bf284-ceaa-4baf-beef-e89ddf1f27ad_20220618111108227.jpg'
                                            } = item.form_data.data;
                                            
                                            const created_at = moment(item.form_data.created_at).startOf('day').fromNow();
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
                                                        {index+1}
                                                    </td>
                                                    <td className="px-6 py-4 text-left">
                                                        {formUrl && formUrl.split('.').pop() === 'pdf' ? (
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
                                                                style={{width: 200, height: 200}}
                                                                src={formUrl}
                                                                alt={formUrl}
                                                            />
                                                        )}

                                                    </td>
                                                    <td className="px-6 py-4 text-left overflow-hidden">
                                                        <div className='flex flex-row  text-sm'>
                                                            <div className='flex-1'>
                                                                <label>員工編號:</label>
                                                            </div>
                                                            <div className='flex-1 text-left  text-sm'>
                                                                <label className='text-sm font-bold'>{employee_id}</label>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-row  text-sm'>
                                                            <div className='flex-1'>
                                                                <label>員工姓名:</label>
                                                            </div>
                                                            <div className='flex-1'>
                                                                <label className='text-sm font-bold'>{employee_name}</label>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-row  text-sm'>
                                                            <div className='flex-1'>
                                                                <label>職稱:</label>
                                                            </div>
                                                            <div className='flex-1'>
                                                                <label className='text-sm font-bold'>{employee_position || ''}</label>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-row text-sm'>
                                                            <div className='flex-1'>
                                                                <label>申請理由:</label>
                                                            </div>
                                                            <div className='flex-1'>
                                                                <label className='text-sm font-bold'>{reason_of_absence}</label>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-row  text-sm'>
                                                            <div className='flex-1'>
                                                                <label>工作部門:</label>
                                                            </div>
                                                            <div className='flex-1'>
                                                                <label className='text-sm font-bold'>
                                                                    {working_department &&
                                                                        _get(
                                                                            formSchema,
                                                                            `properties.working_department.properties[${working_department}].title`
                                                                    )}      
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-row  text-sm'>
                                                            <div className='flex-1'>
                                                                <label>申請假期類別:</label>
                                                            </div>
                                                            <div className='flex-1'>
                                                                <label className='text-sm font-bold'>
                                                                    {type_of_leave &&
                                                                    _get(
                                                                        formSchema,
                                                                        `properties.type_of_leave.properties[${type_of_leave}].title`
                                                                    )}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <a href={formUrl} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 underline">
                                                            更多{'>>'}
                                                        </a>
                                                        {/* {reason_of_absence} */}
                                                    </td>
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
                                                                <Link
                                                                    href={`/absence/approval/${id.toString()}`}
                                                                >
                                                                    <a className=" cursor-pointer text-indigo-600 hover:text-indigo-900 underline">
                                                                        立即審批
                                                                    </a>
                                                                </Link>
                                                            ) : approval_status === 'approved' ? (
                                                                // <a className="text-green-600 hover:text-green-900 underline">
                                                                //     已審批
                                                                // </a>
                                                                <div>
                                                                    <p className=' text-green-600 text-sm'><label className='text-xl'>●</label>***批准</p>
                                                                    <p className='text-sm'>備註：{remark || '無'}</p>
                                                                </div>
                                                               
                                                            ) : (
                                                                // <a className="text-red-600 hover:text-red-900 underline">
                                                                //     已拒絕
                                                                // </a>
                                                                <div>
                                                                    <p className=' text-red-600 text-sm'><label className='text-xl'>●</label>***拒絕</p>
                                                                    <p className='text-sm'>備註：{remark || '無'}</p>
                                                                </div>
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
        </>
    );
}

export default ApprovalView;
