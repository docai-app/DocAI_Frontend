import {
    ChartBarSquareIcon,
    MagnifyingGlassIcon,
    PaperAirplaneIcon,
    TableCellsIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import useAxios from 'axios-hooks';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../../apis';
import useAlert from '../../../../hooks/useAlert';
import HtmlCodeModal from '../../../common/Widget/HtmlCodeModal';
import SingleActionModel from '../../../common/Widget/SingleActionModel';

interface Props {
    label?: any;
    schema?: any;
    getAllLabelsData?: any;
    search?: any;
    showHasLabelSchemasHandler?: any;
}

const apiSetting = new Api();

export default function SearchLabelSearchForm(props: Props) {
    const { label, schema, getAllLabelsData, search, showHasLabelSchemasHandler } = props;
    const { setAlert } = useAlert();
    const [visible, setVisible] = useState(true);
    const [visableGenerateChart, setVisibleGenerateChart] = useState(false);
    const [query, setQuery] = useState('');
    const [visableHtmlCode, setVisibleHtmlCode] = useState(false);
    const [chart, setChart] = useState({});
    const [open, setOpen] = useState(false);
    const [modalDescription, setModalDescription] = useState<any>({});

    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (visible && props?.getAllLabelsData?.tags?.length > 10) {
            setTags(props?.getAllLabelsData?.tags.slice(0, 10));
        } else {
            setTags(props?.getAllLabelsData?.tags);
        }
    }, [props, visible]);

    const [{ data: generateChartData, loading: generateChartLoading }, generateChart] = useAxios(
        '',
        { manual: true }
    );

    const handlerGenerateChart = async (smart_extraction_schema_id: string, query: string) => {
        console.log('query', query);
        console.log('smart_extraction_schema_id', smart_extraction_schema_id);

        if (query) {
            setOpen(true);
            setModalDescription({
                title: '進行中......',
                content: '正在生成圖表,請耐心等候...'
            });
            const res = await generateChart(
                apiSetting.SmartExtractionSchemas.generateChart(smart_extraction_schema_id, query)
            );
            if (res.data.success) {
                setVisibleHtmlCode(true);
                setChart(res.data.chart);
            } else {
                console.log(res.data);
                setAlert({ title: res.data.chart, type: 'error' });
            }
            setOpen(false);
        }
    };

    const [showHasLabelByFalse, setShowHasLabelByFalse] = useState(false);

    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                {...{
                    title: modalDescription?.title,
                    content: modalDescription?.content,
                    icon: (
                        <MagnifyingGlassIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                        />
                    )
                }}
            />
            <div className="w-full  bg-white rounded-lg border px-4 py-2 flex flex-col">
                {label && (
                    <div className="flex flex-row items-center flex-wrap">
                        <div className="flex flex-row items-center my-1">
                            <label>標籤:</label>
                            <button
                                className="border rounded-md pr-4 pl-2 py-1 mx-2 flex flex-row items-center"
                                onClick={() => {
                                    Router.push('/smart_extraction_schema');
                                }}
                            >
                                <XMarkIcon className="w-4 mr-2" />
                                {label}
                            </button>
                        </div>
                    </div>
                )}
                {showHasLabelByFalse && (
                    <div className="flex flex-row items-center flex-wrap">
                        <div className="flex flex-row items-center my-1">
                            <label>標籤:</label>
                            <button
                                className="border rounded-md pr-4 pl-2 py-1 mx-2 flex flex-row items-center"
                                onClick={() => {
                                    setShowHasLabelByFalse(false);
                                    showHasLabelSchemasHandler('');
                                }}
                            >
                                <XMarkIcon className="w-4 mr-2" />
                                數據總表
                            </button>
                        </div>
                    </div>
                )}
                {getAllLabelsData && !showHasLabelByFalse && (
                    <div className="w-full flex flex-col ">
                        <div className="flex flex-row justify-between  pr-10">
                            <label className="text-md ">標籤:</label>

                            <Link href={'/setting/label'}>
                                <a className="text-md  underline text-blue-500">標籤管理</a>
                            </Link>
                        </div>
                        <div className="flex flex-1 flex-row flex-wrap items-center break-all">
                            <button
                                className=" cursor-pointer bg-green-700 hover:bg-green-800 rounded-md text-white px-2 sm:px-4 py-1 mx-2 my-1  flex items-center   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                onClick={() => {
                                    setShowHasLabelByFalse(true);
                                    showHasLabelSchemasHandler(false);
                                }}
                            >
                                <TableCellsIcon className="mr-1 w-5 h-5 text-white" />
                                <label className=" cursor-pointer text-xs sm:text-sm">
                                    數據總表
                                </label>
                            </button>

                            {tags?.map((label: any, index: number) => {
                                return (
                                    <div key={index}>
                                        <button
                                            className=" cursor-pointer bg-green-700 hover:bg-green-800 rounded-md text-white px-2 sm:px-4 py-1 mx-2 my-1  flex items-center   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                            onClick={() => search(label)}
                                        >
                                            <TableCellsIcon className="mr-1 w-5 h-5 text-white" />
                                            <label className=" cursor-pointer text-xs sm:text-sm">
                                                {label?.name}({label.taggings_count || 0})
                                            </label>
                                        </button>
                                    </div>
                                );
                            })}
                            {tags != null && (
                                <div
                                    className=" cursor-pointer"
                                    onClick={() => {
                                        setVisible(!visible);
                                    }}
                                >
                                    <a className="text-sm sm:text-md  underline text-blue-500">
                                        {visible ? '查看更多' : '隱藏'}
                                    </a>
                                </div>
                            )}

                            {tags == null ? (
                                <div className="animate-pulse flex flex-row justify-center items-center gap-2">
                                    <div className="h-4 w-32 bg-gray-400 rounded"></div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                )}
                <div className="flex flex-1 flex-row">
                    <div className="flex flex-row items-center my-1">
                        <img src={'../../intelligent.png'} className="w-6" />
                        {':'}
                        {schema != null ? (
                            <>
                                {!visableGenerateChart ? (
                                    <>
                                        <div
                                            className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md ml-4 mx-2 my-1 cursor-pointer"
                                            onClick={() => {
                                                Router.push(
                                                    `/document/smart_extraction_schema/${schema.id}`
                                                );
                                            }}
                                        >
                                            <PaperAirplaneIcon className="w-4 m-1 cursor-pointer" />
                                            <label className="text-sm cursor-pointer">打開</label>
                                        </div>
                                        <div
                                            className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md mx-2 my-1 cursor-pointer"
                                            onClick={() => {
                                                setVisibleGenerateChart(true);
                                            }}
                                        >
                                            <ChartBarSquareIcon className="w-5 m-1 cursor-pointer" />
                                            <label className="text-sm cursor-pointer">
                                                智能生成圖表
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="flex flex-row items-center p-1 border ml-4 mx-2 pr-4 hover:bg-gray-300 rounded-md"
                                            onClick={() => {
                                                setVisibleGenerateChart(false);
                                            }}
                                        >
                                            <XMarkIcon className="w-4 mx-2 cursor-pointer" />
                                            <ChartBarSquareIcon className="w-5 m-1 cursor-pointer" />
                                            <label className="text-sm cursor-pointer">
                                                智能生成圖表
                                            </label>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="p-1 my-1">
                                <label className="mx-2 text-sm">請選擇數據源</label>
                            </div>
                        )}
                    </div>
                </div>
                {visableGenerateChart && (
                    <div className="flex flex-row items-center my-1 w-full">
                        <img src={'../../intelligent.png'} className="w-6" />
                        {':'}
                        <>
                            <input
                                type={'search'}
                                name="signature"
                                className="flex-1 mx-4 rounded-md"
                                placeholder="例如：幫我用pie chart統計總結出各個部門的請假情況？"
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                }}
                            ></input>
                            <button
                                type="button"
                                className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500  sm:w-auto sm:text-sm"
                                onClick={(e) => {
                                    if (!query) {
                                        setAlert({ title: '請輸入內容', type: 'info' });
                                        return;
                                    }
                                    handlerGenerateChart(schema.id, query);
                                }}
                            >
                                {'生成'}
                            </button>
                        </>
                    </div>
                )}
            </div>
            <HtmlCodeModal
                visable={visableHtmlCode}
                description={'智能圖表'}
                cancelClick={() => {
                    setVisibleHtmlCode(false);
                }}
                chart={chart}
            />
        </>
    );
}
