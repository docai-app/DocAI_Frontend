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
        getAllTags
    ] = useAxios(apiSetting.Tag.getAllTags(), {
        manual: false
    });

    const [
        {
            data: newLabelData,
            loading: newLabelLoading,
            error: newLabelError,
            response: newLabelResponse
        },
        addNewTag
    ] = useAxios(apiSetting.Tag.addNewTag(), {
        manual: true
    });

    const confirmDocumentFormik = useFormik({
        initialValues: {
            document_id: null,
            tag_id: null
        },
        onSubmit: async (values) => {
            let res = await confirmDocument({
                data: {
                    ...values
                }
            });
            if (res.data.success === true) {
                alert('Document Confirmed!');
                await getAndPredictLatestUploadedDocument();
            }
        }
    });

    const addNewTagFormik = useFormik({
        initialValues: {
            name: null
        },
        onSubmit: async (values) => {
            let res = await addNewTag({
                data: {
                    ...values
                }
            });
            await getAllTags();
            if (res.data.status) {
                alert('新類型已新增！');
                await getAndPredictLatestUploadedDocument();
            }
        }
    });

    useEffect(() => {
        getAndPredictLatestUploadedDocument();
    }, [getAndPredictLatestUploadedDocument]);
    useEffect(() => {
        if (
            latestPredictionData &&
            latestPredictionData.prediction &&
            latestPredictionData.success == true
        ) {
            confirmDocumentFormik.setFieldValue(
                'document_id',
                latestPredictionData.prediction.document.id
            );
            confirmDocumentFormik.setFieldValue('tag_id', latestPredictionData.prediction.tag.id);
        } else if (latestPredictionData && latestPredictionData.success === false) {
            alert('沒有文件需要驗證');
            router.push('/classification');
        }
    }, [router, latestPredictionData, confirmDocumentFormik]);
    return (
        <>
            <ValidateView
                {...{
                    latestPredictionData,
                    confirmDocumentFormik,
                    addNewTagFormik,
                    allLabelsData
                }}
            />
        </>
    );
}

export default ValidateContainer;
