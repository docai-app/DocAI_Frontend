import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PaginationView from '../../../../components/common/Widget/PaginationView';
import SingleActionModel from '../../../../components/common/Widget/SingleActionModel';
import SchemaRow from '../../../../components/feature/document/extraction/SchemaRow';

interface ExtractionDetailViewProps {
    open: boolean;
    setOpen: any;
    label: any;
    currentTypeTab: string;
    setCurrentTypeTab: any;
    smart_extraction_schemas: [];
    meta: any;
}

function ExtractionDetailView(props: ExtractionDetailViewProps) {
    const {
        open,
        setOpen,
        label,
        currentTypeTab,
        setCurrentTypeTab,
        smart_extraction_schemas,
        meta
    } = props;
    const router = useRouter();

    return (
        <>
            <SingleActionModel
                {...{
                    open,
                    setOpen,
                    title: '正在進行中...',
                    content: '正在加載數據',
                    icon: (
                        <PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    )
                }}
            />
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                {label?.name}
                            </h2>
                        </div>
                    </div>
                    <div className="flex float-row flex-wrap">
                        <div className="mb-4 border-gray-300 border-b">
                            <ul className="flex flex-row -my-px">
                                <li
                                    onClick={() => setCurrentTypeTab('extraction')}
                                    className={`p-4 cursor-pointer ${
                                        currentTypeTab === 'extraction'
                                            ? 'text-indigo-700 border-b-2 border-indigo-700'
                                            : 'text-gray-400'
                                    } font-bold text-sm`}
                                >
                                    數據提取
                                </li>
                                <li
                                    onClick={() => setCurrentTypeTab('form_filling')}
                                    className={`p-4 cursor-pointer ${
                                        currentTypeTab === 'form_filling' ||
                                        currentTypeTab === 'form_filling'
                                            ? 'text-indigo-700 border-b-2 border-indigo-700'
                                            : 'text-gray-400'
                                    } font-bold text-sm`}
                                >
                                    填表
                                </li>
                                <li
                                    onClick={() => setCurrentTypeTab('chain_feature')}
                                    className={`p-4 cursor-pointer ${
                                        currentTypeTab === 'chain_feature' ||
                                        currentTypeTab === 'chain_feature'
                                            ? 'text-indigo-700 border-b-2 border-indigo-700'
                                            : 'text-gray-400'
                                    } font-bold text-sm`}
                                >
                                    推薦功能
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="my-2">
                        <div className="flex justify-end">
                            <Link href={`/document/extraction/${router.query.id}/schema`}>
                                <a className=" cursor-pointer block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    新增Schema
                                </a>
                            </Link>
                        </div>
                        <div className="inline-block min-w-full py-0 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                        >
                                            名稱
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            描述
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            創建時間
                                        </th>

                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                        >
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {smart_extraction_schemas?.map((schema: any, index: number) => {
                                        return <SchemaRow schema={schema} key={index} />;
                                    })}
                                </tbody>
                            </table>
                            <PaginationView meta={meta} pathname={'/chatbot'} params={null} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ExtractionDetailView;
