import useAxios from 'axios-hooks';
import DriveView from './DriveView';
import Api from '../../apis';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const apiSetting = new Api();

export default function DriveContainer() {
    const router = useRouter();
    const [
        {
            data: showAllRootItemsData,
            loading: showAllRootItemsLoading,
            error: showAllRootItemsError
        },
        showAllRootItems
    ] = useAxios(apiSetting.Drive.showAllRootItems(), { manual: true });
    useEffect(() => {
        showAllRootItems();
    }, [router, showAllRootItems]);

    return <DriveView {...{ showAllRootItemsData, showAllRootItemsLoading }} />;
}
