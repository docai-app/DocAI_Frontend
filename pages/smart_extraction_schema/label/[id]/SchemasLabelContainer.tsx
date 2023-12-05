import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../../apis';
import useAlert from '../../../../hooks/useAlert';
import SchemasLabelView from './SchemasLabelView';

const apiSetting = new Api();

export default function SchemasLabelContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [allSchemas, setAllSchemas] = useState<any>([]);
    const [modalDescription, setModalDescription] = useState({});
    const [meta, setMeta] = useState();
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState<any>([]);

    const [
        { data: getSmartExtractionSchemasByLabelData, loading },
        getSmartExtractionSchemasByLabel
    ] = useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasByLabel('', page), {
        manual: true
    });
    const [{ data: getAllUsersData }, getAllUsers] = useAxios(apiSetting.User.getAllUsers(), {
        manual: true
    });

    const [{ data: deleteSchemasData }, deleteSchemaById] =
        useAxios(apiSetting.SmartExtractionSchemas.deleteSchemasByDocuemntsById(''), {
            manual: true
        });

    useEffect(() => {
        setOpen(loading);
        if (loading)
            setModalDescription({
                title: '進行中......',
                content: '正在獲取資料'
            });
    }, [loading]);

    useEffect(() => {
        // getAllUsers();
    }, [router]);

    useEffect(() => {
        if (getAllUsersData && getAllUsersData.success) {
            setUsers(getAllUsersData.users);
        }
    }, [getAllUsersData]);

    useEffect(() => {
        if (router.query.id)
            getSmartExtractionSchemasByLabel(
                apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasByLabel(
                    router.query.id as string,
                    page
                )
            );
    }, [router, page]);

    const showAllSchemasHandler = useCallback(async () => {
        setPage((page) => page + 1);
    }, []);

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


    const handleDeleteSchema = (schema_id: string) => {
        // console.log('schema_id', schema_id);
        setOpen(true)
        deleteSchemaById({
            ...apiSetting.SmartExtractionSchemas.deleteSchemasByDocuemntsById(schema_id)
        })
    }

    useEffect(() => {
        if (deleteSchemasData && deleteSchemasData.success) {
            setOpen(false)
            setAlert({ title: "删除成功!", type: 'success' });
            router.reload()
        } else if (deleteSchemasData && !deleteSchemasData.success) {
            setOpen(false)
            setAlert({ title: deleteSchemasData.error, type: 'error' });
        }
    }, [deleteSchemasData])

    return (
        <SchemasLabelView
            {...{
                open,
                setOpen,
                modalDescription,
                allSchemas,
                meta,
                showAllSchemasHandler,
                users,
                handleDeleteSchema
            }}
        />
    );
}
