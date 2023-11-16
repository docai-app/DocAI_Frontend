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

    const [{ data: getSmartExtractionSchemasData, loading: loading }, getSmartExtractionSchemas] =
        useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas(has_label, page), {
            manual: true
        });

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: true }
    );

    const [{ data: getAllUsersData }, getAllUsers] = useAxios(apiSetting.User.getAllUsers(), {
        manual: true
    });

    useEffect(() => {
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        getAllLabels();
    }, [router]);

    useEffect(() => {
        if (getAllUsersData && getAllUsersData.success) {
            setUsers(getAllUsersData.users);
        }
    }, [getAllUsersData]);

    useEffect(() => {
        getSmartExtractionSchemas(
            apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas(has_label, page)
        );
    }, [router, page, has_label]);

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
        router.push({
            pathname: `/smart_extraction_schema/label/${label?.id}`,
            query: { label: label.name }
        });
    };

    return (
        <SchemasView
            {...{
                open,
                setOpen,
                allSchemas,
                meta,
                search,
                showAllSchemasHandler,
                showHasLabelSchemasHandler,
                getAllLabelsData,
                users
            }}
        />
    );
}
