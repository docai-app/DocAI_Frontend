import useAxios from 'axios-hooks';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';
import { getAllChainFeatureDatas } from '../../../apis/AirtableChainFeature';
import useAlert from '../../../hooks/useAlert';
import DocumentExtractionView from './DocumentExtractionView';

const apiSetting = new Api();

export default function DocumentExtractionContainer() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { setAlert } = useAlert();
    const [labels, setLabels] = useState<any>([]);
    const [chain_features, set_chain_features] = useState<any>([]);
    const [{ data: tagFunctionsData }] = useAxios(apiSetting.Form.schemasStatusReady(), {
        manual: false
    });

    const [{ data: getAllLabelsData, loading: loading, error: getAllLabelsError }, getAllLabels] =
        useAxios(apiSetting.Tag.getAllTags(), { manual: true });

    const [{ data: updateTagFeaturesData }, updateTagFeatures] = useAxios(
        apiSetting.Tag.updateTagFeatures(''),
        { manual: true }
    );

    const [
        { data: updateLabelNameByIdData, error: updateLabelNameByIdError },
        updateLabelNameById
    ] = useAxios(apiSetting.Tag.updateTagNameById(''), { manual: true });

    useEffect(() => {
        getAllLabels();
    }, [router]);

    useEffect(() => {
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        if (getAllLabelsData && getAllLabelsData.success) {
            setLabels(getAllLabelsData.tags);
        }
    }, [getAllLabelsData]);

    useEffect(() => {
        getAllChainFeatureDatas().then((res) => {
            set_chain_features(res);
        });
    }, []);

    useEffect(() => {
        if (updateLabelNameByIdData && updateLabelNameByIdData.success) {
            setAlert({ title: '更新成功', type: 'success' });
            const tmp = _.map(labels, function (label: any) {
                if (label?.id == updateLabelNameByIdData.tag.id) {
                    return {
                        ...label,
                        name: updateLabelNameByIdData.tag.name
                    };
                } else {
                    return label;
                }
            });
            setLabels(tmp);
        } else if (updateLabelNameByIdData && !updateLabelNameByIdData.success) {
            setAlert({ title: '更新失敗', type: 'error' });
        }
    }, [updateLabelNameByIdData]);

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

    const updateLabelNameByIdHandler = useCallback(
        async (id: string, newName: string, is_checked?: boolean) => {
            updateLabelNameById({
                ...apiSetting.Tag.updateTagNameById(id),
                data: { name: newName, is_checked: is_checked }
            });
        },
        [updateLabelNameById]
    );

    return (
        <DocumentExtractionView
            {...{
                open,
                setOpen,
                labels,
                updateTagFeatureHandler,
                updateLabelNameByIdHandler,
                chain_features
            }}
        />
    );
}
