import {
    ChevronDownIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    FolderIcon,
    FolderOpenIcon
} from '@heroicons/react/solid';
import useAxios from 'axios-hooks';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Api from '../../../apis';

interface Folder {
    id: string;
    name: string;
    folders?: Folder[];
    dest: string | null;
    setDest: Dispatch<SetStateAction<string | null>>;
    expanded: boolean;
}

interface FolderTreeProps {
    dest: string | null;
    setDest: Dispatch<SetStateAction<string | null>>;
    folders?: Folder[];
    expanded: boolean;
}

const apiSetting = new Api();

function Folder(props: Folder) {
    const [folder, setFolder] = useState(props);
    const [expanded, setExpanded] = useState(props.expanded);
    const [
        { data: showAllFolderItemsData, loading: showAllFolderItemsLoading },
        showAllFolderItems
    ] = useAxios({}, { manual: true });

    useEffect(() => {
        if (expanded) {
            if (folder.id !== 'root')
                showAllFolderItems(apiSetting.Drive.showAllFolderItems(folder.id));
            else showAllFolderItems(apiSetting.Drive.showAllRootItems());
        }
    }, [expanded, folder.id, showAllFolderItems]);

    useEffect(() => {
        if (showAllFolderItemsData) {
            setFolder((p) => ({
                ...p,
                folders: showAllFolderItemsData.folders
            }));
        }
    }, [showAllFolderItemsData]);

    return (
        <div className="pl-5">
            <div
                className={`flex items-center pl-5 relative text-gray-400 rounded-lg cursor-pointer${
                    folder.id === props.dest ? ' bg-indigo-100' : ''
                }`}
            >
                {expanded ? (
                    !(!showAllFolderItemsLoading && folder.folders?.length === 0) && (
                        <ChevronDownIcon
                            onClick={() => setExpanded(!expanded)}
                            className="h-5 -left-0 cursor-pointer absolute"
                        />
                    )
                ) : (
                    <ChevronRightIcon
                        onClick={() => setExpanded(!expanded)}
                        className="h-5 -left-0 cursor-pointer absolute"
                    />
                )}
                {expanded ? <FolderOpenIcon className="h-5" /> : <FolderIcon className="h-5" />}
                <h3
                    className="ml-2 py-2 flex-grow text-black"
                    onClick={() => folder.setDest(folder.id)}
                >
                    {folder.name}
                </h3>
            </div>
            {expanded && folder.folders && (
                <FolderTree
                    dest={props.dest}
                    setDest={props.setDest}
                    folders={folder.folders}
                    expanded={false}
                />
            )}
        </div>
    );
}

export default function FolderTree(props: FolderTreeProps) {
    const [folders, setFolders] = useState(props.folders);
    return (
        <div>
            {folders ? (
                folders.map((folder) => {
                    return (
                        <Folder
                            key={folder.id}
                            {...{
                                ...folder,
                                dest: props.dest,
                                setDest: props.setDest,
                                expanded: props.expanded
                            }}
                        />
                    );
                })
            ) : (
                <Folder
                    key="root"
                    dest={props.dest}
                    setDest={props.setDest}
                    expanded={props.expanded}
                    name="Root"
                    id="root"
                />
            )}
        </div>
    );
}
