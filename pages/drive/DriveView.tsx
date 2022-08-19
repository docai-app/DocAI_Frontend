import {
    ChevronDownIcon,
    DocumentIcon,
    FolderIcon,
    PencilIcon,
    PlusIcon,
    ShareIcon
} from '@heroicons/react/outline';
import { DocumentDuplicateIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction, useCallback, useRef } from 'react';
import FolderTree from '../../components/feature/drive/FolderTree';
import { Dialog, Transition } from '@headlessui/react';
import TableRow from '../../components/feature/drive/TableRow';
import BreadCrumb from '../../components/feature/drive/BreadCrumb';

interface DriveViewProps {
    id: string | string[] | null | undefined;
    name: string | string[] | null | undefined;
    showAllItemsData: any;
    showAllItemsLoading: boolean;
    mode: 'view' | 'move' | 'share';
    target: any[];
    setTarget: Dispatch<SetStateAction<any[]>>;
    movingDest: string | null;
    setMovingDest: Dispatch<SetStateAction<string | null>>;
    handleMove: (document_id: string, folder_id: string) => void;
    toggleMove: (b: boolean) => void;
    shareWith: any[];
    setShareWith: Dispatch<SetStateAction<any[]>>;
    handleShare: (id: string, user_email: string) => void;
    toggleShare: (b: boolean) => void;
}

export default function DriveView(props: DriveViewProps) {
    const {
        id = null,
        name = 'Root',
        showAllItemsData = null,
        showAllItemsLoading = null,
        mode = 'view',
        target = [],
        setTarget = () => {},
        movingDest = null,
        setMovingDest = () => {},
        handleMove = () => {},
        toggleMove = () => {},
        shareWith = [],
        setShareWith = () => {},
        handleShare = () => {},
        toggleShare = () => {}
    } = props;

    const shareWithInput = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="py-4 flex flex-col gap-4 h-full">
                    <div className="flex flex-row gap-2 pb-4 border-b">
                        <button className="py-2 px-4 bg-indigo-600 hover:bg-indigo-900 text-white rounded shadow flex flex-row items-center gap-2">
                            <PlusIcon className="h-4" />
                            <div className="whitespace-nowrap">新增</div>
                        </button>
                        {/*
                        <button className="py-2 px-4 border-gray-100 hover:bg-gray-200/70 text-black rounded flex flex-row items-center gap-2">
                            <ShareIcon className="h-4" />
                            <div className="whitespace-nowrap">共用</div>
                        </button>
                        */}
                    </div>
                    <div>
                        {showAllItemsData && (
                            <BreadCrumb
                                ancestors={showAllItemsData?.ancestors}
                                id={id?.toString()}
                                name={name?.toString()}
                            />
                        )}
                        {/*<a
                            className="hover:underline cursor-pointer text-lg"
                            onClick={() => {
                                router.back();
                            }}
                        >{`<< 返回`}</a>*/}
                    </div>
                    <div className="bg-white shadow-md rounded-lg overflow-auto ring-1 ring-black ring-opacity-5">
                        <table className="w-full">
                            <thead className="bg-gray-50 shadow-sm sticky top-0 border-b border-b-gray-200">
                                <tr>
                                    <th scope="col" className="px-2 py-3 w-1/12">
                                        <DocumentIcon className="ml-auto h-6" />
                                    </th>
                                    <th scope="col" className="px-2 py-3 w-6/12 text-left">
                                        名稱
                                    </th>
                                    <th scope="col" className="px-2 py-3 w-3/12 text-right">
                                        動作
                                    </th>
                                    <th scope="col" className="pr-6 py-3 w-2/12 text-right">
                                        修改日期
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
                                                    toggleMove={toggleMove}
                                                    toggleShare={toggleShare}
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
                                                    toggleMove={toggleMove}
                                                    toggleShare={toggleShare}
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
            {mode === 'move' && (
                <>
                    <div
                        className="absolute h-[calc(100vh-4rem)] bg-black/30 top-16 w-full"
                        onClick={() => {
                            toggleMove(false);
                            setTarget([]);
                        }}
                    ></div>
                    <div className="absolute h-[calc(100vh-4rem)] shadow-lg right-0 top-16 bg-white w-[28rem]">
                        <div className="w-full h-full flex flex-col">
                            <h1 className="p-5 font-bold text-3xl">移動 {target[0].name} 到</h1>
                            <div className="pr-5 overflow-auto">
                                <FolderTree
                                    expanded={true}
                                    movingDest={movingDest}
                                    setMovingDest={setMovingDest}
                                />
                            </div>
                            {movingDest != null && (
                                <div className="py-5 px-5 flex">
                                    <button
                                        className="ml-auto px-3 py-2 bg-green-600 text-white rounded-md"
                                        onClick={() => handleMove(target[0].id, movingDest)}
                                    >
                                        移動
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
            <Transition show={mode === 'share'} as={Fragment}>
                <Dialog
                    className="fixed z-10 inset-0 overflow-y-auto"
                    onClose={() => {
                        if (shareWithInput.current) setShareWith([shareWithInput.current?.value]);
                        toggleShare(false);
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
        </>
    );
}
