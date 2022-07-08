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
    const [newLabelName, setNewLabelName] = useState('');
    const addNewLabelHandler = useCallback(async () => {
        const res = await addNewLabel({ data: { name: newLabelName } });
        if (res.data.status) {
            alert('新增成功');
            getAllLabels();
            setNewLabelName('');
        }
    }, [addNewLabel, newLabelName]);
    return (
        <LabelView
            {...{
                getAllLabelsData,
                addNewLabelHandler,
                addNewLabelData,
                newLabelName,
                setNewLabelName
            }}
        />
    );
}
