import { DocumentIcon, FolderIcon, PhotographIcon, PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useCallback } from 'react';

interface DriveViewProps {
    showAllFolderItemsData: any;
    showAllFolderItemsLoading: boolean;
}

export default function DriveView(props: DriveViewProps) {
    const router = useRouter();
    const { showAllFolderItemsData, showAllFolderItemsLoading } = props;

    const tableRow = useCallback((doc: any, type: string) => {
        const updated_at = new Date(doc.updated_at);
        const now = new Date();
        let date = '';
        if (updated_at.getFullYear() === now.getFullYear()) {
            if (updated_at.getMonth() === now.getMonth() && updated_at.getDate() === now.getDate())
                date = `${
                    updated_at.getHours() < 10 ? '0' + updated_at.getHours() : updated_at.getHours()
                }:${
                    updated_at.getMinutes() < 10
                        ? '0' + updated_at.getMinutes()
                        : updated_at.getMinutes()
                }`;
            else date = `${updated_at.getMonth() + 1}/${updated_at.getDate()}`;
        } else {
            date = `${updated_at.getFullYear()}/${
                updated_at.getMonth() + 1
            }/${updated_at.getDate()}`;
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
                <td className="px-2 py-4 text-left">{date}</td>
                <td className="px-2 py-4 text-left"></td>
            </tr>
        );
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 flex flex-col gap-4">
                <div className="flex flex-row gap-2 pb-4 border-b">
                    <button className="py-2 px-4 bg-indigo-600 text-white rounded shadow flex flex-row items-center gap-2">
                        <PlusIcon className="h-4" />
                        <div className="whitespace-nowrap">新增</div>
                    </button>
                </div>
                <div className="py-3">
                    <a
                        className="hover:underline cursor-pointer text-lg"
                        onClick={() => {
                            router.back();
                        }}
                    >{`<< 返回`}</a>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden ring-1 ring-black ring-opacity-5">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 shadow-sm">
                            <tr>
                                <th scope="col" className="px-2 py-3 w-1/12">
                                    <DocumentIcon className="ml-auto h-6" />
                                </th>
                                <th scope="col" className="px-2 py-3 w-5/12 text-left">
                                    名稱
                                </th>
                                <th scope="col" className="px-2 py-3 w-4/12 text-left">
                                    修改日期
                                </th>
                                <th scope="col" className="px-2 py-3 w-2/12 text-left">
                                    檔案大小
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {showAllFolderItemsData?.folders &&
                                showAllFolderItemsData.folders.map((doc: any) => {
                                    return tableRow(doc, 'folders');
                                })}
                            {showAllFolderItemsData?.documents &&
                                showAllFolderItemsData.documents.map((doc: any) => {
                                    return tableRow(doc, 'documents');
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
