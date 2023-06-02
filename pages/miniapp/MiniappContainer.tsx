import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import Api from '../../apis/index';
import MiniappView from './MiniappView';

const apiSetting = new Api();

function MiniappContainer() {
    const [mini_apps, set_mini_apps] = useState([]);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState();

    const [{ data: getMiniAppsData, loading: loading }, getMiniApps] = useAxios(
        apiSetting.MiniApp.getMiniApps(page),
        {
            manual: false
        }
    );

    useEffect(() => {
        if (getMiniAppsData && getMiniAppsData.success) {
            set_mini_apps(getMiniAppsData?.mini_apps);
            setMeta(getMiniAppsData?.meta);
        }
    }, [getMiniAppsData]);

    return (
        <>
            <MiniappView
                {...{
                    mini_apps,
                    meta,
                    loading
                }}
            />
        </>
    );
}

export default MiniappContainer;
