import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import SingleActionModel from '../../components/common/Widget/SingleActionModel';

interface GenerateViewProps {
    document: any;
    handleQuery: any;
    open: boolean;
    setOpen: any;
    generateContent: string;
    setGenerateContent: any;
    setAlert: any;
}

export default function GenerateView(props: GenerateViewProps) {
    const {
        document,
        handleQuery,
        open,
        setOpen,
        generateContent = '',
        setGenerateContent,
        setAlert
    } = props;
    const [content, setContent] = useState('');
    const submit = () => {
        if (content == '') {
            setAlert({ title: '請填寫內容', type: 'info' });
        } else {
            handleQuery(content);
        }
    };
    return (
        <>
            <SingleActionModel
                {...{
                    open,
                    setOpen,
                    title: '進行中......',
                    content: '正在生成內容...',
                    icon: (
                        <PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    )
                }}
            />
            <div className="min-h-full">
                <header className="bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">智能生成內容</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-0 sm:px-0 lg:px-0">
                        <div className="px-4 pb-8 sm:px-0">
                            <div className="flex justify-center md:items-center flex-col md:flex-row p-0 border-0 border-dashed border-gray-200 bg-white h-80vh">
                                <div className="w-2/5 h-full left-side flex justify-center items-center object-contain object-center">
                                    <div className="w-full md:w-full m-4 h-5/6 border-4 border-dashed border-gray-200 bg-white rounded-lg object-cover">
                                        {document?.storage_url?.split('.').pop() === 'pdf' ? (
                                            <object
                                                className="object-center object-cover w-full h-full flex justify-center items-center"
                                                type="application/pdf"
                                                data={document?.storage_url + '#toolbar=0'}
                                                width="250"
                                            >
                                                <img
                                                    src={
                                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                                                    }
                                                    alt="PDF file icon"
                                                    className="w-1/2 h-1/2 object-contain object-center"
                                                />
                                            </object>
                                        ) : (
                                            <img
                                                className="w-full h-full object-contain object-center lg:w-full lg:h-full"
                                                src={document?.storage_url}
                                                alt={document?.storage_url}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="w-3/5 right-side flex-1 flex flex-col overflow-auto h-5/6">
                                    <p className="flex justify-start font-bold">{document?.name}</p>
                                    <label className="flex justify-start text-sm text-gray-500 ">
                                        根據文件內容生成你想要的內容
                                    </label>

                                    <label className="font-bold mt-4 flex justify-start">
                                        想要生成什麼?
                                    </label>
                                    <div className="mt-2 text-sm flex items-center">
                                        <input
                                            id="type"
                                            name="path_name"
                                            type="string"
                                            placeholder={
                                                '填寫內容...（例如：幫我根據這份文檔寫一封詳細的拒絕批准的繁體中文電子郵件。）'
                                            }
                                            value={content}
                                            onChange={(e) => {
                                                setContent(e.target.value);
                                            }}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mt-2 text-sm flex items-center justify-end">
                                        <a
                                            className=" cursor-pointer"
                                            onClick={() => {
                                                setContent('');
                                            }}
                                        >
                                            清空
                                        </a>
                                        <a
                                            className=" cursor-pointer p-[0.75rem] ml-4 rounded bg-indigo-600 text-white leading-none focus:ring-4 focus:ring-indigo-500"
                                            onClick={() => {
                                                submit();
                                            }}
                                        >
                                            生成
                                        </a>
                                    </div>

                                    <label className="font-bold mt-8 flex justify-start">
                                        生成的內容
                                    </label>
                                    <div className="mt-2 text-sm flex items-center">
                                        <textarea
                                            id="type"
                                            name="path_name"
                                            placeholder={''}
                                            value={generateContent}
                                            onChange={(e) => {
                                                setGenerateContent(e.target.value);
                                            }}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            rows={(generateContent.match(/\n/g) || []).length + 5}
                                        />
                                    </div>
                                    <div className="mt-2 text-sm flex items-center justify-end">
                                        <a
                                            className=" cursor-pointer"
                                            onClick={() => {
                                                setGenerateContent('');
                                            }}
                                        >
                                            清空
                                        </a>
                                        <a
                                            className=" cursor-pointer p-[0.75rem] ml-4 rounded bg-indigo-600 text-white leading-none focus:ring-4 focus:ring-indigo-500"
                                            onClick={() => {
                                                copy(generateContent);
                                                setAlert({
                                                    title: '已複製到粘貼板',
                                                    type: 'success'
                                                });
                                            }}
                                        >
                                            複製生成的內容
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
