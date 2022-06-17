import { useState } from 'react';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import SearchView from './SearchView';
import { useFormik } from 'formik';

const apiSetting = new Api();

function SearchContainer() {
    const [absenceForms, setAbsenceForms] = useState({
        form_data: [],
        form_schema: {}
    });
    const [label, setLabel] = useState('請假表');
    const [
        {
            data: searchFormByLabelAndDateData,
            loading: searchFormByLabelAndDateLoading,
            error: searchFormByLabelAndDateError,
            response: searchFormByLabelAndDateResponse
        },
        searchFormByLabelAndDate
    ] = useAxios(
        apiSetting.Search.searchFormByLabelAndDate(label, new Date().toISOString().split('T')[0]),
        {
            manual: false
        }
    );
    const searchAbsenceFormik = useFormik({
        initialValues: {
            date: new Date().toISOString().split('T')[0]
        },
        onSubmit: async (values) => {
            let res = await searchFormByLabelAndDate({
                url: `/search/form/${encodeURI(label)}/${values.date}`
            });
            console.log(res);
            if (res.data) {
                alert('Absence Form Found!');
                setAbsenceForms(res.data.forms);
            }
        }
    });
    return (
        <>
            <SearchView {...{ searchAbsenceFormik, absenceForms }} />
        </>
    );
}

export default SearchContainer;
