/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import useAxios from 'axios-hooks';
import _ from 'lodash';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import SingleActionModel from '../../common/Widget/SingleActionModel';

const apiSetting = new Api();

export default function SelectSchemaAndInputModal(props: any) {
    const cancelButtonRef = useRef(null);
    const [smart_extraction_schema_id, set_smart_extraction_schema_id] = useState('');
    const [open, setOpen] = useState(false);
    const { setAlert } = useAlert();
    const [query, setQuery] = useState('');
    const [item_type, setItemType] = useState('statistics');
    const [page, setPage] = useState(1);
    const [allSchemas, setAllSchemas] = useState<any>([]);
    const [meta, setMeta] = useState();
    const [options, setOptions] = useState<any>([]);
    const [error, setError] = useState('')
    const [value, setValue] = useState<any>()

    const [{ data: generateChartData, loading: generateChartLoading }, generateChart] = useAxios(
        '',
        { manual: true }
    );

    const [
        { data: generateStatisticsData, loading: generateStatisticsLoading },
        generateStatistics
    ] = useAxios(apiSetting.SmartExtractionSchemas.generateStatistics('', ''), { manual: true });

    const [{ data: getSmartExtractionSchemasData, loading: loading }, getSmartExtractionSchemas] =
        useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas('', page), {
            manual: true
        });

    const data_types = [
        {
            name: '圖表',
            value: 'chart'
        },
        {
            name: '統計',
            value: 'statistics'
        }
    ];

    useEffect(() => {
        getSmartExtractionSchemas(
            apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas('', page)
        ).then((res) => {
            const options = res.data.smart_extraction_schemas?.map((schema: any) => {
                return {
                    value: schema.id,
                    label: schema.name
                };
            });
            setOptions(options);
        });
    }, []);

    // useEffect(() => {
    //     if (getSmartExtractionSchemasData && getSmartExtractionSchemasData.success) {
    //         setMeta(getSmartExtractionSchemasData.meta);
    //         if (page == 1) {
    //             setAllSchemas(getSmartExtractionSchemasData.smart_extraction_schemas);
    //         } else {
    //             setAllSchemas(
    //                 allSchemas.concat(getSmartExtractionSchemasData.smart_extraction_schemas)
    //             );
    //         }
    //     }
    // }, [getSmartExtractionSchemasData]);

    const showAllSchemasHandler = useCallback(async () => {
        setPage((page) => page + 1);
    }, []);

    const handlerGenerateChart = async (query: string) => {
        // console.log('query', query);
        // console.log('form_data_ids', form_data_ids);
        if (query) {
            setOpen(true);

            const res = await generateChart(
                apiSetting.SmartExtractionSchemas.generateChart(smart_extraction_schema_id, query)
            );
            if (res.data.success) {
                props?.setVisibleHtmlCode(true);
                props?.setData(res.data.chart);
                props.cancelClick();
                props?.setCurrectItemItem({
                    item_type: item_type,
                    data: res.data.chart,
                    id: res.data.item_id,
                    query: query
                });
                // setCurrentStoryboardItemId(res.data.item_id);
            } else {
                console.log(res.data);
                setAlert({ title: res.data.chart, type: 'error' });
            }
            setOpen(false);
        }
    };

    const handlerGenerateStatistics = async (query: string) => {
        // console.log('query', query);
        // console.log('form_data_ids', form_data_ids);
        if (query) {
            setOpen(true);
            const res = await generateStatistics(
                apiSetting.SmartExtractionSchemas.generateStatistics(
                    smart_extraction_schema_id,
                    query
                )
            );
            if (res.data.success) {
                // console.log(res.data.report);
                props?.setVisibleHtmlToPdf(true);
                props?.setData(res.data.report);
                props.cancelClick();
                props?.setCurrectItemItem({
                    item_type: item_type,
                    data: res.data.report,
                    id: res.data.item_id,
                    query: query
                });
                // setCurrentStoryboardItemId(res.data.item_id);
            } else {
                console.log(res.data);
                setAlert({
                    title: res.data.report,
                    type: 'error'
                });
            }
            setOpen(false);
        }
    };

    const confirmClick = () => {
        if (!smart_extraction_schema_id) {
            setError('請選擇Schema')
            return
        }
        if (!query) {
            setError('請輸入問題')
            return
        }
        setError('')
        if (item_type == 'chart') {
            handlerGenerateChart(query);
        } else if (item_type == 'statistics') {
            handlerGenerateStatistics(query);
        }
    };

    async function loadOptions(search: any, loadOptions: any, { page }: any) {
        const res = await getSmartExtractionSchemas(
            apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas(
                '',
                loadOptions && loadOptions.length == 0 ? 1 : page
            )
        );
        const _options = res.data.smart_extraction_schemas?.map((schema: any) => {
            return {
                value: schema.id,
                label: schema.name
            };
        });
        setPage((page) => page + 1);
        if (_options && _options.length > 0) setOptions(_.concat(loadOptions, _options));
        return {
            options: _options,
            hasMore: res.data.meta?.next_page != null,
            additional: {
                page: page + 1
            }
        };
    }

    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'進行中......'}
                content={'請耐心等候...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <Transition.Root show={props.visable || false} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={props.cancelClick}
                >
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="sm:flex sm:items-center justify-center">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <div className="mt-2">
                                            <p className="text-2xl text-black">{'添加數據'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-4 flex flex-row items-center">
                                    <label className="text-sm text-right w-[50px]">
                                        {'Schema'}:
                                    </label>

                                    <AsyncPaginate
                                        className="flex-1 ml-4 border border-gray-300 rounded-md text-left"
                                        loadOptions={loadOptions}
                                        defaultOptions={options}
                                        options={options}
                                        value={value}
                                        onChange={(option: any) => {
                                            setValue(option)
                                            set_smart_extraction_schema_id(option?.value);
                                        }}
                                        additional={{
                                            page: page + 1
                                        }}
                                        shouldLoadMore={(scrollHeight, clientHeight, scrollTop) => {
                                            return scrollHeight - scrollTop < 1000;
                                        }}
                                    />

                                    <select
                                        className="flex-1 ml-4 border border-gray-300 rounded-md hidden"
                                        defaultValue={allSchemas[0]?.id}
                                        onChange={(e) => {
                                            set_smart_extraction_schema_id(e.target.value);
                                        }}
                                    >
                                        <option
                                            value={''}
                                            className="w-full border rounded-md text-gray-500 "
                                        >
                                            請選擇
                                        </option>
                                        {allSchemas?.map((item: any, index: number) => {
                                            return (
                                                <option
                                                    key={index}
                                                    className="w-full border rounded-md  "
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="w-full mt-4 flex flex-row items-center">
                                    <label className="text-sm text-right w-[50px]">{'类型'}:</label>
                                    <select
                                        className="flex-1 ml-4 border border-gray-300 rounded-md  "
                                        defaultValue={'statistics'}
                                        onChange={(e) => {
                                            setItemType(e.target.value);
                                        }}
                                    >
                                        {data_types?.map((item: any, index: number) => {
                                            return (
                                                <option
                                                    key={index}
                                                    className="w-full border rounded-md  "
                                                    value={item.value}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="w-full mt-4  flex flex-row items-center">
                                    <label className="text-sm text-right w-[50px]">
                                        {props.name || '問題'}:
                                    </label>
                                    <input
                                        type={'text'}
                                        name="signature"
                                        className="flex-1 ml-4 rounded-md mr-0  border border-gray-300"
                                        placeholder="輸入你的問題..."
                                        defaultValue={''}
                                        onChange={(e) => {
                                            setQuery(e.target.value);
                                        }}
                                    ></input>
                                </div>
                                <div className="w-full my-2 flex flex-row items-center flex-wrap justify-center">
                                    <label className="text-sm text-red-500 text-center">{error}</label>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-center">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            confirmClick();
                                        }}
                                    >
                                        {props.confirmText || '確認'}
                                    </button>

                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:white sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            props.cancelClick();
                                        }}
                                        ref={cancelButtonRef}
                                    >
                                        {props.cancelText || '取消'}
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
