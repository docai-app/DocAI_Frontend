import Link from "next/link";

interface ApprovalViewProps {
    data: {
        id: number;
        employee_name: string;
        reason_of_absence: string;
        type_of_absence: string;
        type_of_leave: string;
        storage: string;
    }[];
}

function ApprovalView (props: ApprovalViewProps) {

    const { data } = props;

    return (
        <>
            <div className="bg-indigo-700 py-6">
                <div className="container mx-auto px-4 lg:px-6">
                    <h1 className="text-white text-3xl font-bold">請假審批</h1>
                </div>
            </div>
            <div className="my-8 container mx-auto md:px-4 lg:px-6">
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
                                    <span className="sr-only">審批</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                data.map((item) => {
                                    return (
                                        <tr>
                                            <td className="px-6 py-4 text-left">{ item.employee_name }</td>
                                            <td className="px-6 py-4 text-left">{ item.reason_of_absence }</td>
                                            <td className="px-6 py-4 text-left">{ item.type_of_absence }</td>
                                            <td className="px-6 py-4 text-left">{ item.type_of_leave }</td>
                                            <td className="py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                                                <Link href={ item.storage }>
                                                    <a className="text-indigo-600 hover:text-indigo-900 font-bold">審批</a>
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