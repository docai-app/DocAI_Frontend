import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import Api from '../../apis';
import { Folder } from '../../components/common/Widget/FolderTree';
import useAlert from '../../hooks/useAlert';
import DriveView from './DriveView';

const apiSetting = new Api();

export default function DriveContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const queryId = useRef(router.query.id);
    const queryName = useRef(router.query.name);
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [mode, setMode] = useState<'view' | 'move' | 'share' | 'newFolder'>('view');
    const [target, setTarget] = useState<any[]>([]);
    const [shareWith, setShareWith] = useState<any[]>([]);
    const [newFolderName, setNewFolderName] = useState<string | null>(null);
    const [movingDest, setMovingDest] = useState<Folder | null>(null);
    const [visableDelete, setVisableDelete] = useState(false);
    const [visableRename, setVisableRename] = useState(false);
    const [current, setCurrent] = useState<any>();

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

    const [{ data: countDocumentsByDateData }, countDocumentsByDate] = useAxios(
        apiSetting.Statistics.countDocumentsByDate(
            new Date().toLocaleString('fr-CA', { timeZone: 'Asia/Taipei' }).split(' ')[0]
        ),
        { manual: true }
    );

    const [{ data: deleteDocumentByIdData }, deleteDocumentById] = useAxios({}, { manual: true });
    const [{ data: deleteFolderByIdData }, deleteFolderById] = useAxios({}, { manual: true });

    const [{ data: updateFolderNameData }, updateFolderName] = useAxios({}, { manual: true });

    useEffect(() => {
        countDocumentsByDate();
    }, [countDocumentsByDate]);

    const handleShare = useCallback(
        async (id: string, user_email: string) => {
            const res = await shareFolderPermission(
                apiSetting.Drive.shareFolderPermission(id, user_email)
            );
            if (res.data?.success) {
                setAlert({ title: '共用成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
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
                setAlert({ title: '資料夾新增成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        },
        [router, createFolder, queryId]
    );

    const updateDocument = async (id: string, name: string) => {
        if (id) {
            const res = await updateDocumentById(
                apiSetting.Document.updateDocumentNameById(id, name)
            );
            if (res.data?.success) {
                setAlert({ title: '更新成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };

    const updateFolder = async (id: string, name: string) => {
        if (id) {
            const res = await updateFolderName(apiSetting.Folders.updateFoldertNameById(id, name));
            if (res.data?.success) {
                setAlert({ title: '更新成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };

    const updateFolderOrDocumentHandler = useCallback(async () => {
        if (current?.type === 'folders') updateFolder(current?.id, current?.name);
        else updateDocument(current?.id, current?.name);
    }, [current]);

    const deleteDocument = async (id: string) => {
        if (id) {
            const res = await deleteDocumentById(apiSetting.Document.deleteDocumentById(id));
            if (res.data?.success) {
                setAlert({ title: '刪除成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };

    const deleteFolder = async (id: string) => {
        if (id) {
            const res = await deleteFolderById(apiSetting.Folders.deleteFolderById(id));
            if (res.data?.success) {
                setAlert({ title: '刪除成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };

    const deleteFolderOrDocumentHandler = useCallback(async () => {
        if (current?.type === 'folders') deleteFolder(current?.id);
        else deleteDocument(current?.id);
    }, [current]);

    useEffect(() => {
        if (router.asPath !== router.route) {
            queryId.current = router.query.id;
            queryName.current = router.query.name;
            if (queryId.current) {
                showAllItems(apiSetting.Drive.showAllFolderItems(queryId.current.toString()));
            } else {
                showAllItems(apiSetting.Drive.showAllRootItems());
            }
        } else if (router.asPath == '/') {
            showAllItems(apiSetting.Drive.showAllRootItems());
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
                handleNewFolder,
                countDocumentsByDateData,
                current,
                setCurrent,
                visableRename,
                setVisableRename,
                updateFolderOrDocumentHandler,
                visableDelete,
                setVisableDelete,
                deleteFolderOrDocumentHandler
            }}
        />
    );
}
