import useAxios from 'axios-hooks';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../../../apis';
import useAlert from '../../../../../hooks/useAlert';
import SchemaView from './SchemaView';

const apiSetting = new Api();

export default function SchemaContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [actionContent, setActionContent] = useState('');
    const [extractSchema, setExtractSchema] = useState({
        name: '',
        description: '',
        label_ids: [],
        schema: [],
        data_schema: {}
    });
    const [visableAdd, setVisableAdd] = useState(true);
    const [tag_ids, set_tag_ids] = useState<any>([]);
    const [tags, setTags] = useState<any>([])

    const [
        { data: getSmartExtractionSchemasByIdData, loading: getLoading },
        getSmartExtractionSchemasById
    ] = useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasById(''), {
        manual: true
    });

    const [{ data: createSchemasByDocuemntsData, loading }, createSchemasByDocuemnts] = useAxios(
        apiSetting.SmartExtractionSchemas.createSchemasByDocuemnts(),
        {
            manual: true
        }
    );

    const [{ data: getAllLabelsData, loading: getAllLabelsDataLoading }, getAllLabels] =
        useAxios(apiSetting.Tag.getAllTags(), { manual: true });

    const [
        { data: updateSchemasByDocuemntsByIdData, loading: updateLoading },
        updateSchemasByDocuemntsById
    ] = useAxios(apiSetting.SmartExtractionSchemas.updateSchemasByDocuemntsById(''), {
        manual: true
    });
    useEffect(() => {
        setActionContent('正在加載數據');
        if (router && router.query.schema_id) {
            // setVisableAdd(false);
            getSmartExtractionSchemasById({
                ...apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasById(
                    router.query.schema_id as string
                )
            });
        }
    }, [router]);

    useEffect(() => {
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        setOpen(updateLoading);
    }, [updateLoading]);

    useEffect(() => {
        setOpen(getLoading);
    }, [getLoading]);

    useEffect(() => {
        getAllLabels();
    }, [getAllLabels]);

    useEffect(() => {
        if (createSchemasByDocuemntsData && createSchemasByDocuemntsData.success) {
            setAlert({ title: '創建成功', type: 'success' });
        } else if (createSchemasByDocuemntsData && !createSchemasByDocuemntsData.success) {
            setAlert({ title: '創建失敗', type: 'error' });
            console.log(createSchemasByDocuemntsData);
        }
    }, [createSchemasByDocuemntsData]);

    useEffect(() => {
        if (updateSchemasByDocuemntsByIdData && updateSchemasByDocuemntsByIdData.success) {
            setAlert({ title: '保存成功', type: 'success' });
        } else if (updateSchemasByDocuemntsByIdData && !updateSchemasByDocuemntsByIdData.success) {
            setAlert({ title: updateSchemasByDocuemntsByIdData.message, type: 'error' });
            console.log(updateSchemasByDocuemntsByIdData);
        }
    }, [updateSchemasByDocuemntsByIdData]);

    useEffect(() => {
        if (getSmartExtractionSchemasByIdData && getSmartExtractionSchemasByIdData.success) {
            setExtractSchema({
                name: getSmartExtractionSchemasByIdData.smart_extraction_schema?.name,
                description: getSmartExtractionSchemasByIdData.smart_extraction_schema?.description,
                label_ids: getSmartExtractionSchemasByIdData.smart_extraction_schema?.label_ids,
                schema: getSmartExtractionSchemasByIdData.smart_extraction_schema?.schema,
                data_schema: getSmartExtractionSchemasByIdData.smart_extraction_schema?.data_schema
            });
        }
    }, [getSmartExtractionSchemasByIdData]);

    useEffect(() => {
        if (getAllLabelsData && getAllLabelsData.success) {
            setTags(getAllLabelsData.tags)
        }
    }, [getAllLabelsData])

    const handleSave = useCallback(async () => {
        const data_schema: any = {};
        extractSchema.schema?.map((s: any) => {
            data_schema[s.key] = '';
        });
        extractSchema.label_ids = tag_ids
        extractSchema.data_schema = data_schema;
        if (_.isEmpty(data_schema)) {
            setAlert({ title: '請添加Column', type: 'warning' });
            return;
        }
        console.log('extractSchema', extractSchema);

        // setActionContent('正在保存數據,等待時間較長，請耐心等候...');
        // if (router && router.query.schema_id) {
        //     const isSame = _.isEqual(
        //         getSmartExtractionSchemasByIdData.smart_extraction_schema.data_schema,
        //         data_schema
        //     );
        //     if (isSame) {
        //         const _extractSchema = _.omit(extractSchema, 'schema', 'data_schema');
        //         // console.log(_extractSchema);
        //         updateSchemasByDocuemntsById({
        //             ...apiSetting.SmartExtractionSchemas.updateSmartExtractionSchemasById(
        //                 router.query.schema_id as string
        //             ),
        //             data: _extractSchema
        //         });
        //     } else {
        //         updateSchemasByDocuemntsById({
        //             ...apiSetting.SmartExtractionSchemas.updateSmartExtractionSchemasById(
        //                 router.query.schema_id as string
        //             ),
        //             data: extractSchema
        //         });
        //     }
        // } else {
        //     createSchemasByDocuemnts({
        //         data: extractSchema
        //     });
        // }
    }, [router, getSmartExtractionSchemasByIdData, extractSchema]);

    return (
        <SchemaView
            {...{
                open,
                setOpen,
                extractSchema,
                setExtractSchema,
                handleSave,
                actionContent,
                visableAdd,
                tags,
                tag_ids,
                set_tag_ids,
                getAllLabelsDataLoading
            }}
        />
    );
}
