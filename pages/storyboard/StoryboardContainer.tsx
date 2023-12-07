import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../apis';
import useAlert from '../../hooks/useAlert';
import StoryboardView from './StoryboardView';

const apiSetting = new Api();

export default function StoryboardContainer() {
    const router = useRouter();
    const { setAlert } = useAlert()
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1)
    const [items, setItems] = useState<any>([])
    const [meta, setMeta] = useState()


    const [{ data: getAllStoryboardsData, loading: getAllStoryboardsLoading }, getAllStoryboards] = useAxios(
        apiSetting.Storyboard.getAllStoryboards(page),
        { manual: true }
    );


    const [{ data: updateStoryboardItemByIdData, loading: updateStoryboardItemByIdLoading }, updateStoryboardItemById] = useAxios(
        apiSetting.Storyboard.updateStoryboardItemById(''),
        {
            manual: true
        }
    );

    const [{ data: deleteStoryboardByIdData, loading: deleteStoryboardByIdLoading }, deleteStoryboardById] = useAxios(
        apiSetting.Storyboard.deleteStoryboardById(''),
        {
            manual: true
        }
    );

    const [{ data: createStoryboardData, loading: createStoryboardLoading }, createStoryboard] = useAxios(
        apiSetting.Storyboard.createStoryboard(),
        {
            manual: true
        }
    );

    useEffect(() => {
        setOpen(getAllStoryboardsLoading)
    }, [getAllStoryboardsLoading])

    useEffect(() => {
        getAllStoryboards({
            ...apiSetting.Storyboard.getAllStoryboards(page)
        })
    }, [page])

    useEffect(() => {
        if (router.query.page) {
            setPage(parseInt(router.query.page.toString()) || 1);
        }
    }, [router.query.page]);

    useEffect(() => {
        if (getAllStoryboardsData && getAllStoryboardsData.success) {
            setItems(getAllStoryboardsData.storyboards)
            setMeta(getAllStoryboardsData?.meta)
        } else if (getAllStoryboardsData && !getAllStoryboardsData.success) {
            setAlert({ title: getAllStoryboardsData.error, type: 'error' })
        }
    }, [getAllStoryboardsData])


    useEffect(() => {
        if (updateStoryboardItemByIdData && updateStoryboardItemByIdData.success) {
            setAlert({ title: "修改成功", type: 'success' })
            router.reload()
        } else if (updateStoryboardItemByIdData && !updateStoryboardItemByIdData.success) {
            setAlert({ title: updateStoryboardItemByIdData.error, type: 'error' })
        }
    }, [updateStoryboardItemByIdData])

    const handleUpdateStoryboardItem = (item_id: string, data: any) => {
        updateStoryboardItemById({
            ...apiSetting.Storyboard.updateStoryboardItemById(item_id),
            data: {
                ...data,
                is_ready: true,
                status: 1
            }
        })
    }

    useEffect(() => {
        if (deleteStoryboardByIdData && deleteStoryboardByIdData.success) {
            setAlert({ title: "刪除成功", type: 'success' })
            router.reload()
        } else if (deleteStoryboardByIdData && !deleteStoryboardByIdData.success) {
            setAlert({ title: deleteStoryboardByIdData.error, type: 'error' })
        }
    }, [deleteStoryboardByIdData])

    const handleDeleteStoryboard = (item_id: string) => {
        deleteStoryboardById({
            ...apiSetting.Storyboard.deleteStoryboardById(item_id)
        })
    }


    useEffect(() => {
        if (createStoryboardData && createStoryboardData.success) {
            console.log(createStoryboardData);
            setAlert({ title: "新增成功", type: 'success' })
            router.push('/storyboard')
        } else if (createStoryboardData && !createStoryboardData.success) {
            setAlert({ title: createStoryboardData.error, type: 'error' })
        }
    }, [createStoryboardData])
    const handleCreateStoryboard = (data: any) => {
        createStoryboard({
            ...apiSetting.Storyboard.createStoryboard(),
            data: data
        })
    }
    return (
        <StoryboardView
            {...{
                open,
                setOpen,
                items,
                meta,
                handleUpdateStoryboardItem,
                handleDeleteStoryboard,
                handleCreateStoryboard
            }}
        />
    );
}
