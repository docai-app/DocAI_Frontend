import useAxios from 'axios-hooks';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis/index';
import useAlert from '../../../hooks/useAlert';
import ValidateView from './ValidateView';

const apiSetting = new Api();

function ValidateContainer() {
    const router: any = useRouter();
    const { setAlert } = useAlert();
    const [formUrl, setFormUrl] = useState('');
    const [formId, setFormId] = useState('');
    const [formSchema, setFormSchema] = useState([]);
    const [data, setData] = useState({})
    const [open, setOpen] = useState(false)

    const [
        { data: getSmartExtractionSchemasByIdData },
        getSmartExtractionSchemasById
    ] = useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasById(_get(router, 'query.smart_extraction_schema_id')), {
        manual: true
    });

    const [
        { data: getSmartExtractionSchemasFormDataByIdData, loading },
        getSmartExtractionSchemasFormDataById
    ] = useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasFormDataById(_get(router, 'query.form_id')), {
        manual: true
    });

    const [
        {
            data: updateFormDataData,
            loading: updateFormDataLoading,
            error: updateFormDataError,
            response: updateFormDataResponse
        },
        updateFormData
    ] = useAxios(apiSetting.SmartExtractionSchemas.updateSmartExtractionSchemasFormDataById(_get(router, 'query.form_id')), {
        manual: true
    });

    useEffect(() => {
        setOpen(updateFormDataLoading)
    }, [updateFormDataLoading])

    useEffect(() => {
        if (router.query?.form_url && router.query?.result) {
            setFormUrl(`${router.query.form_url}`);
            setFormId(`${router.query.form_id}`);
            getSmartExtractionSchemasFormDataById();
            getSmartExtractionSchemasById()
        }
    }, [getSmartExtractionSchemasFormDataById, router]);


    useEffect(() => {
        if (getSmartExtractionSchemasFormDataByIdData && getSmartExtractionSchemasFormDataByIdData.success === true) {
            setData(getSmartExtractionSchemasFormDataByIdData?.document_smart_extraction_datum?.data);
        }
    }, [getSmartExtractionSchemasFormDataByIdData]);

    useEffect(() => {
        if (getSmartExtractionSchemasByIdData && getSmartExtractionSchemasByIdData.success === true) {
            setFormSchema(getSmartExtractionSchemasByIdData?.smart_extraction_schema?.schema);
        }
    }, [getSmartExtractionSchemasByIdData]);


    useEffect(() => {
        if (updateFormDataData && updateFormDataData.success === true) {
            setAlert({ title: '資料提交成功！', type: 'success' });
            router.back();
        }
    }, [router, updateFormDataData]);

    const handleConfirm = () => {
        updateFormData({
            data: {
                data: data
            }
        })
    }

    return (
        <>
            <ValidateView
                {...{
                    formUrl,
                    formSchema,
                    loading,
                    data,
                    setData,
                    handleConfirm,
                    open,
                    setOpen
                }}
            />
        </>
    );
}

export default ValidateContainer;
