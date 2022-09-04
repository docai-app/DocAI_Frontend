import useAxios from 'axios-hooks';
import DriveView from './DriveView';
import Api from '../../apis';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Folder } from '../../components/common/Widget/FolderTree';

const apiSetting = new Api();

export default function DriveContainer() {
    const router = useRouter();
    const queryId = useRef(router.query.id);
    const queryName = useRef(router.query.name);
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [mode, setMode] = useState<'view' | 'move' | 'share' | 'newFolder'>('view');
    const [target, setTarget] = useState<any[]>([]);
    const [shareWith, setShareWith] = useState<any[]>([]);
    const [newFolderName, setNewFolderName] = useState<string | null>(null);
    const [movingDest, setMovingDest] = useState<Folder | null>(null);

    const [
        { data: showAllItemsData, loading: showAllItemsLoading, error: showAllItemsError },
        showAllItems
    ] = useAxios({}, { manual: true });
    const [{ data: updateDocumentByIdData }, updateDocumentById] = useAxios({}, { manual: true });
    const [{ data: shareFolderPermissionData }, shareFolderPermission] = useAxios(
        {},
        { manual: true }
    );
    const [{ data: createFolderData }, createFolder] = useAxios({}, { manual: true });

    const handleShare = useCallback(
        async (id: string, user_email: string) => {
            const res = await shareFolderPermission(
                apiSetting.Drive.shareFolderPermission(id, user_email)
            );
            if (res.data?.success) {
                alert('共用成功');
                router.reload();
            } else {
                alert('發生錯誤');
            }
        },
        [router, shareFolderPermission]
    );

    const handleNewFolder = useCallback(
        async (name: string) => {
            const res = await createFolder(
                apiSetting.Folders.createFolder(name, queryId.current?.toString() || '')
            );
            if (res.data?.success) {
                alert('資料夾新增成功');
                router.reload();
            } else {
                alert('發生錯誤');
            }
        },
        [router, createFolder, queryId]
    );

    useEffect(() => {
        if (router.isReady) {
            queryId.current = router.query.id;
            queryName.current = router.query.name;
            if (queryId.current) {
                showAllItems(apiSetting.Drive.showAllFolderItems(queryId.current.toString()));
            } else showAllItems(apiSetting.Drive.showAllRootItems());
        }
    }, [router, showAllItems]);

    useEffect(() => {
        if (!showAllItemsLoading && showAllItemsData) {
            setId(queryId.current?.toString() || null);
            setName(queryName.current?.toString() || null);
        }
    }, [showAllItemsLoading, showAllItemsData]);

    return (
        <DriveView
            {...{
                id,
                name,
                showAllItemsData,
                showAllItemsLoading,
                mode,
                setMode,
                target,
                setTarget,
                movingDest,
                setMovingDest,
                shareWith,
                setShareWith,
                handleShare,
                newFolderName,
                handleNewFolder
            }}
        />
    );
}
