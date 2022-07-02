import _findKey from 'lodash/findKey';
import Link from 'next/link';

function ApprovalView(props: any) {
    const { data = [], currentTabStatus, setCurrentTabStatus, formSchema, loading, error } = props;
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
                        {error && <div>加載資料時發生錯誤！正在顯示範例資料</div>}
                        <div className="shadow w-full sm:rounded-lg overflow-hidden ring-1 ring-black ring-opacity-5">
                            <table className="w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left">
                                            員工姓名
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left">
                                            請假理由
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left">
                                            請假類型
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left">
                                            假期類型
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                        >
                                            <span className="sr-only">審批狀況</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data.map((item: any) => {
                                        const { id, document_id, status } =
                                            item.approval_details[0];
                                        const {
                                            employee_name,
                                            duration_of_absence,
                                            type_of_absence: type_of_absence_obj,
                                            type_of_leave: type_of_leave_obj
                                        } = JSON.parse(item.form_details[0].data);
                                        const { reason_of_absence } = duration_of_absence;
                                        const type_of_absence = _findKey(
                                            type_of_absence_obj,
                                            (value) => value
                                        );
                                        const type_of_leave = _findKey(
                                            type_of_leave_obj,
                                            (value) => value
                                        );
                                        return (
                                            <tr key={id}>
                                                <td className="px-6 py-4 text-left">
                                                    {employee_name}
                                                </td>
                                                <td className="px-6 py-4 text-left">
                                                    {reason_of_absence}
                                                </td>
                                                <td className="px-6 py-4 text-left">
                                                    {type_of_absence &&
                                                        formSchema.properties.type_of_absence
                                                            .properties[type_of_absence].title}
                                                </td>
                                                <td className="px-6 py-4 text-left">
                                                    {type_of_leave &&
                                                        formSchema.properties.type_of_leave
                                                            .properties[type_of_leave].title}
                                                </td>
                                                <td className="py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                                                    <Link
                                                        href={`/absence/approval/${id.toString()}`}
                                                    >
                                                        {status === 'awaiting' ? (
                                                            <a className="text-indigo-600 hover:text-indigo-900 font-bold">
                                                                待審批
                                                            </a>
                                                        ) : status === 'approved' ? (
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
