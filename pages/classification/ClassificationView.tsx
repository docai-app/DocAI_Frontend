import _get from 'lodash/get';
import _map from 'lodash/map';
import { FolderIcon, PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

interface ClassificationViewProps {
    getDocumentsLabelData: object;
}

function ClassificationView(props: ClassificationViewProps) {
    const { getDocumentsLabelData } = props;
    const router = useRouter();
    return (
        <>
            <div className="min-h-full bg-slate-50">
                <header className="shadow bg-white">
                    <div className="flex w-full py-6 px-4 sm:px-6 lg:px-8">
                        <div className="w-full">
                            <h1 className="text-3xl font-bold text-gray-900">文檔類型</h1>
                        </div>
                        <div className="w-full">
                            <button
                                type="button"
                                className="h-full float-right inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => {
                                    router.push('/classification/upload');
                                }}
                            >
                                <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                新增更多
                            </button>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="flex p-4 rounded-lg">
                                <ul
                                    role="list"
                                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                                >
                                    {_map(_get(getDocumentsLabelData, 'labels'), (label) => {
                                        return (
                                            <a
                                                href={
                                                    '/classification/' +
                                                    label.id +
                                                    '?name=' +
                                                    label.name
                                                }
                                                key={label.id}
                                                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                                            >
                                                <div className="flex-1 flex flex-col p-8">
                                                    <FolderIcon
                                                        className="w-24 h-24 flex-shrink-0 mx-auto text-gray-500"
                                                        aria-hidden="true"
                                                    />
                                                    <h3 className="mt-6 text-xl text-gray-900 font-medium">
                                                        {label.name ? label.name : '未分類'}
                                                    </h3>
                                                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                                                        <dt className="sr-only">Role</dt>
                                                        <dd className="mt-3">
                                                            <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                                                {label.name ? label.name : '未分類'}
                                                            </span>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default ClassificationView;
