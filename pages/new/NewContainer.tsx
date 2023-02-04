import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../apis/index';
import NewView from './NewView';

const apiSetting = new Api();

function NewContainer() {
    const router = useRouter();
    const [forms, setForms] = useState([]);

    const [
        {
            data: getAllCanProjectFormsSchemaData,
            loading: getAllCanProjectFormsSchemaLoading
        },
        getAllCanProjectFormsSchema
    ] = useAxios(apiSetting.FormSchema.getAllCanProjectFormsSchema(),
        {
            manual: false
        }
    );

    useEffect(() => {
        if (getAllCanProjectFormsSchemaData && getAllCanProjectFormsSchemaData.success) {
            setForms(getAllCanProjectFormsSchemaData.form_schema)
        }
    }, [getAllCanProjectFormsSchemaData]);
    return (
        <>
            <NewView {...{ forms }} />
        </>
    );
}

export default NewContainer;
