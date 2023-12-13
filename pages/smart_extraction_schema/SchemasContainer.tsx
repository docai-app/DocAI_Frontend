import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../apis';
import useAlert from '../../hooks/useAlert';
import SchemasView from './SchemasView';

const apiSetting = new Api();

export default function ScheamDataContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [allSchemas, setAllSchemas] = useState<any>([]);
    const [meta, setMeta] = useState();
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState<any>([]);
    const [has_label, set_has_label] = useState('');
    const [currectLabel, setCurrectLabel] = useState<any>()

    const [{ data: getSmartExtractionSchemasData, loading: loading }, getSmartExtractionSchemas] =
        useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas(has_label, page), {
            manual: true
        });
    const [{ data: deleteSchemasData }, deleteSchemaById] = useAxios(
        apiSetting.SmartExtractionSchemas.deleteSchemasByDocuemntsById(''),
        {
            manual: true
        }
    );

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: true }
    );

    const [{ data: getAllUsersData }, getAllUsers] = useAxios(apiSetting.User.getAllUsers(), {
        manual: true
    });

    const [
        { data: getSmartExtractionSchemasByLabelData, loading: getSmartExtractionSchemasByLabelLoading },
        getSmartExtractionSchemasByLabel
    ] = useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasByLabel('', page), {
        manual: true
    });

    useEffect(() => {
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        setOpen(getSmartExtractionSchemasByLabelLoading);
    }, [getSmartExtractionSchemasByLabelLoading]);

    useEffect(() => {
        getAllLabels();
    }, [router]);

    useEffect(() => {
        if (getAllUsersData && getAllUsersData.success) {
            setUsers(getAllUsersData.users);
        }
    }, [getAllUsersData]);

    // useEffect(() => {
    //     getSmartExtractionSchemas(
    //         apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas(has_label, page)
    //     );
    // }, [router, page, has_label]);

    useEffect(() => {
        if (currectLabel) {
            getSmartExtractionSchemasByLabel(
                apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasByLabel(
                    currectLabel?.id,
                    page
                )
            );
        } else {
            getSmartExtractionSchemas(
                apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas(has_label, page)
            );
        }
    }, [router, page, has_label, currectLabel]);


    useEffect(() => {
        if (getSmartExtractionSchemasData && getSmartExtractionSchemasData.success) {
            setMeta(getSmartExtractionSchemasData.meta);
            if (page == 1) {
                setAllSchemas(getSmartExtractionSchemasData.smart_extraction_schemas);
            } else {
                setAllSchemas(
                    allSchemas.concat(getSmartExtractionSchemasData.smart_extraction_schemas)
                );
            }
            // console.log('getSmartExtractionSchemasData', getSmartExtractionSchemasData);
        }
    }, [getSmartExtractionSchemasData]);

    const showHasLabelSchemasHandler = useCallback(async (has_label: any) => {
        console.log('has_label', has_label);
        setPage(1);
        set_has_label(has_label);
    }, []);

    const showAllSchemasHandler = useCallback(async () => {
        setPage((page) => page + 1);
    }, []);

    const search = (label: any) => {
        setCurrectLabel(label)
        setAllSchemas([])
        // router.push({
        //     pathname: `/smart_extraction_schema/label/${label?.id}`,
        //     query: { label: label.name }
        // });
    };

    const handleDeleteSchema = (schema_id: string) => {
        // console.log('schema_id', schema_id);
        setOpen(true);
        deleteSchemaById({
            ...apiSetting.SmartExtractionSchemas.deleteSchemasByDocuemntsById(schema_id)
        });
    };

    useEffect(() => {
        if (deleteSchemasData && deleteSchemasData.success) {
            setOpen(false);
            setAlert({ title: '删除成功!', type: 'success' });
            router.reload();
        } else if (deleteSchemasData && !deleteSchemasData.success) {
            setOpen(false);
            setAlert({ title: deleteSchemasData.error, type: 'error' });
        }
    }, [deleteSchemasData]);

    useEffect(() => {
        if (getSmartExtractionSchemasByLabelData && getSmartExtractionSchemasByLabelData.success) {
            setMeta(getSmartExtractionSchemasByLabelData.meta);
            if (page == 1) {
                setAllSchemas(getSmartExtractionSchemasByLabelData.smart_extraction_schema);
            } else {
                setAllSchemas(
                    allSchemas.concat(getSmartExtractionSchemasByLabelData.smart_extraction_schema)
                );
            }
        }
    }, [getSmartExtractionSchemasByLabelData]);

    return (
        <SchemasView
            {...{
                open,
                setOpen,
                allSchemas,
                setAllSchemas,
                meta,
                search,
                showAllSchemasHandler,
                showHasLabelSchemasHandler,
                getAllLabelsData,
                users,
                handleDeleteSchema,
                currectLabel,
                setCurrectLabel
            }}
        />
    );
}
