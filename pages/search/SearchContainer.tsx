import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../apis/index';
import SearchView from './SearchView';

const apiSetting = new Api();

function SearchContainer() {
    const router = useRouter();
    const [documents, setDocuments] = useState([]);
    const [meta, setMeta] = useState([]);
    const [open, setOpen] = useState(false);
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
            :
            router.query.tag_id
                ?
                apiSetting.Search.searchDocumentByTagContent()
                : apiSetting.Search.searchDocumentByContent(),
        {
            manual: true
        }
    );
    const searchDocumentFormik = useFormik({
        initialValues: {
            tag_id: '',
            content: '',
            date: '',
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
                page: parseInt(router.query.page + '') || 1
            });
            searchDocumentFormik.handleSubmit();
        } else if (router.query.tag_id) {
            searchDocumentFormik.setValues({
                content: router.query.content + '',
                date: '',
                tag_id: router.query.tag_id + '',
                page: parseInt(router.query.page + '') || 1
            });
            searchDocumentFormik.handleSubmit();

        } else {
            searchDocumentFormik.setValues({
                content: router.query.content + '',
                date: '',
                tag_id: '',
                page: parseInt(router.query.page + '') || 1
            });
            searchDocumentFormik.handleSubmit();
        }
    }, [router]);
    return (
        <>
            <SearchView {...{ searchDocumentFormik, documents, meta, open, setOpen }} />
        </>
    );
}

export default SearchContainer;
