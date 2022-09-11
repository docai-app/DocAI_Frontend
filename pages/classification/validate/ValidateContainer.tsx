import { useCallback, useEffect, useState } from 'react';
import ValidateView from './ValidateView';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Folder } from '../../../components/common/Widget/FolderTree';

const apiSetting = new Api();

function ValidateContainer() {
    const router = useRouter();
    const [mode, setMode] = useState<'view' | 'move'>('view');
    const [movingDest, setMovingDest] = useState<Folder | null>(null);
    const [documentPath, setDocumentPath] = useState<{ id: string | null; name: string }[]>([
        { id: null, name: 'Root' }
    ]);
    const [visable, setVisable] = useState(false)
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

    const [{ data: showFolderAncestorsData }, showFolderAncestors] = useAxios({}, { manual: true });
    const [{ data: showFolderByIDData }, showFolderByID] = useAxios({}, { manual: true });

    const confirmDocumentFormik = useFormik({
        initialValues: {
            document_id: null,
            tag_id: null
        },
        onSubmit: async (values) => {
            //如果是請假紙但未處理的時候提示
            // setVisable(true)
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
            if (res.data.success) {
                alert('新類型已新增！');
                await getAndPredictLatestUploadedDocument();
            } else if (res.data.success === false) {
                alert('新類型已存在！');
            }
        }
    });

    useEffect(() => {
        if (router.isReady) {
            getAndPredictLatestUploadedDocument();
        }
    }, [router, getAndPredictLatestUploadedDocument]);

    useEffect(() => {
        if (
            latestPredictionData?.prediction?.document?.id &&
            latestPredictionData?.prediction?.document?.folder_id
        ) {
            showFolderByID(
                apiSetting.Folders.showFolderByID(
                    latestPredictionData.prediction.document.folder_id
                )
            );
        }
    }, [latestPredictionData, showFolderByID]);

    useEffect(() => {
        if (showFolderByIDData?.success) {
            setDocumentPath([
                { id: null, name: 'Root' },
                ...showFolderByIDData.ancestors.slice().reverse(),
                showFolderByIDData.folder
            ]);
        }
    }, [showFolderByIDData]);

    useEffect(() => {
        //console.log(latestPredictionData);
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, latestPredictionData]);
    return (
        <>
            <ValidateView
                {...{
                    latestPredictionData,
                    confirmDocumentFormik,
                    addNewTagFormik,
                    allLabelsData,
                    mode,
                    setMode,
                    movingDest,
                    setMovingDest,
                    documentPath,
                    visable, 
                    setVisable
                }}
            />
        </>
    );
}

export default ValidateContainer;
