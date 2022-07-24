import useAxios from 'axios-hooks';
import DriveView from './DriveView';
import Api from '../../../apis';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const apiSetting = new Api();

export default function DriveContainer() {
    const router = useRouter();
    const { id = null } = router.query;
    const [
        {
            data: showAllFolderItemsData,
            loading: showAllFolderItemsLoading,
            error: showAllFolderItemsError
        },
        showAllFolderItems
    ] = useAxios({}, { manual: true });
    useEffect(() => {
        if (id) showAllFolderItems(apiSetting.Drive.showAllFolderItems(id.toString()));
    }, [router, showAllFolderItems]);

    return <DriveView {...{ showAllFolderItemsData, showAllFolderItemsLoading }} />;
}
