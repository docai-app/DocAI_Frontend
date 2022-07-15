import _findKey from 'lodash/findKey';
import Link from 'next/link';
import { DownloadIcon } from '@heroicons/react/solid';
import { Parser } from 'json2csv';
import _get from 'lodash/get';

function ApprovalView(props: any) {
    const { data = [], currentTabStatus, setCurrentTabStatus, formSchema, loading, error } = props;
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
            <div className="bg-indigo-700 py-6">
                <div className="container mx-auto px-4 lg:px-6">
                    <h1 className="text-white text-3xl font-bold">請假審批</h1>
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
                            尚未審批
                        </li>
                        <li
                            onClick={() => setCurrentTabStatus('approved')}
                            className={`p-4 cursor-pointer ${
                                currentTabStatus === 'approved'
                                    ? 'text-indigo-700 border-b-2 border-indigo-700'
                                    : 'text-gray-400'
                            } font-bold text-sm`}
                        >
                            已審批
                        </li>
                        <li
                            onClick={() => setCurrentTabStatus('rejected')}
                            className={`p-4 cursor-pointer ${
                                currentTabStatus === 'rejected'
                                    ? 'text-indigo-700 border-b-2 border-indigo-700'
                                    : 'text-gray-400'
                            } font-bold text-sm`}
                        >
                            已拒絕
                        </li>
                    </ul>
                </div>
                {loading ? (
                    <div>載入中...</div>
                ) : (
                    <>
                        <div className="shadow w-full sm:rounded-lg overflow-hidden ring-1 ring-black ring-opacity-5">
                            <table className="w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left">
                                            員工編號
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left">
                                            員工姓名
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left">
                                            請假理由
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left">
                                            假期類型
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left">
                                            審批備註
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right">
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
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data.map((item: any) => {
                                        const { id, remark, approval_status } = item;
                                        const {
                                            employee_id,
                                            employee_name,
                                            reason_of_absence,
                                            type_of_leave: type_of_leave_obj
                                        } = item.form_data.data;
                                        const type_of_leave = _findKey(
                                            type_of_leave_obj,
                                            (value) => value
                                        );
                                        return (
                                            <tr key={id}>
                                                <td className="px-6 py-4 text-left">
                                                    {employee_id}
                                                </td>
                                                <td className="px-6 py-4 text-left">
                                                    {employee_name}
                                                </td>
                                                <td className="px-6 py-4 text-left overflow-hidden">
                                                    {reason_of_absence}
                                                </td>
                                                <td className="px-6 py-4 text-left">
                                                    {type_of_leave &&
                                                        _get(
                                                            formSchema,
                                                            `properties.type_of_leave.properties[${type_of_leave}].title`
                                                        )}
                                                </td>
                                                <td className="px-6 py-4 text-left">{remark}</td>
                                                <td className="py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                                                    <Link
                                                        href={`/absence/approval/${id.toString()}`}
                                                    >
                                                        {approval_status === 'awaiting' ? (
                                                            <a className="text-indigo-600 hover:text-indigo-900 font-bold">
                                                                待審批
                                                            </a>
                                                        ) : approval_status === 'approved' ? (
                                                            <a className="text-green-600 hover:text-green-900 font-bold">
                                                                已審批
                                                            </a>
                                                        ) : (
                                                            <a className="text-red-600 hover:text-red-900 font-bold">
                                                                已拒絕
                                                            </a>
                                                        )}
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ApprovalView;
