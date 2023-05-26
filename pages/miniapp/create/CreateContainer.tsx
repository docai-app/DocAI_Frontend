import useAxios from 'axios-hooks';
import router from 'next/router';
import { useCallback, useEffect } from 'react';
import Api from '../../../apis/index';
import useAlert from '../../../hooks/useAlert';
import CreateView from './CreateView';

const apiSetting = new Api();

function MiniappContainer() {
    const { setAlert } = useAlert();

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

    const [{ data: createMiniAppsData, loading: loading }, createMiniApps] = useAxios(
        apiSetting.MiniApp.create(),
        {
            manual: true
        }
    );

    const updateMiniappHandler = useCallback(
        async (data) => {
            const { name, description, form_schema_id, function_id, tag_id, target_folder_id, needs_deep_understanding } = data
            createMiniApps({
                data: {
                    'name': name,
                    'description': description,
                    'folder_id': target_folder_id,
                    'document_label_list': [tag_id],
                    'app_function_list': [function_id],
                    'meta': needs_deep_understanding && form_schema_id ? { 'form_schema_id': form_schema_id } : {},
                }
            })
        },
        [createMiniApps]
    );

    useEffect(() => {
        if (createMiniAppsData) {
            // console.log(createMiniAppsData);
            setAlert({ title: '新增成功!', type: 'success' });
            router.reload();
        }

    }, [createMiniAppsData])

    return (
        <>
            <CreateView
                {...{
                    getTagFunctionsData,
                    updateMiniappHandler,
                    getAllLabelsData,
                    schemasStatusReadyData,
                    loading
                }}
            />
        </>
    )
}

export default MiniappContainer;