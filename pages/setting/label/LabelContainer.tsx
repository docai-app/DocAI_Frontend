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
        // addNewLabel({ data: { name: newLabelName } });
        console.log('newLabelName',newLabelName);
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
    
    const tagTypes = [
        { id: '1', type: 'a', label: '普通文檔', feature: '查閱' },
        { id: '2', type: 'b', label: '請假紙審批', feature: '查閱,請假紙專屬OCR,審批' },
        { id: '3', type: 'c', label: '非OCR審批', feature: '查閱,審批' }
    ]
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
    return (
        <LabelView
            {...{
                getAllLabelsData,
                addNewLabelHandler,
                addNewLabelData,
                newLabelName,
                setNewLabelName,
                updateLabelNameByIdHandler,
                tagTypes
            }}
        />
    );
}
