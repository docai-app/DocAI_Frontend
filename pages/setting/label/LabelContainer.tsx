import { useCallback, useEffect, useState } from 'react';
import LabelView from './LableView';
import Api from '../../../apis';
import useAxios from 'axios-hooks';
import axios from 'axios';

const apiSetting = new Api();

export default function LabelContainer() {
    const [props, setProps] = useState<any>({});
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
            // alert('新增成功');
            getAllLabels();
            setNewLabelName('');
        } else if (addNewLabelData && !addNewLabelData.success) {
            alert(`新增失敗！原因：${addNewLabelData.errors.name[0]}`);
        }
    }, [getAllLabels, addNewLabelData]);

    useEffect(() => {
        if (updateLabelNameByIdData && updateLabelNameByIdData.success) {
            // alert('更新成功');
            getAllLabels();
        } else if (updateLabelNameByIdData && !updateLabelNameByIdData.success) {
            alert(`更新失敗！原因：${updateLabelNameByIdData.errors.name[0]}`);
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
                updateTagFunctionsHandler
            }}
        />
    );
}
