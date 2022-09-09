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

    useEffect(() => {
        if( router.query.content ){
            searchDocumentFormik.setValues({'content': router.query.content + ''})
            searchDocumentFormik.handleSubmit()
        }
    },[router.query.content])
    return (
        <>
            <SearchView {...{ searchDocumentFormik, documents, open, setOpen }} />
        </>
    );
}

export default SearchContainer;
