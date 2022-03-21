import _get from 'lodash/get';
import _map from 'lodash/map';
import { FolderIcon } from '@heroicons/react/outline';

interface ClassificationViewProps {
    allLabelsData: object;
}

function ClassificationView(props: ClassificationViewProps) {
    const { allLabelsData } = props;
    return (
        <>
            <div className="min-h-full bg-slate-50">
                <header className="shadow bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">文檔類型</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="flex p-4 rounded-lg">
                                <ul
                                    role="list"
                                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {_map(_get(allLabelsData, 'prediction'), (label) => {
                                        return (
                                            <li
                                                key={label[0]}
                                                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                                <div className="flex-1 flex flex-col p-8">
                                                    <FolderIcon
                                                        className="w-24 h-24 flex-shrink-0 mx-auto text-gray-500"
                                                        aria-hidden="true"
                                                    />
                                                    <h3 className="mt-6 text-xl text-gray-900 font-medium">
                                                        {label[1]}
                                                    </h3>
                                                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                                                        <dt className="sr-only">Title</dt>
                                                        <dd className="text-gray-500 text-sm">
                                                            {label[1]}
                                                        </dd>
                                                        <dt className="sr-only">Role</dt>
                                                        <dd className="mt-3">
                                                            <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                                                {label[1]}
                                                            </span>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </li>
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
