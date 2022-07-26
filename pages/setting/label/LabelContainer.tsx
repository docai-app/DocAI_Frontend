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
    const [
        { data: updateLabelNameByIdData, error: updateLabelNameByIdError },
        updateLabelNameById
    ] = useAxios(apiSetting.Tag.updateTagNameById(''), { manual: true });

    const addNewLabelHandler = useCallback(async () => {
        addNewLabel({ data: { name: newLabelName } });
    }, [addNewLabel, newLabelName]);

    const updateLabelNameByIdHandler = useCallback(
        async (id: string, newName: string) => {
            updateLabelNameById({
                ...apiSetting.Tag.updateTagNameById(id),
                data: { name: newName }
            });
        },
        [updateLabelNameById]
    );

    useEffect(() => {
        axios.defaults.headers.common['authorization'] =
            localStorage.getItem('authorization') || '';
        getAllLabels();
    }, [getAllLabels]);

    useEffect(() => {
        if (addNewLabelData && addNewLabelData.success) {
            alert('新增成功');
            getAllLabels();
            setNewLabelName('');
        } else if (addNewLabelData && !addNewLabelData.success) {
            alert(`新增失敗！原因：${addNewLabelData.errors.name[0]}`);
        }
    }, [getAllLabels, addNewLabelData]);

    useEffect(() => {
        if (updateLabelNameByIdData && updateLabelNameByIdData.success) {
            alert('更新成功');
            getAllLabels();
        } else if (updateLabelNameByIdData && !updateLabelNameByIdData.success) {
            alert(`更新失敗！原因：${updateLabelNameByIdData.errors.name[0]}`);
        }
    }, [getAllLabels, updateLabelNameByIdData]);
    return (
        <LabelView
            {...{
                getAllLabelsData,
                addNewLabelHandler,
                addNewLabelData,
                newLabelName,
                setNewLabelName,
                updateLabelNameByIdHandler
            }}
        />
    );
}
