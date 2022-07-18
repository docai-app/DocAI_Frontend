import { PlusIcon } from '@heroicons/react/outline';
export default function DriveView() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 flex flex-col gap-4">
                <div className="flex flex-row gap-2 pb-4 border-b">
                    <button className="py-2 px-4 bg-indigo-600 text-white rounded shadow flex flex-row items-center gap-2">
                        <PlusIcon className="h-4" />
                        <div className="whitespace-nowrap">新增</div>
                    </button>
                </div>
                <div className="py-3">
                    <a className="hover:underline cursor-pointer text-lg">{`<< 返回`}</a>
                </div>
                <div className="bg-white border shadow-md rounded-md">
                    <table className="w-full divide-y">
                        <thead>
                            <tr>
                                <th className="px-12 py-3 w-5/12 text-left">名稱</th>
                                <th className="px-12 py-3 w-4/12 text-left">修改日期</th>
                                <th className="px-12 py-3 w-3/12 text-left">檔案大小</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Hello.pdf</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
