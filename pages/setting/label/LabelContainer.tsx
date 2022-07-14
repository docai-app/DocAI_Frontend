import { useCallback, useState } from 'react';
import LabelView from './LableView';
import Api from '../../../apis';
import useAxios from 'axios-hooks';

const apiSetting = new Api();

export default function LabelContainer() {
    const [props, setProps] = useState<any>({});
    const [{ data: addNewLabelData, error: addNewLabelError }, addNewLabel] = useAxios(
        apiSetting.Label.addNewLabel(),
        { manual: true }
    );
    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Label.getAllLabels()
    );
    const [
        { data: updateLabelNameByIdData, error: updateLabelNameByIdError },
        updateLabelNameById
    ] = useAxios(apiSetting.Label.updateLabelNameById(''), { manual: true });
    const [newLabelName, setNewLabelName] = useState('');
    const addNewLabelHandler = useCallback(async () => {
        const res = await addNewLabel({ data: { name: newLabelName } });
        if (res.data.status) {
            alert('新增成功');
            getAllLabels();
            setNewLabelName('');
        }
    }, [addNewLabel, newLabelName]);
    const updateLabelNameByIdHandler = useCallback(
        async (id: string, newName: string) => {
            const res = await updateLabelNameById({
                ...apiSetting.Label.updateLabelNameById(id),
                data: { name: newName }
            });
            if (res.data.status) {
                alert('更新成功');
                getAllLabels();
            }
        },
        [updateLabelNameById]
    );
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
