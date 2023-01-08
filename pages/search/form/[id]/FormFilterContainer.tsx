import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
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
    const [loadingOpen, setLoadingOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [{ data: formSchemaData, loading: formSchemaLoading }, getFormsSchemaById] = useAxios(
        apiSetting.FormSchema.getFormsSchemaById(''),
        {
            manual: true
        }
    );

    const [
        { data: resultFormsData, loading: resultFormsLoading },
        showFormsByFilterAndFormSchemaId
    ] = useAxios(apiSetting.Form.showFormsByFilterAndFormSchemaId('', 1), {
        manual: true
    });

    useEffect(() => {
        if (router && router.query.id) {
            getFormsSchemaById({
                url: apiSetting.FormSchema.getFormsSchemaById(router.query.id as string).url
            });
            showFormsByFilterAndFormSchemaId({
                url: apiSetting.Form.showFormsByFilterAndFormSchemaId(
                    router.query.id as string,
                    page
                ).url,
                data: {
                    filter: filterData
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    useEffect(() => {
        if (formSchemaData && formSchemaData.success) {
            setFormSchema(formSchemaData.form_schema);
        }
    }, [formSchemaData]);

    useEffect(() => {
        // if filterData keys cannot include selectedFilter keys, then remove it
        const filterDataKeys = Object.keys(filterData);
        const filterDataKeysToRemove = filterDataKeys.filter(
            (key) => !selectedFilter.includes(key as never)
        );
        const newFilterData: any = { ...filterData };
        filterDataKeysToRemove.forEach((key) => {
            delete newFilterData[key];
        });
        setFilterData(newFilterData);
    }, [selectedFilter]);

    useEffect(() => {
        if (resultFormsData && resultFormsData.success) {
            // console.log(resultFormsData);
            setFormDatum(formDatum.concat(resultFormsData.form_datum));
            // setFormDatum(resultFormsData.form_datum);
        }
    }, [resultFormsData]);

    useEffect(() => {
        setLoadingOpen(resultFormsLoading);
    }, [resultFormsLoading]);

    useEffect(() => {
        if (router && router.query.id) {
            showFormsByFilterAndFormSchemaId({
                url: apiSetting.Form.showFormsByFilterAndFormSchemaId(
                    router.query.id as string,
                    page
                ).url,
                data: {
                    filter: filterData
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const onSearch = () => {
        showFormsByFilterAndFormSchemaId({
            url: apiSetting.Form.showFormsByFilterAndFormSchemaId(router.query.id as string, page)
                .url,
            data: {
                filter: filterData
            }
        });
    };

    const showAllItemsHandler = useCallback(async () => {
        setPage((page) => page + 1);
    }, []);

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
                formDatum,
                loadingOpen,
                setLoadingOpen,
                resultFormsData,
                showAllItemsHandler
            }}
        />
    );
}
