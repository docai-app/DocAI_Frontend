import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../apis/index';
import useAlert from '../../../hooks/useAlert';
import CreateView from './CreateView';

const apiSetting = new Api();

function MiniappContainer() {
    const { setAlert } = useAlert();
    const router = useRouter();
    const [miniAppData, setMiniAppData] = useState();
    const [actionContent, setActionContent] = useState('');
    const [open, setOpen] = useState(false);

    const [{ data: getTagFunctionsData }, getTagFunctions] = useAxios(
        apiSetting.Tag.getTagFunctions(),
        {
            manual: false
        }
    );

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: false }
    );

    const [{ data: schemasStatusReadyData }, schemasStatusReady] = useAxios(
        apiSetting.Form.schemasStatusReady(),
        {
            manual: false
        }
    );

    const [{ data: createMiniAppsData, loading: submitting }, createMiniApps] = useAxios(
        apiSetting.MiniApp.create(),
        {
            manual: true
        }
    );

    const [{ data: updateMiniAppsData, loading: updateing }, updateMiniApps] = useAxios(
        apiSetting.MiniApp.update(router.query.id + ''),
        {
            manual: true
        }
    );

    const [{ data: showMiniAppByIdData, loading: loading }, showMiniAppById] = useAxios(
        apiSetting.MiniApp.showMiniAppById(router.query.id + ''),
        {
            manual: true
        }
    );

    const updateMiniappHandler = useCallback(
        async (data) => {
            setActionContent('正在保存數據...');
            setOpen(true);
            const {
                name,
                description,
                form_schema_id,
                function_name,
                tag_id,
                target_folder_id,
                needs_deep_understanding
            } = data;
            const formData = {
                name: name,
                description: description,
                folder_id: target_folder_id,
                document_label_list: [tag_id],
                app_function_list: [function_name],
                meta:
                    needs_deep_understanding && form_schema_id
                        ? { form_schema_id: form_schema_id }
                        : {}
            };
            if (router.query.id) {
                updateMiniApps({
                    data: formData
                });
            } else {
                createMiniApps({
                    data: formData
                });
            }
        },
        [router, createMiniApps, updateMiniApps]
    );

    useEffect(() => {
        if (router.query.id) {
            setOpen(true);
            setActionContent('正在加载數據...');
            showMiniAppById();
        }
    }, [router]);

    useEffect(() => {
        if (showMiniAppByIdData && showMiniAppByIdData.success) {
            setOpen(false);
            setMiniAppData(showMiniAppByIdData?.mini_app);
        }
    }, [showMiniAppByIdData]);

    useEffect(() => {
        if (createMiniAppsData && createMiniAppsData.success) {
            // console.log(createMiniAppsData);
            setAlert({ title: '新增成功!', type: 'success' });
            setOpen(false);
            router.reload();
        } else if (createMiniAppsData && !createMiniAppsData.success) {
            setOpen(false);
            setAlert({ title: createMiniAppsData.error, type: 'error' });
        }
    }, [createMiniAppsData]);

    useEffect(() => {
        if (updateMiniAppsData && updateMiniAppsData.success) {
            setOpen(false);
            setAlert({ title: '更新成功!', type: 'success' });
        } else if (updateMiniAppsData && !updateMiniAppsData.success) {
            setOpen(false);
            setAlert({ title: updateMiniAppsData.error, type: 'error' });
        }
    }, [updateMiniAppsData]);

    return (
        <>
            <CreateView
                {...{
                    getTagFunctionsData,
                    updateMiniappHandler,
                    getAllLabelsData,
                    schemasStatusReadyData,
                    open,
                    setOpen,
                    miniAppData,
                    actionContent
                }}
            />
        </>
    );
}

export default MiniappContainer;
