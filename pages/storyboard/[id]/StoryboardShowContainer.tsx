import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import StoryboardShowView from './StoryboardShowView';

const apiSetting = new Api();

export default function ShopContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<any>([]);
    const [storyboard, setStoryboard] = useState<any>();

    const [{ data: getStoryboardByIdData, loading: getStoryboardByIdLoading }, getStoryboardById] =
        useAxios(apiSetting.Storyboard.getStoryboardById(router.query.id as string), {
            manual: true
        });

    useEffect(() => {
        setOpen(getStoryboardByIdLoading);
    }, [getStoryboardByIdLoading]);

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

    return (
        <StoryboardShowView
            {...{
                open,
                setOpen,
                items,
                storyboard
            }}
        />
    );
}
