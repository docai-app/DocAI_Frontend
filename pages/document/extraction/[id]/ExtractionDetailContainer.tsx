import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../../apis';
import ExtractionDetailView from './ExtractionDetailView';

const apiSetting = new Api();

export default function ExtractionDetailContainer() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState();
    const [meta, setMeta] = useState();
    const [page, setPage] = useState(1);
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
        useAxios(apiSetting.SmartExtractionSchemas.getAllSmartExtractionSchemas('', page), {
            manual: true
        });

    useEffect(() => {
        if (router && router.query.id) {
            getAllSmartExtractionSchemas({
                ...apiSetting.SmartExtractionSchemas.getAllSmartExtractionSchemas(
                    router.query.id as string,
                    page
                )
            });
            getTagById({
                ...apiSetting.Tag.getTagById(router.query.id as string)
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

    useEffect(() => {}, []);

    return (
        <ExtractionDetailView
            {...{
                open,
                setOpen,
                label,
                currentTypeTab,
                setCurrentTypeTab,
                smart_extraction_schemas,
                meta
            }}
        />
    );
}
