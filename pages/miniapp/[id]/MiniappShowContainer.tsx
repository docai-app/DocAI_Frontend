import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis/index';
import MiniappShowView from './MiniappShowView';

const apiSetting = new Api();

function MiniappShowContainer() {
    const router = useRouter();
    const [data, setData] = useState();
    const [{ data: showMiniAppByIdData, loading: loading }, showMiniAppById] = useAxios(
        apiSetting.MiniApp.showMiniAppById(router.query.id + ''),
        {
            manual: false
        }
    );

    useEffect(() => {
        if (showMiniAppByIdData && showMiniAppByIdData.success) {
            setData(showMiniAppByIdData?.mini_app);
            console.log(showMiniAppByIdData?.mini_app);
        }
    }, [showMiniAppByIdData]);

    return (
        <>
            <MiniappShowView
                {...{
                    data,
                    loading
                }}
            />
        </>
    );
}

export default MiniappShowContainer;
