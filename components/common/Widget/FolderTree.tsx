import {
    ChevronDownIcon,
    ChevronRightIcon,
    FolderIcon,
    FolderOpenIcon
} from '@heroicons/react/20/solid';
import useAxios from 'axios-hooks';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';
import _ from 'lodash';

export type Folder = {
    id: string;
    name: string;
} & FolderTreeProps;

type FolderTreeProps = {
    folders?: Folder[];
    expanded: boolean;
} & (
    | {
          multipleDest: Folder[] | null;
          setMultipleDest: Dispatch<SetStateAction<Folder[]>>;
          multiple: true;
      }
    | {
          dest: Folder | null;
          setDest: Dispatch<SetStateAction<Folder | null>>;
          multiple?: false;
      }
);

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
            if (folder.id !== '')
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

    const isSelected = useCallback(
        (folder_id: string) => {
            if (props.multiple) {
                return _.filter(props.multipleDest, (f) => folder_id === f.id).length > 0;
            }
            return folder_id === props.dest?.id;
        },
        [props]
    );

    const handleFolderClick = useCallback(
        (f: Folder) => {
            if (!props.multiple) {
                props.setDest(f);
                return;
            }
            if (isSelected(f.id)) {
                props.setMultipleDest((prev) => _.filter(prev, (fo) => f.id !== fo.id));
            } else {
                props.setMultipleDest((prev) => [...(prev || []), f]);
            }
        },
        [props, isSelected]
    );

    return (
        <div className="pl-5">
            <div
                className={`flex items-center pl-5 relative text-gray-400 rounded-lg cursor-pointer${
                    isSelected(folder.id) ? ' bg-indigo-100' : ''
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
                    onClick={() => handleFolderClick(folder)}
                >
                    {folder.name}
                </h3>
            </div>
            {expanded && showAllFolderItemsLoading && !showAllFolderItemsData?.folders && (
                <div className="text-sm text-gray-400 pl-12">載入中...</div>
            )}
            {expanded && showAllFolderItemsData?.folders && (
                <FolderTree {...props} folders={showAllFolderItemsData?.folders} expanded={false} />
            )}
        </div>
    );
}

export default function FolderTree(props: FolderTreeProps) {
    const { folders } = props;
    return (
        <div>
            {folders ? (
                folders.map((folder) => {
                    return (
                        <Folder
                            key={folder.id}
                            {...{
                                ...props,
                                ...folder
                            }}
                        />
                    );
                })
            ) : (
                <Folder {...props} key="root" name="Root" id="" />
            )}
        </div>
    );
}
