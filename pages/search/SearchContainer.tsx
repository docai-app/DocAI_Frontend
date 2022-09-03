import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import Api from '../../apis/index';
import SearchView from './SearchView';
import { useFormik } from 'formik';
import axios from 'axios';

const apiSetting = new Api();

function SearchContainer() {
    const [documents, setDocuments] = useState([]);
    const [open, setOpen] = useState(false);
    const [
        {
            data: searchDocumentByContentData,
            loading: searchDocumentByContentLoading,
            error: searchDocumentByContentError,
            response: searchDocumentByContentResponse
        },
        searchDocumentByContent
    ] = useAxios(apiSetting.Search.searchDocumentByContent(), {
        manual: true
    });
    const searchDocumentFormik = useFormik({
        initialValues: {
            content: ''
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
            setOpen(false);
        }
    }, [searchDocumentByContentData]);
    useEffect(() => {
        setOpen(searchDocumentByContentLoading);
    }, [searchDocumentByContentLoading]);
    return (
        <>
            <SearchView {...{ searchDocumentFormik, documents, open, setOpen }} />
        </>
    );
}

export default SearchContainer;
