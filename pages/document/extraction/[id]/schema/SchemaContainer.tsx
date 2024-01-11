import useAxios from 'axios-hooks';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
        label_id: '',
        schema: [],
        data_schema: {}
    });
    const [visableAdd, setVisableAdd] = useState(true);
    const [label, setLabel] = useState();

    const [{ data: getTagByIdData, loading: getTagByIdLoading }, getTagById] = useAxios(
        apiSetting.Tag.getTagById(''),
        {
            manual: true
        }
    );

    const [
        { data: getSmartExtractionSchemasByIdData, loading: getLoading },
        getSmartExtractionSchemasById
    ] = useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasById(''), {
        manual: true
    });

    const [{ data: createSmartExtractionSchemasData, loading }, createSmartExtractionSchemas] =
        useAxios(apiSetting.SmartExtractionSchemas.createSmartExtractionSchemas(), {
            manual: true
        });

    const [
        { data: updateSmartExtractionSchemasByIdData, loading: updateLoading },
        updateSmartExtractionSchemasById
    ] = useAxios(apiSetting.SmartExtractionSchemas.updateSmartExtractionSchemasById(''), {
        manual: true
    });

    useEffect(() => {
        if (getTagByIdData && getTagByIdData.success) {
            setLabel(getTagByIdData.tag);
        }
    }, [getTagByIdData]);

    useEffect(() => {
        setActionContent('正在加載數據');
        if (router && router.query.id) {
            getTagById({
                ...apiSetting.Tag.getTagById(router.query.id.toString())
            });
            setExtractSchema({
                ...extractSchema,
                label_id: router.query.id.toString()
            });
        }
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
        if (createSmartExtractionSchemasData && createSmartExtractionSchemasData.success) {
            setAlert({ title: '創建成功', type: 'success' });
        } else if (createSmartExtractionSchemasData && !createSmartExtractionSchemasData.success) {
            setAlert({ title: '創建失敗', type: 'error' });
            console.log(createSmartExtractionSchemasData);
        }
    }, [createSmartExtractionSchemasData]);

    useEffect(() => {
        if (updateSmartExtractionSchemasByIdData && updateSmartExtractionSchemasByIdData.success) {
            setAlert({ title: '保存成功', type: 'success' });
        } else if (
            updateSmartExtractionSchemasByIdData &&
            !updateSmartExtractionSchemasByIdData.success
        ) {
            setAlert({ title: updateSmartExtractionSchemasByIdData.message, type: 'error' });
            console.log(updateSmartExtractionSchemasByIdData);
        }
    }, [updateSmartExtractionSchemasByIdData]);

    useEffect(() => {
        if (getSmartExtractionSchemasByIdData && getSmartExtractionSchemasByIdData.success) {
            setExtractSchema({
                name: getSmartExtractionSchemasByIdData.smart_extraction_schema?.name,
                description: getSmartExtractionSchemasByIdData.smart_extraction_schema?.description,
                label_id: getSmartExtractionSchemasByIdData.smart_extraction_schema?.label_id,
                schema: getSmartExtractionSchemasByIdData.smart_extraction_schema?.schema,
                data_schema: getSmartExtractionSchemasByIdData.smart_extraction_schema?.data_schema
            });
        }
    }, [getSmartExtractionSchemasByIdData]);

    const handleSave = () => {
        const data_schema: any = {};
        extractSchema.schema?.map((s: any) => {
            data_schema[s.key] = '';
        });
        extractSchema.data_schema = data_schema;
        if (_.isEmpty(data_schema)) {
            setAlert({ title: '請添加Column', type: 'warning' });
            return;
        }
        setActionContent('正在保存數據,等待時間較長，請耐心等候...');
        if (router && router.query.schema_id) {
            // const isSame = _.isEqual(
            //     getSmartExtractionSchemasByIdData.smart_extraction_schema.data_schema,
            //     data_schema
            // );
            // if (isSame) {
            //     const _extractSchema = _.omit(extractSchema, 'schema', 'data_schema');
            //     // console.log(_extractSchema);
            //     updateSmartExtractionSchemasById({
            //         ...apiSetting.SmartExtractionSchemas.updateSmartExtractionSchemasById(
            //             router.query.schema_id as string
            //         ),
            //         data: _extractSchema
            //     });
            // } else {
            updateSmartExtractionSchemasById({
                ...apiSetting.SmartExtractionSchemas.updateSmartExtractionSchemasById(
                    router.query.schema_id as string
                ),
                data: extractSchema
            });
            // }
        } else {
            createSmartExtractionSchemas({
                data: extractSchema
            });
        }
    };

    return (
        <SchemaView
            {...{
                label,
                open,
                setOpen,
                extractSchema,
                setExtractSchema,
                handleSave,
                actionContent,
                visableAdd
            }}
        />
    );
}
