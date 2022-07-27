import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/solid';
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import Api from '../../../apis';

interface Folder {
    created_at: string;
    id: string;
    name: string;
    parent_id: string | null;
    updated_at: string;
    user_id: string;
    folders?: Folder[];
}

interface FolderTreeProps {
    folders: Folder[];
    [name: string]: any;
}

const apiSetting = new Api();

function Folder(props: Folder) {
    const [folder, setFolder] = useState(props);
    const [expanded, setExpanded] = useState(false);
    const [{ data: showAllFolderItemsData }, showAllFolderItems] = useAxios(
        apiSetting.Drive.showAllFolderItems(folder.id),
        { manual: true }
    );

    useEffect(() => {
        if (expanded) {
            showAllFolderItems();
        }
    }, [expanded, showAllFolderItems]);

    useEffect(() => {
        if (showAllFolderItemsData) {
            setFolder((p) => ({
                ...p,
                folders: showAllFolderItemsData.folders
            }));
        }
    }, [showAllFolderItemsData]);

    return (
        <div className="pl-6">
            <div className="flex items-center">
                {expanded ? (
                    <ChevronDownIcon
                        onClick={() => setExpanded(!expanded)}
                        className="h-5 cursor-pointer"
                    />
                ) : (
                    <ChevronRightIcon
                        onClick={() => setExpanded(!expanded)}
                        className="h-5 cursor-pointer"
                    />
                )}
                <h3 className="cursor-pointer">{folder.name}</h3>
            </div>
            {expanded && folder.folders && <FolderTree folders={folder.folders}></FolderTree>}
        </div>
    );
}

export default function FolderTree(props: FolderTreeProps) {
    const [folders, setFolders] = useState(props.folders);
    return (
        <div>
            {folders.map((folder) => {
                return <Folder key={folder.id} {...folder} />;
            })}
        </div>
    );
}
