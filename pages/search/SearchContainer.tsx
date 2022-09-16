import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import Api from '../../apis/index';
import SearchView from './SearchView';
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';

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
            : apiSetting.Search.searchDocumentByContent(),
        {
            manual: true
        }
    );
    const searchDocumentFormik = useFormik({
        initialValues: {
            content: '',
            date: '',
            page: 1
        },
        onSubmit: async (values) => {
            let res = await searchDocumentByContent({
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
                page: parseInt(router.query.page + '') || 1
            });
            searchDocumentFormik.handleSubmit();
        } else if (router.query.content) {
            searchDocumentFormik.setValues({
                content: router.query.content + '',
                date: '',
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
