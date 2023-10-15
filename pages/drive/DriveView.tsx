import { Dialog, Menu, Transition } from '@headlessui/react';
import {
    CheckCircleIcon,
    ChevronDownIcon,
    ClockIcon,
    CloudIcon,
    DocumentIcon,
    ExclamationTriangleIcon,
    FolderIcon,
    PaperAirplaneIcon,
    PencilIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import _ from 'lodash';
import Router from 'next/router';
import {
    Dispatch,
    Fragment,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Folder } from '../../components/common/Widget/FolderTree';
import FolderTreeForMoving from '../../components/common/Widget/FolderTreeForMoving';
import InputNameModal from '../../components/common/Widget/InputNameModal';
import MyModal from '../../components/common/Widget/MyModal';
import SingleActionModel from '../../components/common/Widget/SingleActionModel';
import AmendLabel from '../../components/feature/classification/AmendLabel';
import BreadCrumb from '../../components/feature/drive/BreadCrumb';
import DeepUnderstandingModal from '../../components/feature/drive/DeepUnderstandingModal';
import EditItems from '../../components/feature/drive/EditItems';
import SearchLabelDocumentForm from '../../components/feature/drive/SearchLabelDocumentForm';
import TableRow from '../../components/feature/drive/TableRow';
import EditLabel from '../../components/feature/setting/label/EditLabel';
import { Box, boxesIntersect, useSelectionContainer } from '@air/react-drag-to-select';

interface DriveViewProps {
    id: string | string[] | null | undefined;
    name: string | string[] | null | undefined;
    showAllItemsData: any;
    showAllItemsLoading: boolean;
    mode: 'view' | 'move' | 'share' | 'newFolder';
    setMode: Dispatch<SetStateAction<'view' | 'move' | 'share' | 'newFolder'>>;
    target: any[];
    setTarget: Dispatch<SetStateAction<any[]>>;
    dest: Folder | null;
    setDest: Dispatch<SetStateAction<Folder | null>>;
    shareWith: any[];
    setShareWith: Dispatch<SetStateAction<any[]>>;
    handleShare: (id: string, user_email: string) => void;
    handleNewFolder: (name: string) => Promise<void>;
    countDocumentsByDateData: any;
    current: any;
    setCurrent: any;
    visableRename: boolean;
    setVisableRename: any;
    updateFolderOrDocumentHandler: any;
    deleteFolderOrDocumentHandler: any;
    visableDelete: boolean;
    setVisableDelete: any;
    allItemsData: any;
    allFoldersItemsData: any;
    showAllItemsHandler: any;
    documents_items: any;
    setDocumentsItems: any;
    folders_items: any;
    setFoldersItems: any;
    handleMoveItems: any;
    handleDeleteItems: any;
    handleDownloadItemsAndFolders: any;
    getAllLabelsData: any;
    search: any;
    confirmDocumentFormik?: any;
    addNewLabelHandler?: any;
    newLabelName: string;
    setNewLabelName: any;
    updateTag: boolean;
    setUpdateTag: any;
    schemasStatusReadyData: any;
    handleDeepUnderstanding: any;
}

export default function DriveView(props: DriveViewProps) {
    const {
        id = null,
        name = 'Root',
        showAllItemsData = null,
        showAllItemsLoading = null,
        mode = 'view',
        setMode = () => {},
        target = [],
        setTarget = () => {},
        dest = null,
        setDest = () => {},
        shareWith = [],
        setShareWith = () => {},
        handleShare = async () => {},
        handleNewFolder = async () => {},
        countDocumentsByDateData = null,
        current,
        setCurrent,
        visableRename,
        setVisableRename,
        updateFolderOrDocumentHandler,
        visableDelete,
        setVisableDelete,
        deleteFolderOrDocumentHandler,
        allItemsData,
        allFoldersItemsData,
        showAllItemsHandler,
        documents_items,
        setDocumentsItems,
        folders_items,
        setFoldersItems,
        handleMoveItems,
        handleDeleteItems,
        handleDownloadItemsAndFolders,
        getAllLabelsData,
        search,
        confirmDocumentFormik,
        newLabelName,
        setNewLabelName,
        addNewLabelHandler,
        updateTag,
        setUpdateTag,
        schemasStatusReadyData,
        handleDeepUnderstanding
    } = props;

    const shareWithInput = useRef<HTMLInputElement>(null);
    const newFolderNameInput = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [openEditLabel, setOpenEditLabel] = useState(false);
    const [openDeepUnderstanding, setOpenDeepUnderstanding] = useState(false);

    const selectableItems = useRef<
        {
            box: Box;
            type: string;
            id: string;
        }[]
    >([]);

    const tableBodyRef = useRef<HTMLDivElement>(null);
    const selectionBox = useRef<Box>();
    const { DragSelection } = useSelectionContainer({
        eventsElement: tableBodyRef.current,
        onSelectionChange(box) {
            if (!tableBodyRef.current?.parentElement) return;
            const scrollAwareBox: Box = {
                ...box,
                top: box.top + tableBodyRef.current.parentElement.scrollTop,
                left: box.left + tableBodyRef.current.parentElement.scrollLeft
            };

            selectionBox.current = scrollAwareBox;
        },
        onSelectionEnd() {
            const selectedItems: { folders: string[]; documents: string[] } = {
                folders: [],
                documents: []
            };
            selectableItems.current.forEach((item, index) => {
                if (!selectionBox.current) return;
                if (boxesIntersect(item.box, selectionBox.current)) {
                    selectedItems[item.type as 'folders' | 'documents'].push(item.id);
                }
            });
            setFoldersItems(selectedItems.folders);
            setDocumentsItems(selectedItems.documents);
        }
    });

    useEffect(() => {
        selectableItems.current = [];
        if (!tableBodyRef.current?.children?.[1]?.children?.[0]?.children) return;
        const tableRows = tableBodyRef.current.children[1].children[0].children;
        for (let i = 0; i < tableRows.length; i++) {
            const item = tableRows[i] as HTMLDivElement;
            if (!item.dataset.id || !item.dataset.type) continue;
            selectableItems.current.push({
                id: item.dataset.id,
                type: item.dataset.type,
                box: item.getBoundingClientRect()
            });
        }
    }, [allItemsData, allFoldersItemsData, tableBodyRef]);

    const [cards, setCards] = useState<any[]>([
        { name: '今天已上傳的文檔', href: '/classification/logs', icon: CloudIcon, amount: 0 },
        {
            name: '今天已分類的文檔',
            href: '/classification/logs',
            icon: CheckCircleIcon,
            amount: 0
        },
        { name: '今天未分類的文檔', href: '/classification/logs', icon: ClockIcon, amount: 0 },
        {
            name: '累計未分類的文檔',
            href: '/classification/logs',
            icon: ExclamationTriangleIcon,
            amount: 0
        }
    ]);

    const setCheckedData = useCallback(
        (type: string, checked: boolean, value: string) => {
            if (type == 'folders') {
                const newData = checked
                    ? [...folders_items, value]
                    : folders_items.filter((_value: string) => _value !== value);
                setFoldersItems(newData);
            } else {
                const newData = checked
                    ? [...documents_items, value]
                    : documents_items.filter((_value: string) => _value !== value);
                setDocumentsItems(newData);
            }
        },
        [folders_items, documents_items, setFoldersItems, setDocumentsItems]
    );

    const clearCheckedData = () => {
        setFoldersItems([]);
        setDocumentsItems([]);
    };

    useEffect(() => {
        if (countDocumentsByDateData) {
            setCards([
                {
                    name: '今天已上傳的文檔',
                    href: '/classification/logs',
                    icon: CloudIcon,
                    amount: countDocumentsByDateData?.documents_count || 0
                },
                {
                    name: '今天已分類的文檔',
                    href: '/classification/logs',
                    icon: CheckCircleIcon,
                    amount: countDocumentsByDateData?.confirmed_count || 0
                },
                {
                    name: '今天未分類的文檔',
                    href: '/classification/logs',
                    icon: ClockIcon,
                    amount:
                        countDocumentsByDateData?.documents_count -
                            countDocumentsByDateData?.unconfirmed_count || 0
                },
                {
                    name: '累計未分類的文檔',
                    href: '/classification/logs',
                    icon: ExclamationTriangleIcon,
                    amount: countDocumentsByDateData?.total_unconfirmed_count || 0
                }
            ]);
        }
    }, [countDocumentsByDateData]);

    return (
        <>
            <SingleActionModel
                open={updateTag}
                setOpen={setUpdateTag}
                title={'進行中......'}
                content={'正在更新...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <AmendLabel
                open={open}
                setOpen={setOpen}
                allLabelsData={getAllLabelsData}
                confirmDocumentFormik={confirmDocumentFormik}
                isSubmit={true}
                setTagName={(name: string) => {}}
                setOpenEditLabel={setOpenEditLabel}
            />
            <EditLabel
                {...{
                    open: openEditLabel,
                    setOpen: setOpenEditLabel,
                    tagTypes: null,
                    newLabelName,
                    setNewLabelName,
                    addNewLabelHandler
                }}
            />
            <EditItems
                moveItems={() => {
                    setCurrent({ type: 'moveItems' });
                    setMode('move');
                }}
                visibleSearchItems={documents_items?.length > 0 && folders_items?.length == 0}
                searchItems={() => {
                    if (documents_items && documents_items.length > 0)
                        Router.push({
                            pathname: '/generate',
                            query: {
                                document_ids: documents_items.join(',')
                            }
                        });
                }}
                visibleUpdateTag={documents_items?.length > 0 && folders_items?.length == 0}
                updateTag={() => {
                    setOpen(true);
                }}
                clearItems={() => {
                    clearCheckedData();
                }}
                deleteItems={() => {
                    handleDeleteItems();
                }}
                downloadItems={() => {
                    handleDownloadItemsAndFolders();
                }}
                visibleDeepUnderstanding={documents_items?.length > 0 && folders_items?.length == 0}
                deepUnderstanding={() => {
                    setOpenDeepUnderstanding(true);
                }}
                count={documents_items?.length + folders_items?.length}
            />
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col ">
                <div className="max-w-4xl mx-auto my-6 h-auto flex justify-center items-center hidden">
                    <div className="w-full mx-auto text-center">
                        <h2 className="text-6xl font-extrabold text-gray-900 sm:text-6xl mb-2">
                            DocAI
                        </h2>
                        {/* <SearchDocumentForm getAllLabelsData={getAllLabelsData} search={search} /> */}
                    </div>
                </div>
                <div className="mx-auto max-w-6xl hidden">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">上傳概況</h2>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {/* Card */}
                        {cards.map((card) => (
                            <div
                                key={card.name}
                                className="overflow-hidden rounded-lg bg-white shadow"
                            >
                                <div className="p-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <card.icon
                                                className="h-6 w-6 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="truncate text-sm font-medium text-gray-500">
                                                    {card.name}
                                                </dt>
                                                <dd>
                                                    <div className="text-lg font-medium text-gray-900">
                                                        {card.amount}
                                                    </div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-2 py-3">
                                    <div className="text-sm">
                                        <a
                                            href={card.href}
                                            className="font-medium text-cyan-700 hover:text-cyan-900"
                                        >
                                            View all
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="py-2 flex flex-col gap-4 h-full pb-[0px]">
                    <div className="flex justify-between flex-0">
                        <h2 className="text-lg font-medium leading-6 text-gray-900">文件倉庫</h2>
                        <a
                            className="flex flex-row items-center  text-indigo-600 underline cursor-pointer rounded-md"
                            onClick={() => {
                                Router.push('/classification/logs');
                            }}
                        >
                            智能文檔處理
                        </a>
                    </div>
                    <div className="flex flex-0 flex-row gap-2 justify-between">
                        {showAllItemsData == null ? (
                            <div className="animate-pulse flex flex-row justify-center items-center gap-2">
                                <div className="h-4 w-32 bg-gray-400 rounded"></div>
                            </div>
                        ) : null}
                        {showAllItemsData && (
                            <BreadCrumb
                                ancestors={showAllItemsData?.ancestors}
                                id={id?.toString()}
                                name={name?.toString()}
                            />
                        )}

                        <Menu as="div" className="relative">
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
                                                        setMode('newFolder');
                                                    }}
                                                >
                                                    <FolderIcon className="h-5 mr-2 text-blue-200" />
                                                    資料夾
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
                                <div className=" w-6 items-center flex justify-center"></div>
                                <div className="px-2 py-3 w-1/12">
                                    <DocumentIcon className="ml-auto h-6" />
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
                        <div className="w-full relative" ref={tableBodyRef}>
                            <DragSelection />
                            {(allItemsData || allFoldersItemsData) &&
                            [...(allItemsData || []), ...(allFoldersItemsData || [])].length !=
                                0 ? (
                                <InfiniteScroll
                                    dataLength={allItemsData?.length} //This is important field to render the next data
                                    next={showAllItemsHandler}
                                    hasMore={showAllItemsData?.meta?.next_page != null}
                                    height={'auto'}
                                    // className="max-h-[45vh] sm:max-h-[50vh]"
                                    // style={{ maxHeight: '50vh' }}
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
                                    {allFoldersItemsData?.map((doc: any) => {
                                        return (
                                            <TableRow
                                                key={doc.id}
                                                doc={doc}
                                                type="folders"
                                                setTarget={setTarget}
                                                setMode={setMode}
                                                setVisableRename={setVisableRename}
                                                setVisableDelete={setVisableDelete}
                                                setCurrent={setCurrent}
                                                setCheckedData={setCheckedData}
                                                checked={_.includes(folders_items, doc.id)}
                                            />
                                        );
                                    })}

                                    {allItemsData?.map((doc: any) => {
                                        return (
                                            <TableRow
                                                key={doc.id}
                                                doc={doc}
                                                type="documents"
                                                setTarget={setTarget}
                                                setMode={setMode}
                                                setVisableRename={setVisableRename}
                                                setVisableDelete={setVisableDelete}
                                                setCurrent={setCurrent}
                                                setCheckedData={setCheckedData}
                                                checked={_.includes(documents_items, doc.id)}
                                            />
                                        );
                                    })}
                                </InfiniteScroll>
                            ) : (
                                <div className="py-4 items-center justify-center flex">
                                    {showAllItemsData?.success
                                        ? '沒有檔案'
                                        : showAllItemsLoading
                                        ? '載入中...'
                                        : showAllItemsData?.error || 'Error'}
                                </div>
                            )}
                        </div>
                        <table className="hidden">
                            <thead className="bg-gray-50 z-10 shadow-sm sticky top-0 border-b border-b-gray-200">
                                <tr>
                                    <th scope="col" className="px-2 py-3 w-1/12">
                                        <DocumentIcon className="ml-auto h-6" />
                                    </th>
                                    <th scope="col" className="px-2 py-3 w-5/12 text-left">
                                        名稱
                                    </th>
                                    <th scope="col" className="px-2 py-3 w-2/12 text-right">
                                        標籤
                                    </th>
                                    <th scope="col" className="px-2 py-3 w-2/12 text-right">
                                        動作
                                    </th>
                                    <th scope="col" className="pr-6 py-3 w-2/12 text-right">
                                        修改日期
                                    </th>
                                    <th scope="col" className="pr-6 py-3 w-2/12 text-right">
                                        擁有人
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y w-full divide-gray-100">
                                {showAllItemsData?.folders &&
                                showAllItemsData?.documents &&
                                showAllItemsData?.success &&
                                (showAllItemsData.folders.length > 0 ||
                                    showAllItemsData.documents.length > 0) ? (
                                    <>
                                        {showAllItemsData.folders.map((doc: any) => {
                                            return (
                                                <TableRow
                                                    key={doc.id}
                                                    doc={doc}
                                                    type="folders"
                                                    setTarget={setTarget}
                                                    setMode={setMode}
                                                    setVisableRename={setVisableRename}
                                                    setVisableDelete={setVisableDelete}
                                                    setCurrent={setCurrent}
                                                />
                                            );
                                        })}
                                        {showAllItemsData.documents.map((doc: any) => {
                                            return (
                                                <TableRow
                                                    key={doc.id}
                                                    doc={doc}
                                                    type="documents"
                                                    setTarget={setTarget}
                                                    setMode={setMode}
                                                    setVisableRename={setVisableRename}
                                                    setVisableDelete={setVisableDelete}
                                                    setCurrent={setCurrent}
                                                />
                                            );
                                        })}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-2 py-4 text-center text-gray-500"
                                        >
                                            {showAllItemsData?.success
                                                ? '沒有檔案'
                                                : showAllItemsLoading
                                                ? '載入中...'
                                                : showAllItemsData?.error || 'Error'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <SearchLabelDocumentForm getAllLabelsData={getAllLabelsData} search={search} />
                </div>
            </div>

            <FolderTreeForMoving
                {...{
                    mode,
                    setMode,
                    dest,
                    setDest,
                    targetId: target?.[0]?.id,
                    current,
                    handleMoveItems
                }}
            />
            <Transition show={mode === 'share'} as={Fragment}>
                <Dialog
                    className="fixed z-10 inset-0 overflow-y-auto"
                    onClose={() => {
                        if (shareWithInput.current) setShareWith([shareWithInput.current?.value]);
                        setMode('view');
                    }}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <div className="absolute m-auto w-[28rem] h-44 bg-white rounded-lg shadow-lg top-0 left-0 right-0 bottom-0">
                            <Dialog.Panel className="flex flex-col gap-3 p-5 h-full">
                                <h3 className="text-xl font-bold">共用 {target?.[0]?.name}</h3>
                                <div className="flex flex-row-reverse">
                                    <div className="rounded-r-md border bg-gray-200 text-gray-400 border-l-0 border-gray-200 p-2 gap-1 flex items-center">
                                        <PencilIcon className="h-4" />
                                        <ChevronDownIcon className="h-4" />
                                    </div>
                                    <input
                                        ref={shareWithInput}
                                        placeholder="新增使用者"
                                        defaultValue={shareWith[0]}
                                        type="text"
                                        onFocus={(e) => e.currentTarget.select()}
                                        className="border px-3 py-2 rounded-l-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 w-full text-sm"
                                    />
                                </div>
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded px-6 py-2 self-end mt-auto"
                                    onClick={() => {
                                        if (shareWithInput.current?.value) {
                                            setShareWith([shareWithInput.current?.value]);
                                            handleShare(
                                                target[0].id,
                                                shareWithInput.current?.value
                                            );
                                        }
                                    }}
                                >
                                    共用
                                </button>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
            <Transition show={mode === 'newFolder'} as={Fragment}>
                <Dialog
                    className="fixed z-10 inset-0 overflow-y-auto"
                    onClose={() => {
                        if (shareWithInput.current) setShareWith([shareWithInput.current?.value]);
                        setMode('view');
                    }}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <div className="absolute m-auto w-[28rem] h-44 bg-white rounded-lg shadow-lg top-0 left-0 right-0 bottom-0">
                            <Dialog.Panel className="flex flex-col gap-3 p-5 h-full">
                                <h3 className="text-xl font-bold">新增資料夾</h3>
                                <div className="flex flex-row">
                                    <input
                                        ref={newFolderNameInput}
                                        placeholder="輸入資料夾名稱"
                                        type="text"
                                        onFocus={(e) => e.currentTarget.select()}
                                        className="border px-3 py-2 rounded-l-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 w-full text-sm"
                                    />
                                </div>
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded px-6 py-2 self-end mt-auto"
                                    onClick={() => {
                                        if (newFolderNameInput.current?.value) {
                                            handleNewFolder(newFolderNameInput.current?.value);
                                        }
                                    }}
                                >
                                    新增
                                </button>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
            <InputNameModal
                visable={visableRename}
                current={current}
                setCurrent={setCurrent}
                description={`輸入新的名稱`}
                cancelClick={() => {
                    setVisableRename(false);
                }}
                confirmClick={() => {
                    setVisableRename(false);
                    updateFolderOrDocumentHandler();
                }}
            />
            <MyModal
                visable={visableDelete}
                description={`是否刪除"${current?.name}"?`}
                cancelClick={() => {
                    setVisableDelete(false);
                }}
                confirmClick={() => {
                    setVisableDelete(false);
                    deleteFolderOrDocumentHandler();
                }}
            />

            <DeepUnderstandingModal
                visable={openDeepUnderstanding}
                schemasStatusReadyData={schemasStatusReadyData}
                description={`選擇深度理解模型`}
                cancelClick={() => {
                    setOpenDeepUnderstanding(false);
                }}
                confirmClick={(form_schema_id: string, needs_approval: boolean) => {
                    handleDeepUnderstanding(form_schema_id, needs_approval);
                    setOpenDeepUnderstanding(false);
                }}
            />
        </>
    );
}
