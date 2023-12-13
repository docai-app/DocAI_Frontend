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
    const [currectPosition, setCurrectPosition] = useState(0)

    const [{ data: createStoryboardData, loading: createStoryboardLoading }, createStoryboard] =
        useAxios(apiSetting.Storyboard.createStoryboard(), {
            manual: true
        });

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
        setOpen(createStoryboardLoading);
    }, [createStoryboardLoading]);

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
            setAlert({ title: '保存成功', type: 'success' });
            router.back();
        } else if (updateStoryboardByIdData && !updateStoryboardByIdData.success) {
            setAlert({ title: updateStoryboardByIdData.error, type: 'error' });
        }
    }, [updateStoryboardByIdData]);

    const handleUpdateStoryboard = (item_ids: any) => {
        if (router.query.id) {
            updateStoryboardById({
                data: {
                    title: storyboard?.title,
                    description: storyboard?.description,
                    item_ids: item_ids
                }
            });
        } else {
            createStoryboard({
                data: {
                    title: storyboard?.title,
                    description: storyboard?.description,
                    item_ids: item_ids
                }
            });
        }
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


    useEffect(() => {
        if (updateStoryboardItemByIdData && updateStoryboardItemByIdData.success) {
            if (currectPosition == -1) {
                items.push(updateStoryboardItemByIdData.storyboard_item)
                setAlert({ title: '添加成功', type: 'success' });
            } else {
                items.splice(currectPosition, 1, updateStoryboardItemByIdData.storyboard_item);
                setAlert({ title: '修改成功', type: 'success' });
            }
            updateLocalData();
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
            // setAlert({ title: '刪除成功', type: 'success' });
            // router.reload(); 
        } else if (deleteStoryboardItemByIdData && !deleteStoryboardItemByIdData.success) {
            setAlert({ title: deleteStoryboardItemByIdData.error, type: 'error' });
        }
    }, [deleteStoryboardItemByIdData]);

    const handleDeleteStoryboardItem = (item_id: string) => {
        items.splice(currectPosition, 1);
        updateLocalData();
        deleteStoryboardItemById({
            ...apiSetting.Storyboard.deleteStoryboardItemById(item_id)
        });
    };

    const updateLocalData = () => {
        const newDatas = [...items];
        setItems(newDatas);
    };

    return (
        <StoryboardEditView
            {...{
                open,
                setOpen,
                items,
                setItems,
                storyboard,
                setStoryboard,
                handleUpdateStoryboard,
                handleUpdateStoryboardItem,
                handleDeleteStoryboardItem,
                updateLocalData,
                setCurrectPosition
            }}
        />
    );
}
