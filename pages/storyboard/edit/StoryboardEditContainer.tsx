import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import StoryboardEditView from './StoryboardEditView';

const apiSetting = new Api();

export default function StoryboardEditContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<any>([]);
    const [storyboard, setStoryboard] = useState<any>();

    const [{ data: getStoryboardByIdData, loading: getStoryboardByIdLoading }, getStoryboardById] =
        useAxios(apiSetting.Storyboard.getStoryboardById(router.query.id as string), {
            manual: true
        });

    const [
        { data: updateStoryboardByIdData, loading: updateStoryboardByIdLoading },
        updateStoryboardById
    ] = useAxios(apiSetting.Storyboard.updateStoryboardById(router.query.id as string), {
        manual: true
    });

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

    useEffect(() => {
        setOpen(getStoryboardByIdLoading);
    }, [getStoryboardByIdLoading]);

    useEffect(() => {
        setOpen(updateStoryboardByIdLoading);
    }, [updateStoryboardByIdLoading]);

    useEffect(() => {
        setOpen(updateStoryboardItemByIdLoading);
    }, [updateStoryboardItemByIdLoading]);

    useEffect(() => {
        setOpen(deleteStoryboardItemByIdLoading);
    }, [deleteStoryboardItemByIdLoading]);

    useEffect(() => {
        if (router.query.id) {
            getStoryboardById();
        }
    }, [router.query.id]);

    useEffect(() => {
        if (getStoryboardByIdData && getStoryboardByIdData.success) {
            // console.log(getStoryboardByIdData);
            setStoryboard(getStoryboardByIdData.storyboard);
            setItems(getStoryboardByIdData.storyboard?.items);
        } else if (getStoryboardByIdData && !getStoryboardByIdData.success) {
            setAlert({ title: getStoryboardByIdData.error, type: 'error' });
        }
    }, [getStoryboardByIdData]);

    useEffect(() => {
        if (updateStoryboardByIdData && updateStoryboardByIdData.success) {
            setAlert({ title: '修改成功', type: 'success' });
            router.back();
        } else if (updateStoryboardByIdData && !updateStoryboardByIdData.success) {
            setAlert({ title: updateStoryboardByIdData.error, type: 'error' });
        }
    }, [updateStoryboardByIdData]);

    const handleUpdateStoryboard = (item_ids: any) => {
        updateStoryboardById({
            data: {
                title: storyboard?.title,
                description: storyboard?.description,
                item_ids: item_ids
            }
        });
    };

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

    return (
        <StoryboardEditView
            {...{
                open,
                setOpen,
                items,
                storyboard,
                setStoryboard,
                handleUpdateStoryboard,
                handleUpdateStoryboardItem,
                handleDeleteStoryboardItem
            }}
        />
    );
}
