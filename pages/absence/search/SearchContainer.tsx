import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import SearchView from './SearchView';
import { useFormik } from 'formik';
import axios from 'axios';
import useAlert from '../../../hooks/useAlert';

const apiSetting = new Api();

function SearchContainer() {
    const [absenceForms, setAbsenceForms] = useState({
        form_data: []
    });
    const { setAlert } = useAlert();
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
            const res = await searchFormByLabelAndDate({
                url: `/api/v1/search/form/${encodeURI(label)}/${values.date}`
            });
            if (res.data) {
                setAlert({ title: 'Absence Form Found!', type: 'info' });
                setAbsenceForms({
                    form_data: res.data.form_data
                });
            }
        }
    });
    useEffect(() => {
        axios.defaults.headers.common['authorization'] =
            localStorage.getItem('authorization') || '';
    }, []);
    useEffect(() => {
        if (searchFormByLabelAndDateData) {
            setAbsenceForms({
                form_data: searchFormByLabelAndDateData.form_datum
            });
        }
    }, [searchFormByLabelAndDateData]);
    return (
        <>
            <SearchView {...{ searchAbsenceFormik, absenceForms }} />
        </>
    );
}

export default SearchContainer;
