import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import MyDateDropdown from '../../components/common/Widget/MyDateDropdown';
import SingleActionModel from '../../components/common/Widget/SingleActionModel';
import GenerateLogRow from '../../components/feature/generate/TogRow';

interface GenerateViewProps {
    documents_items: any[];
    setDocumentsItems: any;
    handleQuery: any;
    open: boolean;
    setOpen: any;
    generateContent: string;
    setGenerateContent: any;
    setAlert: any;
    logs?: any;
    modalDescription: any;
}

export default function GenerateView(props: GenerateViewProps) {
    const {
        documents_items,
        setDocumentsItems,
        handleQuery,
        open,
        setOpen,
        generateContent = '',
        setGenerateContent,
        setAlert,
        logs,
        modalDescription
    } = props;
    const [content, setContent] = useState('');

    const formats = [
        {
            name: '郵件',
            value: 'email'
        },
        {
            name: '即時通訊',
            value: 'instant message'
        },
        {
            name: '信函',
            value: 'letter'
        }
    ];
    const topics = [
        {
            name: '人力資源',
            value: 'human resource'
        },
        {
            name: '客戶服務',
            value: 'customer service'
        },
        {
            name: '技術服務',
            value: 'technical service'
        },
        {
            name: '行政事務',
            value: 'administrative affairs'
        }
    ];
    const languages = [
        {
            name: '中文(繁體)',
            value: 'Traditional Chinese 🇭🇰'
        },
        {
            name: '中文(简体)',
            value: 'Simplified Chinese 🇨🇳'
        },
        {
            name: 'English',
            value: 'English 🇺🇸'
        }
    ];

    const styles = [
        {
            name: '正式',
            value: 'formal'
        },
        {
            name: '輕鬆',
            value: 'casual'
        }
    ];

    const [format, setFormat] = useState(formats[0]);
    const [language, setLanguage] = useState(languages[0].value);
    const [topic, setTopic] = useState(topics[0]);
    const [style, setStyle] = useState(styles[0].value);

    const onSwitchFormat = (item: any) => {
        setFormat(item);
    };

    const onSwitchTopic = (item: any) => {
        setTopic(item);
    };

    const submit = () => {
        if (content == '') {
            setAlert({ title: '請填寫內容', type: 'info' });
        } else {
            handleQuery(content, format.value, language, topic.value, style);
        }
    };

    const deleteIds = (id: string) => {
        // setDocumentsItems
        setDocumentsItems(documents_items.filter((item: any) => item.id !== id));
    };
    return (
        <>
            <SingleActionModel
                {...{
                    open,
                    setOpen,
                    title: modalDescription?.title,
                    content: modalDescription?.content,
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
                <div className="max-w-7xl mx-auto py-0 px-4">
                    <div className="px-4 pb-4 sm:px-0">
                        <div className="flex justify-start md:items-start flex-col md:flex-row p-0 border-0 border-dashed border-gray-200 bg-white h-60vh">
                            <div className="w-2/5 h-full p-4 left-side flex justify-start items-start object-contain object-center">
                                <div className="w-full md:w-full h-full border-4 border-dashed border-gray-200 bg-white rounded-lg object-cover">
                                    {documents_items && documents_items.length === 1 ? (
                                        <>
                                            {documents_items[0].storage_url?.split('.').pop() ===
                                            'pdf' ? (
                                                <object
                                                    className="object-center object-cover w-full h-full flex justify-center items-center"
                                                    type="application/pdf"
                                                    data={
                                                        documents_items[0]?.storage_url +
                                                        '#toolbar=0'
                                                    }
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
                                                    src={documents_items[0]?.storage_url}
                                                    alt={documents_items[0]?.storage_url}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex-1 border border-gray-200 divide-y  m-1 rounded-md">
                                                {documents_items?.map(
                                                    (document: any, index: number) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex flex-1 w-full my-2 p-2 flex-wrap items-center"
                                                            >
                                                                <div className="flex flex-1 items-center">
                                                                    <PaperClipIcon className="w-5 m-1 flex-0" />
                                                                    <label className="break-words break-all flex-1">
                                                                        {document?.name}
                                                                    </label>
                                                                </div>
                                                                <div className="flex flex-0 mx-1">
                                                                    <a
                                                                        className=" cursor-pointer text-sm  text-indigo-600 p-1"
                                                                        href={document?.storage_url}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                    >
                                                                        查看
                                                                    </a>
                                                                    <a
                                                                        className=" cursor-pointer text-sm  text-red-600 p-1"
                                                                        onClick={() => {
                                                                            deleteIds(document?.id);
                                                                        }}
                                                                    >
                                                                        删除
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </>
                                    )}
                                    {/* {document?.storage_url?.split('.').pop() === 'pdf' ? (
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
                                    )} */}
                                </div>
                            </div>
                            <div className="p-4 w-3/5 right-side flex-1 flex flex-col overflow-auto h-full">
                                <div className="flex flex-col">
                                    <p className="text-xl flex justify-start font-bold">
                                        {documents_items
                                            ?.map((item: any) => {
                                                return item.name;
                                            })
                                            ?.join(',')}
                                    </p>
                                    <label className="flex justify-start text-sm text-gray-500 ">
                                        根據文件內容生成你想要的內容
                                    </label>
                                    <div className="flex flex-row items-center my-2">
                                        <label className="font-bold">文本格式:</label>
                                        <div className="ml-4">
                                            <MyDateDropdown
                                                value={format.name}
                                                datas={formats}
                                                onSwitch={onSwitchFormat}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center my-2">
                                        <label className="font-bold">
                                            語言:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </label>
                                        <div className="ml-4">
                                            <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                                {languages.map((item) => (
                                                    <div
                                                        key={item.name}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            id={item.name}
                                                            name="language"
                                                            type="radio"
                                                            defaultChecked={item.value == language}
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                            onChange={(e) => {
                                                                setLanguage(item.value);
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={item.name}
                                                            className="ml-3 block text-sm font-medium text-gray-700"
                                                        >
                                                            {item.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center my-2">
                                        <label className="font-bold">主題選擇:</label>
                                        <div className="ml-4">
                                            <MyDateDropdown
                                                value={topic.name}
                                                datas={topics}
                                                onSwitch={onSwitchTopic}
                                                zindex={'z-10'}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center my-2">
                                        <label className="font-bold">回復風格:</label>
                                        <div className="ml-4">
                                            <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                                {styles.map((item) => (
                                                    <div
                                                        key={item.name}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            id={item.name}
                                                            name="style"
                                                            type="radio"
                                                            defaultChecked={item.value == style}
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                            onChange={(e) => {
                                                                setStyle(item.value);
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={item.name}
                                                            className="ml-3 block text-sm font-medium text-gray-700"
                                                        >
                                                            {item.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row items-center my-2">
                                        <label className="font-bold">你的想法:</label>
                                        <div className="ml-4 flex-1 text-sm flex items-center">
                                            <textarea
                                                rows={5}
                                                id="type"
                                                name="path_name"
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center p-4">
                    <div className="w-2/5 mx-auto mb-4 px-4">
                        <div className=" rounded-lg shadow">
                            <div className=" rounded-t-lg bg-gray-50 border-b px-4 py-2 flex justify-between items-center">
                                <div>
                                    <h1>歷史記錄</h1>
                                </div>
                            </div>
                            <div className=" divide-y">
                                {logs && logs.length > 0 ? (
                                    logs
                                        ?.sort((a: any, b: any) =>
                                            b.created_at > a.created_at ? 1 : -1
                                        )
                                        ?.map((log: any, index: number) => (
                                            <GenerateLogRow
                                                log={log}
                                                setAlert={setAlert}
                                                key={index}
                                            />
                                        ))
                                ) : (
                                    <div className="p-4">
                                        <label className="text-sm text-gray-500">沒有記錄</label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-3/5 mx-auto px-4">
                        <label className="font-bold flex justify-start">生成的內容</label>
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
        </>
    );
}
