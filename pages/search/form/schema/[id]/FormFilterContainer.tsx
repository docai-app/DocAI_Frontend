import useAxios from 'axios-hooks';
import _ from 'lodash';
import { Parser } from 'json2csv';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../../../apis';
import { getDownloadFields, matchFormSchemaAndFormData } from '../../../../../utils/form';
import FormFilterView from './FormFilterView';
import useAlert from '../../../../../hooks/useAlert';

const apiSetting = new Api();

export default function FormFilterContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
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

    const [
        { data: deleteFormByIdData, loading: deleteFormByIdLoading },
        deleteFormById
    ] = useAxios(apiSetting.Form.deleteFormById(''), {
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
        console.log('resultFormsData: ', resultFormsData);
        if (resultFormsData && resultFormsData.success) {
            setFormDatum(formDatum.concat(resultFormsData.form_datum));
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

    const onSearch = async () => {
        setFormDatum([]);
        await showFormsByFilterAndFormSchemaId({
            url: apiSetting.Form.showFormsByFilterAndFormSchemaId(router.query.id as string, page)
                .url,
            data: {
                filter: filterData
            }
        });
    };

    const handleDownload = () => {
        const downloadFormData: Array<any> = [];
        let fields: any[] = [];
        formDatum.map((item: any, i: number) => {
            const itemJSON = item.data;
            const tempData: any = {};
            const matchedData: any[] = matchFormSchemaAndFormData(
                _.get(formSchema, 'form_schema', {}),
                itemJSON
            );
            matchedData.map((item: any) => {
                tempData[item.keyName] = item.value;
            });
            tempData['storage_url'] = item.document?.storage_url;
            downloadFormData.push(tempData);
            if (i + 1 === formDatum.length) {
                fields = getDownloadFields(matchedData);
            }
            fields.push({
                label: '文檔連結',
                value: 'storage_url'
            });
        });
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(downloadFormData);
        const link = document.createElement('a');
        link.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
        link.download = `${_.get(formSchema, 'form_schema.title')}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const showAllItemsHandler = useCallback(async () => {
        setPage((page) => page + 1);
    }, []);

    const handlerDeleteDocument = async (id: string) => {
        if( id ){
            setFormDatum(formDatum.filter((item: any)=>item.id !== id))
            deleteFormById(apiSetting.Form.deleteFormById(id))
        }
    }

    return (
        <FormFilterView
            {...{
                formSchema,
                selectedFilter,
                setSelectedFilter,
                filterData,
                setFilterData,
                onSearch,
                handleDownload,
                selectedResult,
                setSelectedResult,
                formDatum,
                loadingOpen,
                setLoadingOpen,
                resultFormsData,
                showAllItemsHandler,
                handlerDeleteDocument
            }}
        />
    );
}
