import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../../apis';
import FormFilterView from './FormFilterView';

const apiSetting = new Api();

export default function FormFilterContainer() {
    const router = useRouter();
    const [formSchema, setFormSchema] = useState({});
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [selectedResult, setSelectedResult] = useState([]);
    const [formDatum, setFormDatum] = useState([]);
    const [filterData, setFilterData] = useState({});
    const [{ data: formSchemaData, loading: formSchemaLoading }, getFormsSchemaById] = useAxios(
        apiSetting.FormSchema.getFormsSchemaById(''),
        {
            manual: true
        }
    );

    const [{ data: resultFormsData }, showFormsByFilterAndFormSchemaId] = useAxios(
        apiSetting.Form.showFormsByFilterAndFormSchemaId(''),
        {
            manual: true
        }
    );

    useEffect(() => {
        console.log('router.query.id: ', router.query.id);
        if (router && router.query.id) {
            getFormsSchemaById({
                url: apiSetting.FormSchema.getFormsSchemaById(router.query.id as string).url
            });
            showFormsByFilterAndFormSchemaId({
                url: apiSetting.Form.showFormsByFilterAndFormSchemaId(router.query.id as string)
                    .url,
                data: {
                    filter: filterData
                }
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

    useEffect(() => {
        console.log('filterData: ', filterData);
        console.log('router.query.id: ', router.query.id);
    }, [filterData]);

    useEffect(() => {
        if (resultFormsData && resultFormsData.success) {
            console.log(resultFormsData);
            setFormDatum(resultFormsData.form_datum);
        }
    }, [resultFormsData]);

    const onSearch = () => {
        console.log('onSearch! filterData: ', filterData);
        showFormsByFilterAndFormSchemaId({
            url: apiSetting.Form.showFormsByFilterAndFormSchemaId(router.query.id as string).url,
            data: {
                filter: filterData
            }
        });
    };

    return (
        <FormFilterView
            {...{
                formSchema,
                selectedFilter,
                setSelectedFilter,
                filterData,
                setFilterData,
                onSearch,
                selectedResult,
                setSelectedResult,
                formDatum
            }}
        />
    );
}
