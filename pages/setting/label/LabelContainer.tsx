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
    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: true }
    );
    const [{ data: tagTypes, error: getAllTagFunctionsError }, getAllTagFunctions] = useAxios(
        apiSetting.Tag.getTagFunctions(),
        { manual: false }
    );

    const [{ data: updateTagFunctionsData, error: updateTagFunctionsError }, updateTagFunctions] =
        useAxios(apiSetting.Tag.updateTagFunctions(), { manual: true });

    const [{ data: deleteTagFunctionsData, error: deleteTagFunctionsError }, deleteTagFunctions] =
        useAxios(apiSetting.Tag.deleteTagFunctions(), { manual: true });

    const [
        { data: updateLabelNameByIdData, error: updateLabelNameByIdError },
        updateLabelNameById
    ] = useAxios(apiSetting.Tag.updateTagNameById(''), { manual: true });

    const addNewLabelHandler = useCallback(async () => {
        addNewLabel({ data: { name: newLabelName } });
        // console.log('newLabelName', newLabelName);
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
    }, [getAllLabels, updateLabelNameByIdData]);

    const updateTagFunctionsHandler = useCallback(
        async (tag_id: string, function_id: string) => {
            if (function_id)
                updateTagFunctions({
                    data: { tag_id: tag_id, function_id: function_id }
                });
        },
        [updateTagFunctions]
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
                getAllLabelsData,
                addNewLabelHandler,
                addNewLabelData,
                newLabelName,
                setNewLabelName,
                updateLabelNameByIdHandler,
                tagTypes,
                updateTagFunctionsHandler,
                deleteTagFunctionsHandler
            }}
        />
    );
}
