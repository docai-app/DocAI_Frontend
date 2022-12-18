import { Dialog, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, DocumentIcon, PencilIcon, PlusIcon } from '@heroicons/react/outline';
import { FolderIcon } from '@heroicons/react/solid';
import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import { Folder } from '../../components/common/Widget/FolderTree';
import FolderTreeForMoving from '../../components/common/Widget/FolderTreeForMoving';
import InputNameModal from '../../components/common/Widget/InputNameModal';
import MyModal from '../../components/common/Widget/MyModal';
import BreadCrumb from '../../components/feature/drive/BreadCrumb';
import TableRow from '../../components/feature/drive/TableRow';

interface DriveViewProps {
    id: string | string[] | null | undefined;
    name: string | string[] | null | undefined;
    showAllItemsData: any;
    showAllItemsLoading: boolean;
    mode: 'view' | 'move' | 'share' | 'newFolder';
    setMode: Dispatch<SetStateAction<'view' | 'move' | 'share' | 'newFolder'>>;
    target: any[];
    setTarget: Dispatch<SetStateAction<any[]>>;
    movingDest: Folder | null;
    setMovingDest: Dispatch<SetStateAction<Folder | null>>;
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
        movingDest = null,
        setMovingDest = () => {},
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
        deleteFolderOrDocumentHandler
    } = props;

    const shareWithInput = useRef<HTMLInputElement>(null);
    const newFolderNameInput = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">DocAI</h2>
                        <dl className="mt-10 mb-10 flex justify-evenly items-center rounded-lg bg-white shadow-lg">
                            <div className="p-4 text-center items-center justify-center">
                                <p className="text-4xl font-extrabold text-indigo-600">
                                    {countDocumentsByDateData?.documents_count || 0}
                                </p>
                                <p className=" text-gray-500">今天上傳文檔</p>
                            </div>
                            <div className="p-4 text-center">
                                <p className="text-4xl font-extrabold text-indigo-600">
                                    {countDocumentsByDateData?.confirmed_count || 0}
                                </p>
                                <p className=" text-gray-500">今天已處理文檔</p>
                            </div>
                            <div className="p-4 text-center">
                                <p className="text-4xl font-extrabold text-indigo-600">
                                    {countDocumentsByDateData?.unconfirmed_count || 0}
                                </p>
                                <p className=" text-gray-500">累積未處理文檔</p>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="py-4 flex flex-col gap-4 h-full">
                    <div className="flex flex-row gap-2 pb-4 border-b justify-between">
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
                                <Menu.Items className="absolute z-20 left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                        {/*
                        <button className="py-2 px-4 border-gray-100 hover:bg-gray-200/70 text-black rounded flex flex-row items-center gap-2">
                            <ShareIcon className="h-4" />
                            <div className="whitespace-nowrap">共用</div>
                        </button>
                        */}
                    </div>
                    {/* <div> */}
                    {/* {showAllItemsData && (
                            <BreadCrumb
                                ancestors={showAllItemsData?.ancestors}
                                id={id?.toString()}
                                name={name?.toString()}
                            />
                        )} */}
                    {/* <a
                            className="hover:underline cursor-pointer text-lg"
                            onClick={() => {
                                router.back();
                            }}
                        >{`<< 返回`}</a> */}
                    {/* </div> */}
                    <div className="bg-white shadow-md rounded-lg overflow-auto ring-1 ring-black ring-opacity-5">
                        <table className="w-full">
                            <thead className="bg-gray-50 z-10 shadow-sm sticky top-0 border-b border-b-gray-200">
                                <tr>
                                    <th scope="col" className="px-2 py-3 w-1/12">
                                        <DocumentIcon className="ml-auto h-6" />
                                    </th>
                                    <th scope="col" className="px-2 py-3 w-5/12 text-left">
                                        名稱
                                    </th>
                                    <th scope="col" className="px-2 py-3 w-2/12 text-right">
                                        動作
                                    </th>
                                    <th scope="col" className="pr-6 py-3 w-2/12 text-right">
                                        修改日期
                                    </th>
                                    <th scope="col" className="pr-6 py-3 w-2/12 text-right">
                                        上載者
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
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
                </div>
            </div>
            <FolderTreeForMoving
                {...{
                    mode,
                    setMode,
                    movingDest,
                    setMovingDest,
                    targetId: target?.[0]?.id,
                    current
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
        </>
    );
}
