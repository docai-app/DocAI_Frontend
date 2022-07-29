import useAxios from 'axios-hooks';
import DriveView from './DriveView';
import Api from '../../apis';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const apiSetting = new Api();

export default function DriveContainer() {
    const router = useRouter();
    const { id = null } = router.query;
    const [mode, setMode] = useState<'view' | 'move' | 'share'>('view');
    const [moving, setMoving] = useState<any[]>([]);
    const [shareWith, setShareWith] = useState<any[]>([]);
    const [movingDest, setMovingDest] = useState<string | null>(null);
    const [
        { data: showAllItemsData, loading: showAllItemsLoading, error: showAllItemsError },
        showAllItems
    ] = useAxios({}, { manual: true });
    const [{ data: updateDocumentByIdData }, updateDocumentById] = useAxios({}, { manual: true });

    const toggleMove = useCallback((b: boolean) => {
        if (b) {
            setMode('move');
        } else {
            setMode('view');
        }
    }, []);

    const handleMove = useCallback(
        async (document_id: string, folder_id: string) => {
            const res = await updateDocumentById(
                apiSetting.Document.updateDocumentById(document_id, folder_id)
            );
            if (res.data?.success) {
                alert('移動成功');
                router.reload();
            }
        },
        [router, updateDocumentById]
    );

    const toggleShare = useCallback((b: boolean) => {
        if (b) {
            setMode('share');
        } else {
            setMode('view');
        }
    }, []);

    const handleShare = useCallback(() => {}, []);

    useEffect(() => {
        axios.defaults.headers.common['authorization'] =
            localStorage.getItem('authorization') || '';
        if (id) showAllItems(apiSetting.Drive.showAllFolderItems(id.toString()));
        else showAllItems(apiSetting.Drive.showAllRootItems());
    }, [router, id, showAllItems]);

    return (
        <DriveView
            {...{
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
            }}
        />
    );
}
