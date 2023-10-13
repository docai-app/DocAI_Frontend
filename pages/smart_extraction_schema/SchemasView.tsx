import { Menu, Transition } from '@headlessui/react';
import {
    ChevronDownIcon,
    CircleStackIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    TableCellsIcon
} from '@heroicons/react/24/outline';
import Router, { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SingleActionModel from '../../components/common/Widget/SingleActionModel';
import SchemaTableRow from '../../components/feature/document/smart_extraction_schema/SchemaTableRow';
import SearchLabelForm from '../../components/feature/document/smart_extraction_schema/SearchLabelSearchForm';
import useAlert from '../../hooks/useAlert';

interface SchemasViewProps {
    open: boolean;
    setOpen: any;
    allSchemas: [];
    meta: any;
    search: any;
    showAllSchemasHandler: any;
    showHasLabelSchemasHandler: any;
    getAllLabelsData: any;
    users?: any;
}

function SchemasView(props: SchemasViewProps) {
    const {
        open,
        setOpen,
        allSchemas,
        meta,
        search,
        showAllSchemasHandler,
        showHasLabelSchemasHandler,
        getAllLabelsData,
        users
    } = props;
    const router = useRouter();
    const { setAlert } = useAlert();
    const [currectSchema, setCurrectShema] = useState(null);
    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                {...{
                    title: '正在進行中',
                    content: '正在加載數據...',
                    icon: (
                        <MagnifyingGlassIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                        />
                    )
                }}
            />
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col ">
                <div className="py-2 flex flex-col gap-4 h-full pb-[0px]">
                    <div className="flex  flex-0 items-center justify-between">
                        <h2 className="text-lg font-medium leading-6 text-gray-900">數據源</h2>
                        <a
                            className="flex flex-row items-center  text-indigo-600 underline cursor-pointer rounded-md"
                            onClick={() => {
                                Router.push('/search/form/schema');
                            }}
                        >
                            數據搜尋
                        </a>
                        <Menu as="div" className="relative hidden">
                            <Menu.Button
                                as="button"
                                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow flex flex-row items-center gap-2"
                            >
                                <PlusIcon className="h-4" />
                                <div className="whitespace-nowrap">新增</div>
                                <ChevronDownIcon className="h-4" />
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Menu.Items className="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="p-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${
                                                        active ? 'bg-gray-100' : ''
                                                    } p-2 rounded-md w-full text-left flex flex-row items-center`}
                                                    onClick={() => {
                                                        // setMode('newFolder');
                                                    }}
                                                >
                                                    <TableCellsIcon className="h-5 mr-2 text-gray-400" />
                                                    數據總表
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    <div className="flex-1 bg-white shadow-md rounded-lg overflow-auto ring-1 ring-black ring-opacity-5 relative">
                        <div className="bg-gray-50 z-10 shadow-sm sticky top-0 border-b border-b-gray-200 w-full">
                            <div className="w-full flex ">
                                <div className=" w-2 items-center flex justify-center"></div>
                                <div className="px-2 py-3 w-1/12">
                                    <CircleStackIcon className="ml-auto h-6 text-gray-400" />
                                </div>
                                <div className="px-2 py-3 w-5/12 text-left font-bold">名稱</div>
                                <div className="px-2 py-3 w-2/12 text-right font-bold">標籤</div>
                                <div className="px-2 py-3 w-2/12 text-right font-bold">動作</div>
                                <div className="pr-6 py-3 w-2/12 text-right font-bold">
                                    修改日期
                                </div>
                                <div className="pr-6 py-3 w-2/12 text-right font-bold">擁有人</div>
                            </div>
                        </div>
                        <div className="w-full">
                            <InfiniteScroll
                                dataLength={allSchemas?.length} //This is important field to render the next data
                                next={showAllSchemasHandler}
                                hasMore={meta?.next_page != null}
                                height={'auto'}
                                // className="max-h-[50vh] sm:max-h-[60vh]"
                                // style={{ maxHeight: '50vh' }}
                                loader={
                                    <p className="p-4 text-center">
                                        <b>載入中...</b>
                                    </p>
                                }
                                endMessage={
                                    <p className="p-4 text-gray-300 text-center">沒有更多資料</p>
                                }
                            >
                                {allSchemas?.map((schema: any, index: number) => {
                                    return (
                                        <SchemaTableRow
                                            key={index}
                                            schema={schema}
                                            setCurrectShema={setCurrectShema}
                                            getAllLabelsData={getAllLabelsData}
                                            users={users}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </div>
                    </div>

                    <SearchLabelForm
                        getAllLabelsData={getAllLabelsData}
                        search={search}
                        schema={currectSchema}
                        setShema={setCurrectShema}
                        showHasLabelSchemasHandler={showHasLabelSchemasHandler}
                    />
                </div>
            </div>
        </>
    );
}
export default SchemasView;
