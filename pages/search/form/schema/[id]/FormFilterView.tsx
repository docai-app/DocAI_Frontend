import { SearchIcon } from '@heroicons/react/outline';
import FormFilterDropdown from '../../../../../components/common/Widget/FormFilterDropdown';
import SingleActionModel from '../../../../../components/common/Widget/SingleActionModel';
import HeadView from '../../../../../components/feature/search/HeadView';
import { matchFormSchemaAndFormData } from '../../../../../utils/form';
import InfiniteScroll from 'react-infinite-scroll-component';

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
        showAllItemsHandler
    } = props;

    const itemList = matchFormSchemaAndFormData(formSchema.form_schema, formDatum);

    return (
        <>
            <SingleActionModel
                open={loadingOpen}
                setOpen={setLoadingOpen}
                {...{
                    title: '正在獲取資料',
                    content: '',
                    icon: <SearchIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                }}
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
                                    <div className="mx-2" key={index}>
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
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md mx-2"
                                    onClick={() => onSearch()}
                                >
                                    搜尋
                                </button>
                            ) : null}
                            {selectedResult.length > 0 ? (
                                <button
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md mx-2"
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
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white overflow-scroll">
                                                    {formDatum.map((datum, index) => {
                                                        return (
                                                            <tr
                                                                key={index}
                                                                className="divide-x divide-gray-200"
                                                            >
                                                                {/* Add the index to the data */}
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                                    {index + 1}
                                                                </td>
                                                                {selectedResult.map(
                                                                    (result, index) => {
                                                                        return (
                                                                            <td
                                                                                key={index}
                                                                                className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6"
                                                                            >
                                                                                {typeof datum.data[
                                                                                    `${result}`
                                                                                ] === 'object' &&
                                                                                datum.data[
                                                                                    `${result}`
                                                                                ] ? (
                                                                                    <div className="flex flex-col">
                                                                                        {Object.keys(
                                                                                            datum
                                                                                                .data[
                                                                                                `${result}`
                                                                                            ]
                                                                                        ).map(
                                                                                            (
                                                                                                item: any,
                                                                                                index: number
                                                                                            ) => {
                                                                                                return datum
                                                                                                    .data[
                                                                                                    `${result}`
                                                                                                ][
                                                                                                    `${item}`
                                                                                                ] ? (
                                                                                                    <div
                                                                                                        className="flex flex-row text-sm"
                                                                                                        key={
                                                                                                            index
                                                                                                        }
                                                                                                    >
                                                                                                        <div className="flex-1">
                                                                                                            <label>
                                                                                                                {`${
                                                                                                                    itemList.find(
                                                                                                                        (
                                                                                                                            element
                                                                                                                        ) =>
                                                                                                                            element.keyName ===
                                                                                                                            item
                                                                                                                    )
                                                                                                                        .title
                                                                                                                }: `}
                                                                                                            </label>
                                                                                                        </div>
                                                                                                        <div className="flex flex-row">
                                                                                                            {datum
                                                                                                                .data[
                                                                                                                `${result}`
                                                                                                            ][
                                                                                                                `${item}`
                                                                                                            ] ==
                                                                                                            true
                                                                                                                ? '✅'
                                                                                                                : datum
                                                                                                                      .data[
                                                                                                                      `${result}`
                                                                                                                  ][
                                                                                                                      `${item}`
                                                                                                                  ]}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ) : null;
                                                                                            }
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    datum.data[
                                                                                        `${result}`
                                                                                    ]
                                                                                )}
                                                                            </td>
                                                                        );
                                                                    }
                                                                )}
                                                                {/* Add the storage_url to the data and open it in a new tab */}
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                                    <a
                                                                        href={
                                                                            datum.document
                                                                                ?.storage_url || '#'
                                                                        }
                                                                        className="text-blue-500 hover:text-blue-700 underline"
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                    >
                                                                        點擊開啟
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </InfiniteScroll>
                                    ) : (
                                        <div className="py-4">
                                            <p className="text-gray-500 text-sm">
                                                請點擊右上角 "+ 新增" 來選顯示欄位
                                            </p>
                                        </div>
                                    )
                                ) : (
                                    <div className="py-4">
                                        <p className="text-gray-500 text-sm">
                                            請點擊右上角 "+ 新增" 來選顯示欄位
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default FormFilterView;
