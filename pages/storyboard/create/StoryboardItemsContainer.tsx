import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import StoryboardItemsView from './StoryboardItemsView';

const apiSetting = new Api();

export default function StoryboardItemsContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<any>([]);
    const [meta, setMeta] = useState();

    const [
        { data: getAllStoryboardItemsData, loading: getAllStoryboardItemsLoading },
        getAllStoryboardItems
    ] = useAxios(apiSetting.Storyboard.getAllStoryboardItems(page), { manual: true });

    const [
        { data: updateStoryboardItemByIdData, loading: updateStoryboardItemByIdLoading },
        updateStoryboardItemById
    ] = useAxios(apiSetting.Storyboard.updateStoryboardItemById(''), {
        manual: true
    });

    const [
        { data: deleteStoryboardItemByIdData, loading: deleteStoryboardItemByIdLoading },
        deleteStoryboardItemById
    ] = useAxios(apiSetting.Storyboard.deleteStoryboardItemById(''), {
        manual: true
    });

    const [{ data: createStoryboardData, loading: createStoryboardLoading }, createStoryboard] =
        useAxios(apiSetting.Storyboard.createStoryboard(), {
            manual: true
        });

    useEffect(() => {
        setOpen(getAllStoryboardItemsLoading);
    }, [getAllStoryboardItemsLoading]);

    useEffect(() => {
        setOpen(createStoryboardLoading);
    }, [createStoryboardLoading]);


    useEffect(() => {
        setOpen(updateStoryboardItemByIdLoading);
    }, [updateStoryboardItemByIdLoading]);

    useEffect(() => {
        getAllStoryboardItems({
            ...apiSetting.Storyboard.getAllStoryboardItems(page)
        });
    }, [page]);

    useEffect(() => {
        if (router.query.page) {
            setPage(parseInt(router.query.page.toString()) || 1);
        }
    }, [router.query.page]);

    useEffect(() => {
        if (getAllStoryboardItemsData && getAllStoryboardItemsData.success) {
            setItems(getAllStoryboardItemsData.storyboard_items);
            setMeta(getAllStoryboardItemsData?.meta);
        } else if (getAllStoryboardItemsData && !getAllStoryboardItemsData.success) {
            setAlert({ title: getAllStoryboardItemsData.error, type: 'error' });
        }
    }, [getAllStoryboardItemsData]);

    useEffect(() => {
        if (updateStoryboardItemByIdData && updateStoryboardItemByIdData.success) {
            setAlert({ title: '修改成功', type: 'success' });
            router.reload();
        } else if (updateStoryboardItemByIdData && !updateStoryboardItemByIdData.success) {
            setAlert({ title: updateStoryboardItemByIdData.error, type: 'error' });
        }
    }, [updateStoryboardItemByIdData]);

    const handleUpdateStoryboardItem = (item_id: string, data: any) => {
        updateStoryboardItemById({
            ...apiSetting.Storyboard.updateStoryboardItemById(item_id),
            data: {
                ...data,
                is_ready: true,
                status: 1
            }
        });
    };

    useEffect(() => {
        if (deleteStoryboardItemByIdData && deleteStoryboardItemByIdData.success) {
            setAlert({ title: '刪除成功', type: 'success' });
            router.reload();
        } else if (deleteStoryboardItemByIdData && !deleteStoryboardItemByIdData.success) {
            setAlert({ title: deleteStoryboardItemByIdData.error, type: 'error' });
        }
    }, [deleteStoryboardItemByIdData]);

    const handleDeleteStoryboardItem = (item_id: string) => {
        deleteStoryboardItemById({
            ...apiSetting.Storyboard.deleteStoryboardItemById(item_id)
        });
    };

    useEffect(() => {
        if (createStoryboardData && createStoryboardData.success) {
            console.log(createStoryboardData);
            setAlert({ title: '成功创建', type: 'success' });
            router.push(`/storyboard/${createStoryboardData.storyboard.id}`);
        } else if (createStoryboardData && !createStoryboardData.success) {
            setAlert({ title: createStoryboardData.error, type: 'error' });
        }
    }, [createStoryboardData]);
    const handleCreateStoryboard = (data: any) => {
        createStoryboard({
            ...apiSetting.Storyboard.createStoryboard(),
            data: data
        });
    };
    return (
        <StoryboardItemsView
            {...{
                open,
                setOpen,
                items,
                meta,
                handleUpdateStoryboardItem,
                handleDeleteStoryboardItem,
                handleCreateStoryboard
            }}
        />
    );
}
