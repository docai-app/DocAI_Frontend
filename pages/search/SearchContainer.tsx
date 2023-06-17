import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../apis/index';
import useAlert from '../../hooks/useAlert';
import SearchView from './SearchView';

const apiSetting = new Api();

function SearchContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [documents, setDocuments] = useState([]);
    const [meta, setMeta] = useState([]);
    const [open, setOpen] = useState(false);
    const [documents_items, setDocumentsItems] = useState<any>([]);
    const [updateTag, setUpdateTag] = useState(false);
    const [newLabelName, setNewLabelName] = useState('');
    const [
        {
            data: searchDocumentByContentData,
            loading: searchDocumentByContentLoading,
            error: searchDocumentByContentError,
            response: searchDocumentByContentResponse
        },
        searchDocumentByContent
    ] = useAxios(
        router.query.date
            ? apiSetting.Search.searchDocumentByDate()
            : router.query.tag_id
            ? apiSetting.Search.searchDocumentByTagContent()
            : apiSetting.Search.searchDocumentByContent(),
        {
            manual: true
        }
    );
    const [{ data: updateDocumentTagData }, updateDocumentTag] = useAxios(
        apiSetting.Classification.updateDocumentTag([], ''),
        { manual: true }
    );

    const [{ data: addNewLabelData, error: addNewLabelError }, addNewLabel] = useAxios(
        apiSetting.Tag.addNewTag(),
        { manual: true }
    );

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: false }
    );

    const [{ data: schemasStatusReadyData }, schemasStatusReady] = useAxios(
        apiSetting.Form.schemasStatusReady(),
        {
            manual: false
        }
    );

    const [{ data: deepUnderstandingDocumentData }, deepUnderstandingDocument] = useAxios(
        apiSetting.Document.deepUnderstandingDocument(),
        {
            manual: true
        }
    );

    const searchDocumentFormik = useFormik({
        initialValues: {
            tag_id: '',
            content: '',
            date: '',
            from: '',
            to: '',
            page: 1
        },
        onSubmit: async (values) => {
            const res = await searchDocumentByContent({
                params: {
                    ...values
                }
            });
            if (res.data) {
                setOpen(false);
            }
        }
    });

    const confirmDocumentFormik = useFormik({
        initialValues: {
            document_id: null,
            tag_id: ''
        },
        onSubmit: async (values) => {
            setUpdateTag(true);
            const res = await updateDocumentTag({
                data: {
                    document_ids: documents_items,
                    tag_id: values.tag_id
                }
            });
            setUpdateTag(false);
            if (res.data.success === true) {
                setAlert({ title: '更新成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '更新失敗', type: 'error' });
            }
        }
    });

    const handleDeepUnderstanding = async (form_schema_id: string, needs_approval: boolean) => {
        if (form_schema_id) {
            setUpdateTag(true)
            const res = await deepUnderstandingDocument({
                data: {
                    document_ids: documents_items,
                    form_schema_id: form_schema_id,
                    needs_approval: needs_approval
                }
            });
            setUpdateTag(false)
            if (res.data?.success) {
                setAlert({ title: '操作成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };

    useEffect(() => {
        if (addNewLabelData && addNewLabelData.success) {
            // setAlert({ title: '新增成功', type: 'success' });
            setNewLabelName('');
            confirmDocumentFormik.setFieldValue('tag_id', addNewLabelData.tag.id);
            confirmDocumentFormik.handleSubmit();
        } else if (addNewLabelData && !addNewLabelData.success) {
            setAlert({
                title: '新增失敗！',
                content: `原因：${addNewLabelData.errors.name[0]}`,
                type: 'error'
            });
        }
    }, [addNewLabelData]);

    const addNewLabelHandler = useCallback(async () => {
        addNewLabel({ data: { name: newLabelName } });
    }, [addNewLabel, newLabelName]);

    useEffect(() => {
        if (searchDocumentByContentData && searchDocumentByContentData.success === true) {
            setDocuments(searchDocumentByContentData.documents);
            setMeta(searchDocumentByContentData.meta);
            setOpen(false);
        }
    }, [searchDocumentByContentData]);
    useEffect(() => {
        setOpen(searchDocumentByContentLoading);
    }, [searchDocumentByContentLoading]);

    useEffect(() => {
        if (router.query.date) {
            searchDocumentFormik.setValues({
                date: router.query.date + '',
                content: '',
                tag_id: '',
                from: '',
                to: '',
                page: parseInt(router.query.page + '') || 1
            });
            searchDocumentFormik.handleSubmit();
        } else if (router.query.tag_id) {
            searchDocumentFormik.setValues({
                content: router.query.content + '',
                date: '',
                tag_id: router.query.tag_id + '',
                from: router.query.from + '',
                to: router.query.to + '',
                page: parseInt(router.query.page + '') || 1
            });
            searchDocumentFormik.handleSubmit();
        } else {
            searchDocumentFormik.setValues({
                content: router.query.content + '',
                date: '',
                tag_id: '',
                from: '',
                to: '',
                page: parseInt(router.query.page + '') || 1
            });
            searchDocumentFormik.handleSubmit();
        }
    }, [router]);
    return (
        <>
            <SearchView
                {...{
                    searchDocumentFormik,
                    documents,
                    meta,
                    open,
                    setOpen,
                    documents_items,
                    setDocumentsItems,
                    updateTag,
                    setUpdateTag,
                    newLabelName,
                    setNewLabelName,
                    addNewLabelHandler,
                    confirmDocumentFormik,
                    getAllLabelsData,
                    schemasStatusReadyData,
                    handleDeepUnderstanding
                }}
            />
        </>
    );
}

export default SearchContainer;
