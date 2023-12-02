import useAxios from 'axios-hooks';
import { Parser } from 'json2csv';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../../apis';
import useAlert from '../../../../hooks/useAlert';
import { getDownloadFieldsFormSmartExtraSchema } from '../../../../utils/form';
import SchemaDataView from './SchemaDataView';

const apiSetting = new Api();

export default function ScheamDataContainer() {
    const router = useRouter();
    const [label, setLabel] = useState();
    const { setAlert } = useAlert();
    const [formSchema, setFormSchema] = useState<any>({});
    const [selectedFilter, setSelectedFilter] = useState<any>([]);
    const [selectedResult, setSelectedResult] = useState([]);
    const [formDatum, setFormDatum] = useState([]);
    const [filterData, setFilterData] = useState<any>({});
    const [loadingOpen, setLoadingOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [modalDescription, setModalDescription] = useState({});
    const [visableHtmlCode, setVisibleHtmlCode] = useState(false);
    const [visableHtmlToPdf, setVisibleHtmlToPdf] = useState(false);
    const [report, setReport] = useState('');
    const [chart, setChart] = useState({});
    const [open, setOpen] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [meta, setMeta] = useState();

    const [{ data: getTagByIdData, loading: getTagByIdLoading }, getTagById] = useAxios(
        apiSetting.Tag.getTagById(''),
        {
            manual: true
        }
    );

    const [{ data: resultFormsData, loading }, getSmartExtractionSchemasDataById] = useAxios(
        apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasDataById(''),
        { manual: true }
    );

    const [{ data: searchData, loading: searching }, searchSmartExtractionSchemasDataById] =
        useAxios(apiSetting.SmartExtractionSchemas.searchSmartExtractionSchemasDataById(''), {
            manual: true
        });

    const [
        {
            data: getSmartExtractionSchemasByIdData,
            loading: getSmartExtractionSchemasByIdDataLoading
        },
        getSmartExtractionSchemasById
    ] = useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasById(''), {
        manual: true
    });

    const [{ data: generateChartData, loading: generateChartLoading }, generateChart] = useAxios(
        '',
        { manual: true }
    );

    const [
        { data: generateStatisticsData, loading: generateStatisticsLoading },
        generateStatistics
    ] = useAxios(apiSetting.SmartExtractionSchemas.generateStatistics('', ''), { manual: true });

    const [{ data: deleteFormByIdData, loading: deleteFormByIdLoading }, deleteFormById] = useAxios(
        apiSetting.SmartExtractionSchemas.deleteSmartExtractionSchemasFormDataById(''),
        {
            manual: true
        }
    );

    useEffect(() => {
        setOpen(loading);
        if (loading)
            setModalDescription({
                title: '進行中......',
                content: '正在獲取資料'
            });
    }, [loading]);

    useEffect(() => {
        setOpen(searching);
        if (searching)
            setModalDescription({
                title: '進行中......',
                content: '正在獲取資料'
            });
    }, [searching]);

    useEffect(() => {
        if (router && router.query.id) {
            getSmartExtractionSchemasById({
                ...apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasById(
                    router.query.id as string
                )
            });
        }
    }, [router.query.id]);

    useEffect(() => {
        if (router && router.query.id) {
            getSmartExtractionSchemasDataById({
                ...apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasDataById(
                    router.query.id as string,
                    page
                )
            });
        }
    }, [router.query.id, page]);

    useEffect(() => {
        if (router.query.page) {
            setPage(parseInt(router.query.page.toString()) || 1);
        }
    }, [router.query.page]);

    useEffect(() => {
        if (getSmartExtractionSchemasByIdData && getSmartExtractionSchemasByIdData.success) {
            // console.log('getSmartExtractionSchemasByIdData', getSmartExtractionSchemasByIdData);
            setSelectedResult(getSmartExtractionSchemasByIdData.smart_extraction_schema?.schema);
            setFormSchema(getSmartExtractionSchemasByIdData.smart_extraction_schema);
            setSelectedFilter(getSmartExtractionSchemasByIdData.smart_extraction_schema?.schema);
        }
    }, [getSmartExtractionSchemasByIdData]);

    useEffect(() => {
        if (resultFormsData && resultFormsData.success) {
            // console.log('getSmartExtractionSchemasDataByIdData', resultFormsData);
            // if (page == 1) setFormDatum(resultFormsData.document_smart_extraction_datum);
            // else setFormDatum(formDatum.concat(resultFormsData.document_smart_extraction_datum));
            // setHasMore(resultFormsData?.meta?.next_page != null);
            setFormDatum(resultFormsData.document_smart_extraction_datum);
            setMeta(resultFormsData?.meta);
        }
    }, [resultFormsData]);

    useEffect(() => {
        if (searchData && searchData.success) {
            // console.log('searchData', searchData.document_smart_extraction_datum);
            // if (page == 1) setFormDatum(searchData.document_smart_extraction_datum);
            // else setFormDatum(formDatum.concat(searchData.document_smart_extraction_datum));
            // setHasMore(false);
            setFormDatum(searchData?.document_smart_extraction_datum);
            setMeta(searchData?.meta);
        }
    }, [searchData]);

    useEffect(() => {
        if (getTagByIdData && getTagByIdData.success) {
            setLabel(getTagByIdData.tag);
        }
    }, [getTagByIdData]);

    useEffect(() => { }, []);

    const showAllItemsHandler = useCallback(async () => {
        setPage((page) => page + 1);
    }, []);

    const onSearch = () => {
        // console.log('filterData', filterData);
        const filter: any = {};
        _.keys(filterData).map((key: any) => {
            if (filterData[key]) {
                filter[key] = filterData[key].toString().trim();
            }
        });
        setPage(1);
        // console.log('filter', filter);
        if (_.isEmpty(filter)) {
            getSmartExtractionSchemasDataById({
                ...apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasDataById(
                    router.query.id as string,
                    1
                )
            });
        } else {
            searchSmartExtractionSchemasDataById({
                ...apiSetting.SmartExtractionSchemas.searchSmartExtractionSchemasDataById(
                    router.query.id as string,
                    1
                ),
                data: {
                    filter: filter
                }
            });
        }
    };
    const handleDownload = () => {
        const downloadFormData: Array<any> = [];
        let fields: any[] = [];
        // console.log('formDatum', formDatum);

        formDatum.map((item: any, i: number) => {
            const matchedData = item.data;
            matchedData['storage_url'] = item.document?.storage_url;
            downloadFormData.push(matchedData);
            if (i + 1 === formDatum.length) {
                fields = getDownloadFieldsFormSmartExtraSchema(selectedResult);
                // console.log(fields);
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
        link.download = `${formSchema?.name}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlerDeleteDocument = async (id: string) => {
        if (id) {
            setFormDatum(formDatum.filter((item: any) => item.id !== id));
            deleteFormById(
                apiSetting.SmartExtractionSchemas.deleteSmartExtractionSchemasFormDataById(id)
            );
        }
    };

    const handlerGenerateChart = async (query: string, form_data_ids: []) => {
        // console.log('query', query);
        // console.log('form_data_ids', form_data_ids);
        const smart_extraction_schema_id = router.query.id?.toString() || '';
        if (query) {
            setOpen(true);
            setModalDescription({
                title: '進行中......',
                content: '正在生成圖表,請耐心等候...'
            });
            const res = await generateChart(
                apiSetting.SmartExtractionSchemas.generateChart(smart_extraction_schema_id, query)
            );
            if (res.data.success) {
                setVisibleHtmlCode(true);
                setChart(res.data.chart);
            } else {
                console.log(res.data);
                setAlert({ title: res.data.chart, type: 'error' });
            }
            setOpen(false);
        }
    };

    const handlerGenerateStatistics = async (query: string, form_data_ids: []) => {
        // console.log('query', query);
        // console.log('form_data_ids', form_data_ids);
        const smart_extraction_schema_id = router.query.id?.toString() || '';
        if (query) {
            setOpen(true);
            setModalDescription({
                title: '進行中......',
                content: '正在生成報告,請耐心等候...'
            });
            const res = await generateStatistics(
                apiSetting.SmartExtractionSchemas.generateStatistics(
                    smart_extraction_schema_id,
                    query
                )
            );
            if (res.data.success) {
                // console.log(res.data.report);
                // setChart(res.data.report);
                setVisibleHtmlToPdf(true);
                setReport(res.data.report);
            } else {
                console.log(res.data);
                setAlert({
                    title: res.data.report,
                    type: 'error'
                });
            }
            setOpen(false);
        }
    };

    return (
        <SchemaDataView
            {...{
                label,
                formSchema,
                formDatum,
                selectedResult,
                showAllItemsHandler,
                resultFormsData,
                open,
                setOpen,
                modalDescription,
                onSearch,
                filterData,
                setFilterData,
                handleDownload,
                selectedFilter,
                handlerDeleteDocument,
                handlerGenerateChart,
                handlerGenerateStatistics,
                visableHtmlCode,
                setVisibleHtmlCode,
                chart,
                hasMore,
                meta,
                report,
                visableHtmlToPdf,
                setVisibleHtmlToPdf
            }}
        />
    );
}
