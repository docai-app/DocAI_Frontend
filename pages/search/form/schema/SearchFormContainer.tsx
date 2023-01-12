import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import Api from '../../../../apis';
import SearchFormView from './SearchFormView';

const apiSetting = new Api();

export default function SearchFormContainer() {
    const [forms, setForms] = useState([]);
    const [{ data: tagFunctionsData }] = useAxios(apiSetting.Form.schemasStatusReady(), {
        manual: false
    });

    useEffect(() => {
        if (tagFunctionsData) {
            setForms(tagFunctionsData.form_schema);
        }
    }, [tagFunctionsData]);

    return <SearchFormView forms={forms} />;
}
