import Link from "next/link";
import { useState } from "react";

interface ApprovalViewProps {
    data: {
        id: number;
        employee_name: string;
        reason_of_absence: string;
        type_of_absence: string;
        type_of_leave: string;
        storage: string;
        status: 0 | 1 | 2;
    }[];
}

function ApprovalView (props: ApprovalViewProps) {

    const { data } = props;
    const [currentTab, setCurrentTab] = useState<0 | 1 | 2>(0);

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
                        <li onClick={() => setCurrentTab(0)} className={`p-4 cursor-pointer ${currentTab === 0 ? "text-indigo-700 border-b-2 border-indigo-700" : "text-gray-400"} font-bold text-sm`}>尚未審批</li>
                        <li onClick={() => setCurrentTab(1)} className={`p-4 cursor-pointer ${currentTab === 1 ? "text-indigo-700 border-b-2 border-indigo-700" : "text-gray-400"} font-bold text-sm`}>已審批</li>
                        <li onClick={() => setCurrentTab(2)} className={`p-4 cursor-pointer ${currentTab === 2 ? "text-indigo-700 border-b-2 border-indigo-700" : "text-gray-400"} font-bold text-sm`}>已拒絕</li>
                    </ul>
                </div>
                <div className="shadow w-full sm:rounded-lg overflow-hidden ring-1 ring-black ring-opacity-5">
                    <table className="w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left">員工姓名</th>
                                <th scope="col" className="px-6 py-3 text-left">請假理由</th>
                                <th scope="col" className="px-6 py-3 text-left">請假類型</th>
                                <th
                                    scope="col" className="px-6 py-3 text-left">假期類型</th>
                                <th
                                    scope="col"
                                    className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                >
                                    <span className="sr-only">審批狀況</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                data.filter(item => item.status === currentTab).map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 text-left">{item.employee_name}</td>
                                            <td className="px-6 py-4 text-left">{item.reason_of_absence}</td>
                                            <td className="px-6 py-4 text-left">{item.type_of_absence}</td>
                                            <td className="px-6 py-4 text-left">{item.type_of_leave}</td>
                                            <td className="py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                                                <Link href={item.storage}>
                                                    {
                                                        currentTab === 0 ?
                                                        <a className="text-indigo-600 hover:text-indigo-900 font-bold">審批</a>
                                                        : (
                                                            currentTab === 1 ?
                                                            <div className="text-green-600 font-bold">已審批</div>
                                                            : <div className="text-red-600 font-bold">已拒絕</div>
                                                        )
                                                    }
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ApprovalView;