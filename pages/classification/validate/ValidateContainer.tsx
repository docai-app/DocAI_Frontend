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
            data: lastestPredictionData,
            loading: lastestPredictionLoading,
            error: lastestPredictionError,
            response: lastestPredictionResponse
        },
        getAndPredictLastestUploadedDocument
    ] = useAxios(apiSetting.Classification.getAndPredictLastestUploadedDocument(), {
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
        manual: false
    });

    const confirmDocumentFormik = useFormik({
        initialValues: {
            id: null,
            label: null
        },
        onSubmit: async (values) => {
            console.log(values);
            let res = await confirmDocument({
                data: {
                    ...values
                }
            });
            console.log(res);
            console.log(confirmDocumentLoading);
            if (res.data.status === 'Confirmed') {
                alert('Document Confirmed!');
                await getAndPredictLastestUploadedDocument();
            }
        }
    });

    const addNewLabelFormik = useFormik({
        initialValues: {
            label: null
        },
        onSubmit: async (values) => {
            console.log(values);
            let res = await confirmDocument({
                data: {
                    ...values
                }
            });
            console.log(res);
            console.log(confirmDocumentLoading);
            if (res.data.status === 'Confirmed') {
                alert('Document Confirmed!');
                await getAndPredictLastestUploadedDocument();
            }
        }
    });

    useEffect(() => {
        const fetch = async () => {
            let res = await getAndPredictLastestUploadedDocument();
            console.log(res.data);
            if (res.data.status === 'null') {
                router.push('/classification');
            }
        };
        fetch();
    }, []);
    useEffect(() => {
        if (lastestPredictionData && !lastestPredictionData.hasOwnProperty('status')) {
            console.log(lastestPredictionData);
            confirmDocumentFormik.setFieldValue('id', lastestPredictionData.document[0]);
            confirmDocumentFormik.setFieldValue('label', lastestPredictionData.prediction[0]);
        } else if (lastestPredictionData && lastestPredictionData.status === 'null') {
            router.push('/classification');
        }
    }, [lastestPredictionData]);
    return (
        <>
            <ValidateView {...{ lastestPredictionData, confirmDocumentFormik, allLabelsData }} />
        </>
    );
}

export default ValidateContainer;
