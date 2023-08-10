import { FolderIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import { Folder } from './FolderTree';
import FolderTreeForSelect from './FolderTreeForSelect';

interface DocumentPathProps {
    modeType: string;
    target_folder_id?: string;
    set_target_folder_id: any;
    canEditPath?: boolean;
}

const apiSetting = new Api();

export default function DocumentPath(props: DocumentPathProps) {
    const { modeType, target_folder_id, set_target_folder_id, canEditPath = true } = props;

    const [mode, setMode] = useState('');
    const [dest, setDest] = useState<Folder | null>(null);
    const [documentPath, setDocumentPath] = useState<{ id: string | null; name: string }[]>([
        { id: null, name: 'Root' }
    ]);

    const [{ data: showFolderByIDData }, showFolderByID] = useAxios({}, { manual: true });

    useEffect(() => {
        if (showFolderByIDData?.success) {
            setDocumentPath([
                { id: null, name: 'Root' },
                ...showFolderByIDData.ancestors.slice().reverse(),
                showFolderByIDData.folder
            ]);
        }
    }, [showFolderByIDData]);

    useEffect(() => {
        if (dest?.id) {
            showFolderByID(apiSetting.Folders.showFolderByID(dest?.id));
            set_target_folder_id(dest?.id);
        }
    }, [dest, showFolderByID]);

    useEffect(() => {
        if (target_folder_id) {
            showFolderByID(apiSetting.Folders.showFolderByID(target_folder_id));
        }
    }, [target_folder_id]);

    return (
        <>
            <div className="mt-4 rounded-md border-2 border-gray-200 p-4 bg-white">
                <label className="text-md font-bold text-gray-900">儲存路徑</label>
                <div className="flex flex-row justify-between mt-2">
                    <div className="flex flex-row">
                        <FolderIcon className="h-6 text-blue-200" />
                        {documentPath &&
                            documentPath.slice(0, documentPath.length - 1).map((folder) => (
                                <div key={folder.id} className="flex flex-row items-center">
                                    {folder.name}{' '}
                                    <ChevronRightIcon className="text-gray-400 text-sm h-5" />
                                </div>
                            ))}
                        <div className="flex flex-row items-center">
                            {documentPath && documentPath[documentPath.length - 1].name}
                        </div>
                    </div>
                    {canEditPath && (
                        <a
                            className="text-indigo-600 underline cursor-pointer"
                            onClick={() => {
                                // setMode('move');
                                setMode(modeType);
                            }}
                        >
                            編輯
                        </a>
                    )}
                </div>
            </div>

            <FolderTreeForSelect
                {...{
                    mode,
                    setMode,
                    dest,
                    setDest,
                    targetId: ''
                }}
            />
        </>
    );
}
