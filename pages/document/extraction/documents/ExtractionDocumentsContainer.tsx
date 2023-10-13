import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../../apis';
import useAlert from '../../../../hooks/useAlert';
import ExtractionDocuementsView from './ExtractionDocuementsView';

const apiSetting = new Api();

export default function ExtractionDocumentsContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState();
    const [meta, setMeta] = useState();
    const [page, setPage] = useState(1);
    const [smart_extraction_schemas, set_smart_extraction_schemas] = useState<any>([]);

    const [{ data: getSmartExtractionSchemasData, loading }, getSmartExtractionSchemas] =
        useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas('', page), {
            manual: true
        });
    useEffect(() => {
        getSmartExtractionSchemas({
            ...apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas('false', page)
        });

    }, [router]);

    useEffect(() => {
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        if (getSmartExtractionSchemasData && getSmartExtractionSchemasData.success) {
            // console.log('getAllSmartExtractionSchemasData', getAllSmartExtractionSchemasData);
            set_smart_extraction_schemas(getSmartExtractionSchemasData.smart_extraction_schemas);
            setMeta(getSmartExtractionSchemasData.meta);
        }
    }, [getSmartExtractionSchemasData]);

    return (
        <ExtractionDocuementsView
            {...{
                open,
                setOpen,
                label,
                smart_extraction_schemas,
                meta,
            }}
        />
    );
}
