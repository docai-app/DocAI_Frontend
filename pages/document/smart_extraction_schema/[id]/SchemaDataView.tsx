import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import GenerateChartModal from '../../../../components/common/Widget/GenerateChartModal';
import HeaderBreadCrumb from '../../../../components/common/Widget/HeaderBreadCrumb';
import HtmlCodeModal from '../../../../components/common/Widget/HtmlCodeModal';
import MyModal from '../../../../components/common/Widget/MyModal';
import SingleActionModel from '../../../../components/common/Widget/SingleActionModel';
import SchemaFormFilterTableRow from '../../../../components/feature/document/extraction/SchemaFormFilterTableRow';
import EditItems from '../../../../components/feature/drive/EditItems';
import useAlert from '../../../../hooks/useAlert';

interface SchemaDataViewProps {
    label: any;
    formDatum: any;
    formSchema: any;
    selectedResult: any;
    selectedFilter: any;
    showAllItemsHandler: any;
    resultFormsData: any;
    open: boolean;
    setOpen: any;
    modalDescription: any;
    onSearch: any;
    filterData: any;
    setFilterData: any;
    handleDownload: any;
    handlerDeleteDocument: any;
    handlerGenerateChart: any;
    visableHtmlCode: boolean;
    setVisibleHtmlCode: any;
    chart: any;
    hasMore: boolean;
}

function SchemaDataView(props: SchemaDataViewProps) {
    const {
        label,
        formDatum,
        formSchema,
        selectedResult,
        selectedFilter,
        showAllItemsHandler,
        resultFormsData,
        open,
        setOpen,
        modalDescription,
        onSearch,
        filterData = {},
        setFilterData,
        handleDownload,
        handlerDeleteDocument,
        handlerGenerateChart,
        visableHtmlCode,
        setVisibleHtmlCode,
        chart,
        hasMore
    } = props;
    const router = useRouter();
    const { setAlert } = useAlert();
    const [visableDelete, setVisibleDelete] = useState(false);
    const [visableGenerateChart, setVisibleGenerateChart] = useState(false);
    const [form_data_ids, set_form_data_ids] = useState<any>([]);
    const [datumId, setDatumId] = useState('');

    const editFormDocument = (datum: any) => {
        if (!datum) return;
        console.log(datum);
        // setAlert({ title: '新功能開發中，敬請期待！', type: 'info' })
        router.push({
            pathname: '/document/validate',
            query: {
                document_id: datum?.document_id,
                form_url: datum?.document?.storage_url,
                form_id: datum?.id,
                smart_extraction_schema_id: datum?.smart_extraction_schema_id,
                result: JSON.stringify(datum?.data)
            }
        });
    };

    const setChecedkData = (checked: boolean, value: string) => {
        const newData = checked
            ? [...form_data_ids, value]
            : form_data_ids.filter((_value: string) => _value !== value);
        set_form_data_ids(newData);
    };

    const clearCheckedData = () => {
        set_form_data_ids([]);
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
            <EditItems
                visibleMoveItem={false}
                visibleGenerateChart={true}
                generateChart={() => {
                    setVisibleGenerateChart(true);
                }}
                clearItems={() => {
                    clearCheckedData();
                }}
                // count={form_data_ids?.length}
                count={0}
            />
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <HeaderBreadCrumb
                        title={'數據搜尋'}
                        back={() => {
                            Router.back();
                        }}
                    />
                    <header className="shadow bg-white flex justify-between items-center">
                        <div className="   py-6 px-4 sm:px-6 lg:px-8   ">
                            <h1 className="text-2xl font-bold text-gray-900">{formSchema?.name}</h1>
                            <h5 className="text-md text-gray-500 sm:text-md">
                                {formSchema?.description}
                            </h5>
                        </div>
                        <div>
                            {formDatum && formDatum.length > 0 && (
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md m-2"
                                    onClick={() => setVisibleGenerateChart(true)}
                                >
                                    智能生成圖表
                                </button>
                            )}
                        </div>
                    </header>
                    <div className="flex flex-row mt-4 mb-4 flex-wrap items-center">
                        {selectedFilter?.map((filter: any, index: number) => {
                            return (
                                <div className="m-2 flex items-center" key={index}>
                                    <label className="mr-2">{filter?.query}:</label>
                                    <input
                                        // type={filter?.data_type == 'date' ? 'date' : 'text'}
                                        type={'text'}
                                        className="mt-1 border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300  "
                                        onChange={(e) => {
                                            setFilterData({
                                                ...filterData,
                                                [filter?.key]: e.target.value
                                            });
                                        }}
                                    />
                                </div>
                            );
                        })}
                        <div>
                            {selectedFilter?.length > 0 ? (
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md m-2"
                                    onClick={() => onSearch()}
                                >
                                    搜尋
                                </button>
                            ) : null}
                            {selectedResult?.length > 0 ? (
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md m-2"
                                    onClick={() => handleDownload()}
                                >
                                    下載
                                </button>
                            ) : null}
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center text-center py-2">
                        <div className="w-full text-center items-center justify-center shadow ring-1 ring-black ring-opacity-5 md:rounded-lg overflow-scroll">
                            <InfiniteScroll
                                dataLength={formDatum?.length} //This is important field to render the next data
                                next={showAllItemsHandler}
                                hasMore={hasMore}
                                height={'auto'}
                                style={{ maxHeight: '80vh' }}
                                loader={
                                    <p className="p-4 text-center">
                                        <b>載入中...</b>
                                    </p>
                                }
                                endMessage={
                                    <p className="p-4 text-gray-300 text-center">沒有更多資料</p>
                                }
                            >
                                <table className="w-full table-auto text-left divide-y divide-gray-300 overflow-scroll">
                                    <thead className="bg-gray-50 overflow-scroll">
                                        <tr className="divide-x divide-gray-200">
                                            <th
                                                scope="col"
                                                className="hidden py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            ></th>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                編號
                                            </th>
                                            {selectedResult?.map((result: any, index: number) => {
                                                return (
                                                    <th
                                                        key={index}
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        {result?.query}
                                                    </th>
                                                );
                                            })}
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                文檔連結
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                操作
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white overflow-scroll">
                                        {formDatum?.map((datum: any, index: number) => {
                                            return (
                                                <SchemaFormFilterTableRow
                                                    key={index}
                                                    index={index}
                                                    datum={datum}
                                                    selectedResult={selectedResult}
                                                    editFormDocument={editFormDocument}
                                                    setDatumId={setDatumId}
                                                    setVisibleDelete={setVisibleDelete}
                                                    setChecedkData={setChecedkData}
                                                    checked={_.includes(form_data_ids, datum.id)}
                                                />
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
            <MyModal
                visable={visableDelete}
                description={'確定刪除?'}
                confirmClick={() => {
                    setVisibleDelete(false);
                    handlerDeleteDocument(datumId);
                }}
                cancelClick={() => {
                    setVisibleDelete(false);
                }}
            />
            <GenerateChartModal
                visable={visableGenerateChart}
                confirmClick={(query: string) => {
                    setVisibleGenerateChart(false);
                    console.log(query);
                    handlerGenerateChart(query, form_data_ids);
                }}
                cancelClick={() => {
                    setVisibleGenerateChart(false);
                }}
            />
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
export default SchemaDataView;
