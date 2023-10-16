import useAxios from 'axios-hooks';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import LabelView from './LableView';

const apiSetting = new Api();

export default function LabelContainer() {
    const [props, setProps] = useState<any>({});
    const { setAlert } = useAlert();
    const [newLabelName, setNewLabelName] = useState('');
    const [{ data: addNewLabelData, error: addNewLabelError }, addNewLabel] = useAxios(
        apiSetting.Tag.addNewTag(),
        { manual: true }
    );
    const [{ data: getAllLabelsData, loading: loading, error: getAllLabelsError }, getAllLabels] =
        useAxios(apiSetting.Tag.getAllTags(), { manual: true });
    const [{ data: tagTypes, error: getAllTagFunctionsError }, getAllTagFunctions] = useAxios(
        apiSetting.Tag.getTagFunctions(),
        { manual: false }
    );

    const [{ data: updateTagFunctionsData, error: updateTagFunctionsError }, updateTagFunctions] =
        useAxios(apiSetting.Tag.updateTagFunctions(), { manual: true });

    const [{ data: deleteTagFunctionsData, error: deleteTagFunctionsError }, deleteTagFunctions] =
        useAxios(apiSetting.Tag.deleteTagFunctions(), { manual: true });

    const [{ data: updateTagFeaturesData }, updateTagFeatures] = useAxios(
        apiSetting.Tag.updateTagFeatures(''),
        { manual: true }
    );

    const [
        { data: updateLabelNameByIdData, error: updateLabelNameByIdError },
        updateLabelNameById
    ] = useAxios(apiSetting.Tag.updateTagNameById(''), { manual: true });

    const addNewLabelHandler = useCallback(async () => {
        addNewLabel({ data: { name: newLabelName, is_checked: true } });
    }, [addNewLabel, newLabelName]);

    const updateLabelNameByIdHandler = useCallback(
        async (id: string, newName: string, is_checked?: boolean) => {
            updateLabelNameById({
                ...apiSetting.Tag.updateTagNameById(id),
                data: { name: newName, is_checked: is_checked }
            });
        },
        [updateLabelNameById]
    );

    useEffect(() => {
        getAllLabels();
    }, [getAllLabels]);

    useEffect(() => {
        if (addNewLabelData && addNewLabelData.success) {
            setAlert({ title: '新增成功', type: 'success' });
            getAllLabels();
            setNewLabelName('');
        } else if (addNewLabelData && !addNewLabelData.success) {
            setAlert({
                title: '新增失敗！',
                content: `原因：${addNewLabelData.errors.name[0]}`,
                type: 'error'
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAllLabels, addNewLabelData]);

    useEffect(() => {
        if (updateLabelNameByIdData && updateLabelNameByIdData.success) {
            setAlert({ title: '更新成功', type: 'success' });
            getAllLabels();
        } else if (updateLabelNameByIdData && !updateLabelNameByIdData.success) {
            setAlert({
                title: '更新失敗！',
                content: `原因：${updateLabelNameByIdData.errors.name[0]}`,
                type: 'error'
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAllLabels, updateLabelNameByIdData]);

    const updateTagFunctionsHandler = useCallback(
        async (tag_id: string, function_id: string) => {
            if (function_id)
                updateTagFunctions({
                    data: { tag_id: tag_id, function_id: function_id }
                }).then((res) => {
                    if (res.data.success) {
                        setAlert({ title: '更新成功', type: 'success' });
                    } else {
                        setAlert({ title: '更新失敗', type: 'error' });
                    }
                });
        },
        [updateTagFunctions]
    );

    const updateTagFeatureHandler = useCallback(
        async (tag_id: string, chain_feature_ids: []) => {
            updateTagFeatures({
                ...apiSetting.Tag.updateTagFeatures(tag_id),
                data: { chain_features: chain_feature_ids }
            }).then((res) => {
                if (res.data.success) {
                    setAlert({ title: '更新成功', type: 'success' });
                } else {
                    setAlert({ title: '更新失敗', type: 'error' });
                }
            });
        },
        [updateTagFeatures]
    );

    const deleteTagFunctionsHandler = useCallback(
        async (tag_id: string, function_id: string) => {
            if (function_id)
                deleteTagFunctions({
                    data: { tag_id: tag_id, function_id: function_id }
                });
        },
        [deleteTagFunctions]
    );

    return (
        <LabelView
            {...{
                loading,
                getAllLabelsData,
                addNewLabelHandler,
                addNewLabelData,
                newLabelName,
                setNewLabelName,
                updateLabelNameByIdHandler,
                tagTypes,
                updateTagFunctionsHandler,
                deleteTagFunctionsHandler,
                updateTagFeatureHandler
            }}
        />
    );
}
