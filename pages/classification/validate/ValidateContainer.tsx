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
        manual: true
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
            name: null
        },
        onSubmit: async (values) => {
            console.log(values);
            let res = await addNewLabel({
                data: {
                    ...values
                }
            });
            console.log(res);
            console.log(confirmDocumentLoading);
            await getAllLabels();
            if (res.data.status) {
                alert('新類型已新增！');
                await getAndPredictLastestUploadedDocument();
            }
        }
    });

    useEffect(() => {
        const fetch = async () => {
            let res = await getAndPredictLastestUploadedDocument();
            if (res.data.document === null) {
                alert('沒有文件需要驗證');
                router.push('/classification');
            }
        };
        fetch();
    }, []);
    useEffect(() => {
        if (lastestPredictionData && lastestPredictionData.status == true) {
            confirmDocumentFormik.setFieldValue('id', lastestPredictionData.document.id);
            confirmDocumentFormik.setFieldValue('label', lastestPredictionData.prediction.id);
        } else if (lastestPredictionData && lastestPredictionData.status === 'null') {
            router.push('/classification');
        }
    }, [lastestPredictionData]);
    return (
        <>
            <ValidateView
                {...{
                    lastestPredictionData,
                    confirmDocumentFormik,
                    addNewLabelFormik,
                    allLabelsData
                }}
            />
        </>
    );
}

export default ValidateContainer;
