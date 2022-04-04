import { useState } from 'react';
import useAxios from 'axios-hooks';
import Api from '../../apis/index';
import SearchView from './SearchView';
import { useFormik } from 'formik';

const apiSetting = new Api();

function SearchContainer() {
    const [documents, setDocuments] = useState([]);
    const [
        {
            data: searchDocumentByContentData,
            loading: searchDocumentByContentLoading,
            error: searchDocumentByContentError,
            response: searchDocumentByContentResponse
        },
        searchDocumentByContent
    ] = useAxios(apiSetting.Search.searchDocumentByContent({}), {
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
            console.log(res);
            if (res.data) {
                alert('Document Found!');
                setDocuments(res.data.documents);
            }
        }
    });
    return (
        <>
            <SearchView {...{ searchDocumentFormik, documents }} />
        </>
    );
}

export default SearchContainer;
