import {
    ChartBarSquareIcon,
    MagnifyingGlassIcon,
    NewspaperIcon,
    PaperAirplaneIcon,
    TableCellsIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import useAxios from 'axios-hooks';
import _ from 'lodash';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../../apis';
import useAlert from '../../../../hooks/useAlert';
import HtmlCodeModal from '../../../common/Widget/HtmlCodeModal';
import HtmlToPdfModal from '../../../common/Widget/HtmlToPdfModal';
import SingleActionModel from '../../../common/Widget/SingleActionModel';
import InputStoryboardModal from './InputStoryboardModal';

interface Props {
    label?: any;
    schema?: any;
    setShema?: any;
    getAllLabelsData?: any;
    search?: any;
    showHasLabelSchemasHandler?: any;
    setCurrectLabel?: any;
    setAllSchemas?: any;
}

const apiSetting = new Api();

export default function SearchLabelSearchForm(props: Props) {
    const {
        label,
        schema,
        setShema,
        getAllLabelsData,
        search,
        showHasLabelSchemasHandler,
        setCurrectLabel,
        setAllSchemas
    } = props;
    const { setAlert } = useAlert();
    const [visible, setVisible] = useState(true);
    const [visableGenerateChart, setVisibleGenerateChart] = useState(false);
    const [visableGenerateStatistics, setVisibleGenerateStatistics] = useState(false);
    const [query, setQuery] = useState('');
    const [visableHtmlCode, setVisibleHtmlCode] = useState(false);
    const [chart, setChart] = useState({});
    const [open, setOpen] = useState(false);
    const [modalDescription, setModalDescription] = useState<any>({});
    const [visableInputStoryboard, setVisableInputStoryboard] = useState(false);
    const [currentStoryboardItemId, setCurrentStoryboardItemId] = useState('');
    const [tags, setTags] = useState<any>([]);
    const [showHasLabelByFalse, setShowHasLabelByFalse] = useState(false);
    const [visableHtmlToPdf, setVisibleHtmlToPdf] = useState(false);
    const [report, setReport] = useState('');

    useEffect(() => {
        const _tags = _.filter(props?.getAllLabelsData?.tags, function (tag: any) {
            return tag.smart_extraction_schemas_count > 0;
        });
        if (visible && _tags?.length > 10) {
            setTags(_tags.slice(0, 10));
        } else {
            setTags(_tags);
        }
    }, [props, visible]);

    const [{ data: generateChartData, loading: generateChartLoading }, generateChart] = useAxios(
        '',
        { manual: true }
    );

    const [
        { data: generateStatisticsData, loading: generateStatisticsLoading },
        generateStatistics
    ] = useAxios('', { manual: true });

    const [
        { data: updateStoryboardItemByIdData, loading: updateStoryboardItemByIdLoading },
        updateStoryboardItemById
    ] = useAxios(apiSetting.Storyboard.updateStoryboardItemById(''), {
        manual: true
    });

    const handlerGenerateChart = async (smart_extraction_schema_id: string, query: string) => {
        if (query) {
            setOpen(true);
            setModalDescription({
                title: '進行中......',
                content: '請耐心等候...'
            });
            const res = await generateChart(
                apiSetting.SmartExtractionSchemas.generateChart(smart_extraction_schema_id, query)
            );
            if (res.data.success) {
                setVisibleHtmlCode(true);
                setChart(res.data.chart);
                setCurrentStoryboardItemId(res.data.item_id);
            } else {
                console.log(res.data);
                setAlert({ title: res.data.chart, type: 'error' });
            }
            setOpen(false);
        }
    };

    const handlerGenerateStatistics = async (smart_extraction_schema_id: string, query: string) => {
        console.log('query', query);
        console.log('smart_extraction_schema_id', smart_extraction_schema_id);

        if (query) {
            setOpen(true);
            setModalDescription({
                title: '進行中......',
                content: '請耐心等候...'
            });
            const res = await generateStatistics(
                apiSetting.SmartExtractionSchemas.generateStatistics(
                    smart_extraction_schema_id,
                    query
                )
            );
            if (res.data.success) {
                setVisibleHtmlToPdf(true);
                setReport(res.data.report);
                setCurrentStoryboardItemId(res.data.item_id);
            } else {
                console.log(res.data);
                setAlert({ title: res.data.report, type: 'error' });
            }
            setOpen(false);
        }
    };

    const handleUpdateStoryboardItem = (data: any) => {
        if (!currentStoryboardItemId) return;
        setOpen(true);
        setModalDescription({
            title: '進行中......',
            content: '正在儲存結果,請耐心等候...'
        });
        updateStoryboardItemById({
            ...apiSetting.Storyboard.updateStoryboardItemById(currentStoryboardItemId),
            data: {
                ...data,
                is_ready: true,
                status: 1
            }
        }).then((res: any) => {
            setOpen(false);
            if (res.data.success) {
                setAlert({ title: '儲存成功!', type: 'success' });
            } else {
                setAlert({ title: res.data.error, type: 'error' });
            }
        });
    };

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
            <div className="w-full  bg-gray-100 rounded-lg border px-4 py-2 flex flex-col">
                {label && (
                    <div className="flex flex-row items-center flex-wrap">
                        <div className="flex flex-row items-center my-1">
                            <label>標籤:</label>
                            <button
                                className="border rounded-md pr-4 pl-2 py-1 mx-2 flex flex-row items-center"
                                onClick={() => {
                                    // Router.push('/smart_extraction_schema');
                                    setCurrectLabel('');
                                    setAllSchemas([]);
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
                                    setCurrectLabel('');
                                    setAllSchemas([]);
                                    setShema(null);
                                }}
                            >
                                <XMarkIcon className="w-4 mr-2" />
                                數據總表
                            </button>
                        </div>
                    </div>
                )}
                {!label && !showHasLabelByFalse && (
                    <div className="w-full flex flex-col ">
                        <div className="flex flex-row justify-between  pr-2">
                            <label className="text-md ">標籤:</label>

                            <Link href={'/setting/label'}>
                                <a className="text-md  underline text-blue-500">標籤管理</a>
                            </Link>
                        </div>

                        {tags.length == 0 ? (
                            <div className="animate-pulse flex flex-row  items-center gap-2">
                                <div className="h-4 w-32 bg-gray-400 rounded"></div>
                            </div>
                        ) : (
                            <div className="flex flex-1 flex-row flex-wrap items-center break-all">
                                <button
                                    className=" cursor-pointer bg-green-700 hover:bg-green-800 rounded-md text-white px-2 sm:px-4 py-1 mx-2 my-1  flex items-center   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                    onClick={() => {
                                        setShema(null);
                                        setShowHasLabelByFalse(true);
                                        showHasLabelSchemasHandler(false);
                                        setCurrectLabel('');
                                        setAllSchemas([]);
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
                                                onClick={() => {
                                                    setShema(null);
                                                    search(label);
                                                }}
                                            >
                                                <TableCellsIcon className="mr-1 w-5 h-5 text-white" />
                                                <label className=" cursor-pointer text-xs sm:text-sm">
                                                    {label?.name}(
                                                    {label.smart_extraction_schemas_count || 0})
                                                </label>
                                            </button>
                                        </div>
                                    );
                                })}
                                {tags != null && tags.length >= 10 && (
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
                            </div>
                        )}
                    </div>
                )}
                <div className="flex flex-1 flex-row">
                    <div className="flex flex-row items-center my-1">
                        <img src={'../../intelligent.png'} className="w-6" />
                        {':'}
                        {schema != null ? (
                            <>
                                {!visableGenerateChart && !visableGenerateStatistics ? (
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
                                            <label className="text-sm cursor-pointer">圖表</label>
                                        </div>
                                        <div
                                            className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md mx-2 my-1 cursor-pointer"
                                            onClick={() => {
                                                setVisibleGenerateStatistics(true);
                                            }}
                                        >
                                            <NewspaperIcon className="w-5 m-1 cursor-pointer" />
                                            <label className="text-sm cursor-pointer">統計</label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {visableGenerateChart && (
                                            <div
                                                className="flex flex-row items-center p-1 border ml-4 mx-2 pr-4 hover:bg-gray-300 rounded-md"
                                                onClick={() => {
                                                    setVisibleGenerateChart(false);
                                                }}
                                            >
                                                <XMarkIcon className="w-4 mx-2 cursor-pointer" />
                                                <ChartBarSquareIcon className="w-5 m-1 cursor-pointer" />
                                                <label className="text-sm cursor-pointer">
                                                    圖表
                                                </label>
                                            </div>
                                        )}
                                        {visableGenerateStatistics && (
                                            <div
                                                className="flex flex-row items-center p-1 border ml-4 mx-2 pr-4 hover:bg-gray-300 rounded-md"
                                                onClick={() => {
                                                    setVisibleGenerateStatistics(false);
                                                }}
                                            >
                                                <XMarkIcon className="w-4 mx-2 cursor-pointer" />
                                                <NewspaperIcon className="w-5 m-1 cursor-pointer" />
                                                <label className="text-sm cursor-pointer">
                                                    統計
                                                </label>
                                            </div>
                                        )}
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
                                placeholder="輸入你的問題..."
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
                {visableGenerateStatistics && (
                    <div className="flex flex-row items-center my-1 w-full">
                        <img src={'../../intelligent.png'} className="w-6" />
                        {':'}
                        <>
                            <input
                                type={'search'}
                                name="signature"
                                className="flex-1 mx-4 rounded-md"
                                placeholder="輸入你的問題..."
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
                                    handlerGenerateStatistics(schema.id, query);
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
                description={'結果'}
                cancelClick={() => {
                    setVisibleHtmlCode(false);
                    // setVisableInputStoryboard(true);
                }}
                chart={chart}
                save={() => {
                    setVisibleHtmlCode(false);
                    // setVisableInputStoryboard(true);
                    handleUpdateStoryboardItem({
                        name: query,
                        description: ''
                    });
                }}
            />
            <HtmlToPdfModal
                visable={visableHtmlToPdf}
                title={'結果'}
                description={report}
                cancelClick={() => {
                    setVisibleHtmlToPdf(false);
                    // setVisableInputStoryboard(true);
                }}
                save={() => {
                    setVisibleHtmlToPdf(false);
                    // setVisableInputStoryboard(true);
                    handleUpdateStoryboardItem({
                        name: query,
                        description: '',
                        data: report
                    });
                }}
            />
            <InputStoryboardModal
                visable={visableInputStoryboard}
                description={'編輯儲存資料'}
                report={report}
                cancelClick={() => {
                    setVisableInputStoryboard(false);
                }}
                confirmClick={(data: any) => {
                    setVisableInputStoryboard(false);
                    handleUpdateStoryboardItem(data);
                }}
            />
        </>
    );
}
