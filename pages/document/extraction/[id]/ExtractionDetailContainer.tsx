import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../../apis';
import { getAllChainFeatureDatas } from '../../../../apis/AirtableChainFeature';
import useAlert from '../../../../hooks/useAlert';
import ExtractionDetailView from './ExtractionDetailView';

const apiSetting = new Api();

export default function ExtractionDetailContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState();
    const [meta, setMeta] = useState();
    const [page, setPage] = useState(1);
    const [chain_features, set_chain_features] = useState<any>([]);
    const [smart_extraction_schemas, set_smart_extraction_schemas] = useState<any>([]);
    //数据提取，填表，推荐功能
    const [currentTypeTab, setCurrentTypeTab] = useState<
        'extraction' | 'form_filling' | 'chain_feature'
    >('extraction');

    const [{ data: getTagByIdData, loading: getTagByIdLoading }, getTagById] = useAxios(
        apiSetting.Tag.getTagById(''),
        {
            manual: true
        }
    );

    const [{ data: getAllSmartExtractionSchemasData, loading }, getAllSmartExtractionSchemas] =
        useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasByLabel('', page), {
            manual: true
        });

    const [{ data: updateTagFeaturesData }, updateTagFeatures] = useAxios(
        apiSetting.Tag.updateTagFeatures(''),
        { manual: true }
    );

    const [{ data: updateTagNameData }, updateTagName] = useAxios(
        apiSetting.Tag.updateTagNameById(''),
        { manual: true }
    );

    const [{ data: tagTypes, error: getAllTagFunctionsError }, getAllTagFunctions] = useAxios(
        apiSetting.Tag.getTagFunctions(),
        { manual: true }
    );

    const [{ data: updateTagFunctionsData, error: updateTagFunctionsError }, updateTagFunctions] =
        useAxios(apiSetting.Tag.updateTagFunctions(), { manual: true });

    const [{ data: deleteTagFunctionsData, error: deleteTagFunctionsError }, deleteTagFunctions] =
        useAxios(apiSetting.Tag.deleteTagFunctions(), { manual: true });


    useEffect(() => {
        if (router && router.query.id) {
            getAllSmartExtractionSchemas({
                ...apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasByLabel(
                    router.query.id as string,
                    page
                )
            });
            getTagById({
                ...apiSetting.Tag.getTagById(router.query.id as string)
            });
            getAllTagFunctions()
            getAllChainFeatureDatas().then((datas) => {
                set_chain_features(datas);
            });

        }
    }, [router]);

    useEffect(() => {
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        if (getAllSmartExtractionSchemasData && getAllSmartExtractionSchemasData.success) {
            // console.log('getAllSmartExtractionSchemasData', getAllSmartExtractionSchemasData);
            set_smart_extraction_schemas(getAllSmartExtractionSchemasData.smart_extraction_schema);
            setMeta(getAllSmartExtractionSchemasData.meta);
        }
    }, [getAllSmartExtractionSchemasData]);

    useEffect(() => {
        if (getTagByIdData && getTagByIdData.success) {
            setLabel(getTagByIdData.tag);
        }
    }, [getTagByIdData]);

    useEffect(() => { }, []);

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

    const updateTagNameHandler = useCallback(
        async (tag_id: string, tag_name: string) => {
            updateTagName({
                ...apiSetting.Tag.updateTagNameById(tag_id),
                data: { name: tag_name }
            }).then((res) => {
                if (res.data.success) {
                    setAlert({ title: '更新成功', type: 'success' });
                } else {
                    setAlert({ title: '更新失敗', type: 'error' });
                }
            });
        },
        [updateTagName]
    );

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

    const deleteTagFunctionsHandler = useCallback(
        async (tag_id: string, function_id: string) => {
            if (function_id)
                deleteTagFunctions({
                    data: { tag_id: tag_id, function_id: function_id }
                }).then((res) => {
                    if (res.data.success) {
                        setAlert({ title: '更新成功', type: 'success' });
                    } else {
                        setAlert({ title: '更新失敗', type: 'error' });
                    }
                });
        },
        [deleteTagFunctions]
    );

    return (
        <ExtractionDetailView
            {...{
                open,
                setOpen,
                label,
                currentTypeTab,
                setCurrentTypeTab,
                smart_extraction_schemas,
                meta,
                chain_features,
                updateTagFeatureHandler,
                updateTagNameHandler,
                updateTagFunctionsHandler,
                deleteTagFunctionsHandler,
                tagTypes
            }}
        />
    );
}
