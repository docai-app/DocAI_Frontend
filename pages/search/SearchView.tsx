import _get from 'lodash/get';
import _map from 'lodash/map';
import SingleActionModel from '../../components/common/Widget/SingleActionModel';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PaginationView from '../../components/common/Widget/PaginationView';

interface SearchViewProps {
    searchDocumentFormik: any;
    documents: Array<any>;
    meta: any;
    open: boolean;
    setOpen: any;
}

export default function SearchView(props: SearchViewProps) {
    const {
        searchDocumentFormik = { handleChange: () => {} },
        documents = [],
        meta,
        open,
        setOpen
    } = props;
    return (
        <>
            <SingleActionModel
                {...{
                    open,
                    setOpen,
                    title: '正在搜尋......',
                    content: '文檔搜尋中，請稍候。',
                    icon: (
                        <MagnifyingGlassIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                        />
                    )
                }}
            />
            {/* <div className="bg-indigo-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">DocAI</span>
                        <span className="block">搜尋你的文檔</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-indigo-200">
                        輸入文件的關鍵字或文件的相關內容，我們就會幫你找到你想要的文件。
                    </p>
                    <section className="mt-4 w-full sm:flex sm:items-center justify-center items-center">
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="content" className="sr-only">
                                內容
                            </label>
                            <input
                                type="text"
                                name="content"
                                id="content"
                                className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="輸入文件的關鍵字或文件的相關內容"
                                onChange={searchDocumentFormik.handleChange('content')}
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {
                                searchDocumentFormik.handleSubmit();
                            }}
                        >
                            搜尋 🔍
                        </button>
                    </section>
                </div>
            </div> */}
            <div>
                <p className=" text-black text-xl font-bold">
                    與 "
                    {searchDocumentFormik?.values?.content || searchDocumentFormik?.values?.date}"
                    相關的文檔共有 {meta?.total_count} 份
                </p>
            </div>
            <div className="px-16">
                <div className="mt-8 mb-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {documents.map((document) => (
                        <div
                            key={document.id}
                            className="group relative flex flex-col justify-start items-center p-4 rounded-md hover:bg-gray-100"
                        >
                            <div className="w-3/4 h-60 rounded-md overflow-hidden group-hover:opacity-75">
                                {document.storage_url.split(/[#?]/)[0].split('.').pop().trim() ===
                                'pdf' ? (
                                    <object
                                        className="w-full h-full object-center object-contain"
                                        type="application/pdf"
                                        data={document.storage_url + '#toolbar=0'}
                                    >
                                        <img
                                            src={
                                                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                                            }
                                            alt="PDF file icon"
                                            className="w-full h-full object-contain object-center"
                                        />
                                    </object>
                                ) : (
                                    <img
                                        src={document.storage_url}
                                        alt={document.name}
                                        className="w-full h-full object-contain object-center"
                                    />
                                )}
                            </div>
                            <div className="mt-2 flex justify-center items-center">
                                <a href={document.storage_url} className="text-center">
                                    <p className="relative text-gray-900 text-center text-sm">
                                        {document.name}
                                    </p>
                                    <p className="relative text-gray-400  text-center text-xs">
                                        {document.created_at.split('T')[0]}
                                    </p>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <PaginationView
                    meta={meta}
                    pathname={'/search'}
                    params={
                        searchDocumentFormik?.values?.date
                            ? { date: searchDocumentFormik?.values?.date }
                            : { content: searchDocumentFormik?.values?.content }
                    }
                />
            </div>
        </>
    );
}
