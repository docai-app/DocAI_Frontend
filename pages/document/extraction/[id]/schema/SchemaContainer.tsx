import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../../../apis';
import SchemaView from './SchemaView';

const apiSetting = new Api();

export default function SchemaContainer() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [extractSchema, setExtractSchema] = useState({
        name: '',
        description: '',
        label_id: '',
        schema: [],
        data_schema: {}
    });

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
        if (router && router.query.id) {
            setExtractSchema({
                ...extractSchema,
                label_id: router.query.id.toString()
            });
        }
        if (router && router.query.schema_id) {
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
        if (createSmartExtractionSchemasData && createSmartExtractionSchemasData.success) {
        }
    }, [createSmartExtractionSchemasData]);

    useEffect(() => {
        console.log('updateSmartExtractionSchemasByIdData', updateSmartExtractionSchemasByIdData);

        if (updateSmartExtractionSchemasByIdData && updateSmartExtractionSchemasByIdData.success) {
        }
    }, [updateSmartExtractionSchemasByIdData]);

    useEffect(() => {
        if (getSmartExtractionSchemasByIdData && getSmartExtractionSchemasByIdData.success) {
            console.log(
                'getSmartExtractionSchemasByIdData',
                getSmartExtractionSchemasByIdData.smart_extraction_schema
            );
            setExtractSchema({
                name: getSmartExtractionSchemasByIdData.smart_extraction_schema?.name,
                description: getSmartExtractionSchemasByIdData.smart_extraction_schema?.description,
                label_id: getSmartExtractionSchemasByIdData.smart_extraction_schema?.label_id,
                schema: getSmartExtractionSchemasByIdData.smart_extraction_schema?.schema,
                data_schema: getSmartExtractionSchemasByIdData.smart_extraction_schema?.data_schema
            });
        }
    }, [getSmartExtractionSchemasByIdData]);

    const handleSave = useCallback(async () => {
        const data_schema: any = {};
        extractSchema.schema?.map((s: any) => {
            data_schema[s.key] = '';
        });
        extractSchema.data_schema = data_schema;
        console.log('data_schema', data_schema);
        console.log(extractSchema);

        if (router && router.query.schema_id) {
            updateSmartExtractionSchemasById({
                ...apiSetting.SmartExtractionSchemas.updateSmartExtractionSchemasById(
                    router.query.schema_id as string
                ),
                data: extractSchema
            });
        } else {
            createSmartExtractionSchemas({
                data: extractSchema
            });
        }
    }, [router, extractSchema]);

    return (
        <SchemaView
            {...{
                open,
                setOpen,
                extractSchema,
                setExtractSchema,
                handleSave
            }}
        />
    );
}
