import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import Router from 'next/router';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FormFilterDropdown from '../../../../../components/common/Widget/FormFilterDropdown';
import GenerateChartModal from '../../../../../components/common/Widget/GenerateChartModal';
import HtmlCodeModal from '../../../../../components/common/Widget/HtmlCodeModal';
import MyModal from '../../../../../components/common/Widget/MyModal';
import SingleActionModel from '../../../../../components/common/Widget/SingleActionModel';
import EditItems from '../../../../../components/feature/drive/EditItems';
import FormFilterTableRow from '../../../../../components/feature/search/FormFilterTableRow';
import HeadView from '../../../../../components/feature/search/HeadView';
import { matchFormSchemaAndFormData } from '../../../../../utils/form';

interface FormFilterViewProps {
    formSchema: any;
    selectedFilter: any[];
    setSelectedFilter: (selectedFilter: never[]) => void;
    filterData: any;
    setFilterData: (filterData: any) => void;
    onSearch: () => void;
    handleDownload: () => void;
    selectedResult: any[];
    setSelectedResult: (selectedResult: never[]) => void;
    formDatum: any[];
    loadingOpen: boolean;
    setLoadingOpen: (loadingOpen: boolean) => void;
    resultFormsData: any;
    showAllItemsHandler: () => void;
    handlerDeleteDocument: any;
    modalDescription?: any;
    handlerGenerateChart: any;
    visableHtmlCode: boolean;
    setVisibleHtmlCode: any;
    chart: any;
    setChart: (chart: any) => void;
}

function FormFilterView(props: FormFilterViewProps) {
    const {
        formSchema = {},
        selectedFilter = [],
        setSelectedFilter,
        filterData = {},
        setFilterData,
        onSearch,
        handleDownload,
        selectedResult = [],
        setSelectedResult,
        formDatum = [],
        loadingOpen,
        setLoadingOpen,
        resultFormsData,
        showAllItemsHandler,
        handlerDeleteDocument,
        modalDescription,
        handlerGenerateChart,
        visableHtmlCode,
        setVisibleHtmlCode,
        chart,
        setChart
    } = props;

    const itemList = matchFormSchemaAndFormData(formSchema.form_schema, formDatum);
    const [visableDelete, setVisibleDelete] = useState(false);
    const [visableGenerateChart, setVisibleGenerateChart] = useState(false);
    // const [visableHtmlCode, setVisibleHtmlCode] = useState(false);
    const [form_data_ids, set_form_data_ids] = useState<any>([]);

    const [datumId, setDatumId] = useState('');
    const editFormDocument = (datum: any) => {
        if (!datum) return;
        Router.push({
            pathname: '/form/validate',
            query: {
                document_id: datum?.document_id,
                form_url: datum?.document?.storage_url,
                form_id: datum?.id,
                form_schema_id: datum?.form_schema_id,
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
                open={loadingOpen}
                setOpen={setLoadingOpen}
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
                count={form_data_ids?.length}
            />
            <div className="mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <HeadView
                        {...{
                            formSchema,
                            selectedFilter,
                            setSelectedFilter,
                            selectedResult,
                            setSelectedResult
                        }}
                    />
                    <header className="shadow bg-white">
                        <div className="   py-6 px-4 sm:px-6 lg:px-8  flex justify-between">
                            <h1 className="text-3xl font-bold text-gray-900">
                                文檔: {formSchema.name}
                            </h1>
                        </div>
                    </header>
                    <div className="py-4">
                        <div className="flex flex-row mt-4 mb-4 flex-wrap">
                            {selectedFilter.map((filter, index) => {
                                return (
                                    <div className="m-2" key={index}>
                                        <label className="mr-2">
                                            {formSchema.form_schema.properties[`${filter}`].title}:
                                        </label>
                                        <FormFilterDropdown
                                            filterKey={filter}
                                            formSchema={
                                                formSchema.form_schema.properties[`${filter}`]
                                            }
                                            formData={formSchema.data_schema[`${filter}`]}
                                            title={
                                                formSchema.form_schema.properties[`${filter}`].title
                                            }
                                            filterData={filterData}
                                            setFilterData={setFilterData}
                                        />
                                    </div>
                                );
                            })}
                            {selectedFilter.length > 0 ? (
                                <button
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded-md m-2"
                                    onClick={() => onSearch()}
                                >
                                    搜尋
                                </button>
                            ) : null}
                            {selectedResult.length > 0 ? (
                                <button
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded-md m-2"
                                    onClick={() => handleDownload()}
                                >
                                    下載
                                </button>
                            ) : null}
                        </div>
                        <div className="flex w-full items-center justify-center text-center py-2">
                            <div className="w-full text-center items-center justify-center shadow ring-1 ring-black ring-opacity-5 md:rounded-lg overflow-scroll">
                                {selectedResult.length > 0 ? (
                                    formDatum && formDatum.length != 0 ? (
                                        <InfiniteScroll
                                            dataLength={formDatum?.length} //This is important field to render the next data
                                            next={showAllItemsHandler}
                                            hasMore={resultFormsData?.meta?.next_page != null}
                                            height={'auto'}
                                            style={{ maxHeight: '80vh' }}
                                            loader={
                                                <p className="p-4 text-center">
                                                    <b>載入中...</b>
                                                </p>
                                            }
                                            endMessage={
                                                <p className="p-4 text-gray-300 text-center">
                                                    沒有更多資料
                                                </p>
                                            }
                                        >
                                            <table className="w-full table-auto text-left divide-y divide-gray-300 overflow-scroll">
                                                <thead className="bg-gray-50 overflow-scroll">
                                                    <tr className="divide-x divide-gray-200">
                                                        <th
                                                            scope="col"
                                                            className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                        ></th>
                                                        <th
                                                            scope="col"
                                                            className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                        >
                                                            編號
                                                        </th>
                                                        {selectedResult.map((result, index) => {
                                                            return (
                                                                <th
                                                                    key={index}
                                                                    scope="col"
                                                                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                                >
                                                                    {
                                                                        formSchema.form_schema
                                                                            .properties[`${result}`]
                                                                            .title
                                                                    }
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
                                                    {formDatum.map((datum, index) => {
                                                        return (
                                                            <FormFilterTableRow
                                                                key={index}
                                                                index={index}
                                                                datum={datum}
                                                                itemList={itemList}
                                                                selectedResult={selectedResult}
                                                                editFormDocument={editFormDocument}
                                                                setDatumId={setDatumId}
                                                                setVisibleDelete={setVisibleDelete}
                                                                setChecedkData={setChecedkData}
                                                                checked={_.includes(
                                                                    form_data_ids,
                                                                    datum.id
                                                                )}
                                                            />
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </InfiniteScroll>
                                    ) : (
                                        <div className="py-4">
                                            <p className="text-gray-500 text-sm">
                                                請點擊右上角 "+ 篩選" 來選顯示欄位
                                            </p>
                                        </div>
                                    )
                                ) : (
                                    <div className="py-4">
                                        <p className="text-gray-500 text-sm">
                                            請點擊右上角 "+ 篩選" 來選顯示欄位
                                        </p>
                                    </div>
                                )}
                            </div>
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
export default FormFilterView;
