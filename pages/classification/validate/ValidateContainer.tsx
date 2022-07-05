import { useEffect } from 'react';
import ValidateView from './ValidateView';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

const apiSetting = new Api();

function ValidateContainer() {
    const router = useRouter();
    const [
        {
            data: latestPredictionData,
            loading: latestPredictionLoading,
            error: latestPredictionError,
            response: latestPredictionResponse
        },
        getAndPredictLatestUploadedDocument
    ] = useAxios(apiSetting.Document.getAndPredictLatestUploadedDocument(), {
        manual: true
    });

    const [
        {
            data: confirmDocumentData,
            loading: confirmDocumentLoading,
            error: confirmDocumentError,
            response: confirmDocumentResponse
        },
        confirmDocument
    ] = useAxios(apiSetting.Classification.confirmDocument(), { manual: true });

    const [
        {
            data: allLabelsData,
            loading: allLabelsLoading,
            error: allLabelsError,
            response: allLabelsResponse
        },
        getAllLabels
    ] = useAxios(apiSetting.Label.getAllLabels(), {
        manual: false
    });

    const [
        {
            data: newLabelData,
            loading: newLabelLoading,
            error: newLabelError,
            response: newLabelResponse
        },
        addNewLabel
    ] = useAxios(apiSetting.Label.addNewLabel(), {
        manual: true
    });

    const confirmDocumentFormik = useFormik({
        initialValues: {
            id: null,
            label: null
        },
        onSubmit: async (values) => {
            let res = await confirmDocument({
                data: {
                    ...values
                }
            });
            if (res.data.status === true) {
                alert('Document Confirmed!');
                await getAndPredictLatestUploadedDocument();
            }
        }
    });

    const addNewLabelFormik = useFormik({
        initialValues: {
            name: null
        },
        onSubmit: async (values) => {
            let res = await addNewLabel({
                data: {
                    ...values
                }
            });
            await getAllLabels();
            if (res.data.status) {
                alert('新類型已新增！');
                await getAndPredictLatestUploadedDocument();
            }
        }
    });

    useEffect(() => {
        const fetch = async () => {
            let res = await getAndPredictLatestUploadedDocument();
            console.log(res);
            if (res.data.document === null) {
                alert('沒有文件需要驗證');
                router.push('/classification');
            }
        };
        fetch();
    }, []);
    useEffect(() => {
        console.log(latestPredictionData);
        if (
            latestPredictionData &&
            latestPredictionData.document &&
            latestPredictionData.prediction &&
            latestPredictionData.status == true
        ) {
            confirmDocumentFormik.setFieldValue('id', latestPredictionData.document.id);
            confirmDocumentFormik.setFieldValue('label', latestPredictionData.prediction.id);
        } else if (
            latestPredictionData &&
            latestPredictionData.document === null &&
            latestPredictionData.prediction === null
        ) {
            router.push('/classification');
        }
    }, [latestPredictionData]);
    return (
        <>
            <ValidateView
                {...{
                    latestPredictionData,
                    confirmDocumentFormik,
                    addNewLabelFormik,
                    allLabelsData
                }}
            />
        </>
    );
}

export default ValidateContainer;
