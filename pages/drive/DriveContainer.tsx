import useAxios from 'axios-hooks';
import DriveView from './DriveView';
import Api from '../../apis';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const apiSetting = new Api();

export default function DriveContainer() {
    const router = useRouter();
    const { id = null } = router.query;
    const [mode, setMode] = useState<'view' | 'move'>('view');
    const [moving, setMoving] = useState<any[]>([]);
    const [dest, setDest] = useState<any>(null);
    const [
        { data: showAllItemsData, loading: showAllItemsLoading, error: showAllItemsError },
        showAllItems
    ] = useAxios({}, { manual: true });
    const toggleMove = useCallback((b: boolean) => {
        if (b) {
            setMode('move');
        } else {
            setMode('view');
        }
    }, []);
    useEffect(() => {
        if (id) showAllItems(apiSetting.Drive.showAllFolderItems(id.toString()));
        else showAllItems(apiSetting.Drive.showAllRootItems());
    }, [router, id, showAllItems]);

    return (
        <DriveView
            {...{
                showAllItemsData,
                showAllItemsLoading,
                mode,
                toggleMove,
                moving,
                setMoving,
                dest,
                setDest
            }}
        />
    );
}
