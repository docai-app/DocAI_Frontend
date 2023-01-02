import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../../apis';
import FormFilterView from './FormFilterView';

const apiSetting = new Api();

export default function FormFilterContainer() {
    const router = useRouter();
    const [formSchema, setFormSchema] = useState({});
    const [{ data: formSchemaData, loading: formSchemaLoading }, getFormsSchemaById] = useAxios(
        apiSetting.FormSchema.getFormsSchemaById(''),
        {
            manual: true
        }
    );

    useEffect(() => {
        if (router && router.query.id) {
            getFormsSchemaById({
                url: apiSetting.FormSchema.getFormsSchemaById(router.query.id as string).url
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    useEffect(() => {
        if (formSchemaData && formSchemaData.success) {
            console.log(formSchemaData);
            setFormSchema(formSchemaData.form_schema);
        }
    }, [formSchemaData]);

    return <FormFilterView {...{ formSchema }} />;
}
