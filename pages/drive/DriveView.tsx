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
import { Dispatch, SetStateAction, useCallback } from 'react';
import FolderTree from '../../components/feature/drive/FolderTree';

interface DriveViewProps {
    showAllItemsData: any;
    showAllItemsLoading: boolean;
    mode: 'view' | 'move' | 'share';
    moving: any[];
    setMoving: Dispatch<SetStateAction<any[]>>;
    movingDest: string | null;
    setMovingDest: Dispatch<SetStateAction<string | null>>;
    handleMove: (document_id: string, folder_id: string) => void;
    toggleMove: (b: boolean) => void;
    shareWith: any[];
    setShareWith: Dispatch<SetStateAction<any[]>>;
    handleShare: () => void;
    toggleShare: (b: boolean) => void;
}

export default function DriveView(props: DriveViewProps) {
    const router = useRouter();
    const {
        showAllItemsData,
        showAllItemsLoading,
        mode,
        moving,
        setMoving,
        movingDest,
        setMovingDest,
        handleMove,
        toggleMove,
        shareWith,
        setShareWith,
        handleShare,
        toggleShare
    } = props;

    const tableRow = useCallback(
        (doc: any, type: string) => {
            const updated_at = new Date(doc.updated_at);
            const now = new Date();
            let date = '';
            if (updated_at.getFullYear() === now.getFullYear()) {
                if (
                    updated_at.getMonth() === now.getMonth() &&
                    updated_at.getDate() === now.getDate()
                )
                    date = `${
                        updated_at.getHours() < 10
                            ? '0' + updated_at.getHours().toString()
                            : updated_at.getHours()
                    }:${
                        updated_at.getMinutes() < 10
                            ? '0' + updated_at.getMinutes().toString()
                            : updated_at.getMinutes()
                    }`;
                else
                    date = `${
                        updated_at.getMonth() < 9
                            ? '0' + (updated_at.getMonth() + 1).toString()
                            : updated_at.getMonth() + 1
                    }/${
                        updated_at.getDate() < 10
                            ? '0' + updated_at.getDate().toString()
                            : updated_at.getDate()
                    }`;
            } else {
                date = `${updated_at.getFullYear()}/${
                    updated_at.getMonth() < 9
                        ? '0' + (updated_at.getMonth() + 1).toString()
                        : updated_at.getMonth() + 1
                }/${
                    updated_at.getDate() < 10
                        ? '0' + updated_at.getDate().toString()
                        : updated_at.getDate()
                }`;
            }
            const url = doc.storage_url || `/drive/${doc.id}`;
            return (
                <tr key={doc.id}>
                    <td scope="col" className="px-2 py-3">
                        {type === 'documents' ? (
                            <DocumentIcon className="ml-auto h-6" />
                        ) : (
                            <FolderIcon className="ml-auto h-6" />
                        )}
                    </td>
                    <td className="px-2 py-4 text-left">
                        <Link href={url}>
                            <a>{doc.name}</a>
                        </Link>
                    </td>
                    <td className="px-2 py-4 flex justify-end gap-2">
                        <DocumentDuplicateIcon
                            className="h-5 text-gray-300 hover:text-gray-500 cursor-pointer"
                            onClick={() => {
                                toggleMove(true);
                                setMoving([doc]);
                            }}
                        />
                        <ShareIcon
                            className="h-5 text-gray-300 hover:text-gray-500 cursor-pointer"
                            onClick={() => {
                                toggleShare(true);
                                setShareWith([doc]);
                            }}
                        />
                    </td>
                    <td className="pr-6 py-4 text-right">{date}</td>
                </tr>
            );
        },
        [toggleMove, setMoving, toggleShare, setShareWith]
    );

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
                    <div className="py-3">
                        <a
                            className="hover:underline cursor-pointer text-lg"
                            onClick={() => {
                                router.back();
                            }}
                        >{`<< 返回`}</a>
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
                                    showAllItemsData.folders.map((doc: any) => {
                                        return tableRow(doc, 'folders');
                                    })}
                                {showAllItemsData?.documents &&
                                    showAllItemsData.documents.map((doc: any) => {
                                        return tableRow(doc, 'documents');
                                    })}
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
                            setMoving([]);
                        }}
                    ></div>
                    <div className="absolute h-[calc(100vh-4rem)] shadow-lg right-0 top-16 bg-white w-[28rem]">
                        <div className="w-full h-full flex flex-col">
                            <h1 className="p-5 font-bold text-3xl">移動 {moving[0].name} 到</h1>
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
                                        onClick={() => handleMove(moving[0].id, movingDest)}
                                    >
                                        移動
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
            {mode === 'share' && (
                <>
                    <div
                        className="absolute h-[calc(100vh-4rem)] bg-black/30 top-16 w-full"
                        onClick={() => {
                            toggleShare(false);
                            setShareWith([]);
                        }}
                    ></div>
                    <div className="absolute m-auto w-[28rem] h-44 gap-3 flex flex-col p-5 bg-white rounded-lg shadow-lg top-0 left-0 right-0 bottom-0">
                        <h3 className="text-xl font-bold">共用 {shareWith[0].name}</h3>
                        <div className="flex flex-row-reverse">
                            <div className="rounded-r-md border bg-gray-200 text-gray-400 border-l-0 border-gray-200 p-2 gap-1 flex items-center">
                                <PencilIcon className="h-4" />
                                <ChevronDownIcon className="h-4" />
                            </div>
                            <input
                                placeholder="新增使用者"
                                type="text"
                                className="border px-3 py-2 rounded-l-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 w-full text-sm"
                            />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-6 py-2 self-end mt-auto">共用</button>
                    </div>
                </>
            )}
        </>
    );
}
