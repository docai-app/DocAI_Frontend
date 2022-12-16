import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import _ from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../apis/index';
import { Folder } from '../../../components/common/Widget/FolderTree';
import useAlert from '../../../hooks/useAlert';
import ValidateView from './ValidateView';

const apiSetting = new Api();

function ValidateContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [mode, setMode] = useState<'view' | 'move'>('view');
    const [movingDest, setMovingDest] = useState<Folder | null>(null);
    const [documentPath, setDocumentPath] = useState<{ id: string | null; name: string }[]>([
        { id: null, name: 'Root' }
    ]);
    const [documentName, setDocumentName] = useState('');
    const [isChangeName, setIsChangeName] = useState(false);
    const [tagName, setTagName] = useState('');
    const [visable, setVisable] = useState(false);
    const [tagHasFunction, setTagHasFunction] = useState(false);
    const [
        {
            data: latestPredictionData,
            loading: latestPredictionLoading,
            error: latestPredictionError,
            response: latestPredictionResponse
        },
        getAndPredictLatestUploadedDocument
    ] = useAxios(
        router.query.date
            ? apiSetting.Document.getAndPredictByDateUploadedDocument(router.query.date + '')
            : apiSetting.Document.getAndPredictLatestUploadedDocument(),
        {
            manual: true
        }
    );

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

    const [{ data: updateDocumentNameByIdData }, updateDocumentNameById] = useAxios(
        {},
        { manual: true }
    );

    const [{ data: deleteDocumentNameByIdData }, deleteDocumentNameById] = useAxios(
        {},
        { manual: true }
    );

    const [{ data: tagFunctionsData }, getTagFunctions] = useAxios(
        apiSetting.Tag.getTagFunctionsById(''),
        {
            manual: true
        }
    );

    const [{ data: schemasStatusReadyData }, schemasStatusReady] = useAxios(
        apiSetting.Form.schemasStatusReady(),
        {
            manual: true
        }
    );

    const [
        { data: updateFormRecognitionData, loading: updateFormRecognitionLoading },
        updateFormRecognition
    ] = useAxios(apiSetting.Form.updateFormRecognition(), {
        manual: true
    });

    const confirmDocumentFormik = useFormik({
        initialValues: {
            document_id: null,
            tag_id: null
        },
        onSubmit: async (values) => {
            //如果是請假紙但未處理的時候提示
            // setVisable(true)
            const res = await confirmDocument({
                data: {
                    ...values
                }
            });
            if (res.data.success === true) {
                // setAlert({title: 'Document Confirmed!');
                await getAndPredictLatestUploadedDocument();
            }
        }
    });

    const addNewTagFormik = useFormik({
        initialValues: {
            name: null
        },
        onSubmit: async (values) => {
            const res = await addNewTag({
                data: {
                    ...values
                }
            });
            await getAllTags();
            if (res.data.success) {
                setAlert({ title: '新類型已新增！', type: 'success' });
                await getAndPredictLatestUploadedDocument();
            } else if (res.data.success === false) {
                setAlert({ title: '新類型已存在！', type: 'error' });
            }
        }
    });

    const changeDocumentName = () => {
        if (latestPredictionData) {
            const created_at = moment(latestPredictionData.prediction.document.created_at).format(
                'YYYYMMDD'
            );
            const tag = tagName || latestPredictionData.prediction.tag.name;
            const file_type = latestPredictionData.prediction.document.name.match(/.[^.]+$/)[0];
            const newName = tag + '_' + created_at + file_type;
            setDocumentName(newName);
            setIsChangeName(false);

            updateDocumentNameById(
                apiSetting.Document.updateDocumentNameById(
                    latestPredictionData.prediction.document.id,
                    newName
                )
            );
        }
    };

    const recoverDocumentName = () => {
        if (latestPredictionData) {
            setDocumentName(latestPredictionData.prediction.document.name);
            setIsChangeName(false);
        }
    };

    const tagTypes = [
        { id: '1', type: 'a', label: '普通文檔', feature: '查閱' },
        { id: '2', type: 'b', label: '請假紙審批', feature: '查閱,請假紙專屬OCR,審批' },
        { id: '3', type: 'c', label: '非OCR審批', feature: '查閱,審批' }
    ];

    const [newLabelName, setNewLabelName] = useState('');
    const [{ data: addNewLabelData, error: addNewLabelError }, addNewLabel] = useAxios(
        apiSetting.Tag.addNewTag(),
        { manual: true }
    );

    const addNewLabelHandler = useCallback(async () => {
        addNewLabel({ data: { name: newLabelName } });
    }, [addNewLabel, newLabelName]);

    const deleteDocument = () => {
        if (latestPredictionData) {
            console.log(latestPredictionData?.prediction?.document?.id);
            deleteDocumentNameById(
                apiSetting.Document.deleteDocumentById(latestPredictionData.prediction.document.id)
            );
        }
    };

    const onSubmitRecognition = useCallback(
        async (formData: any) => {
            const { azure_form_model_id } = formData;
            updateFormRecognition({
                data: {
                    model_id: azure_form_model_id,
                    id: latestPredictionData?.prediction?.document?.id
                }
            });
        },
        [router, latestPredictionData, updateFormRecognition]
    );

    useEffect(() => {
        if (addNewLabelData && addNewLabelData.success) {
            setAlert({ title: '新增成功', type: 'success' });
            setTagName(newLabelName);
            setNewLabelName('');
            confirmDocumentFormik.setFieldValue('tag_id', addNewLabelData.tag.id);
            getAllTags();
        } else if (addNewLabelData && !addNewLabelData.success) {
            setAlert({
                title: '新增失敗！',
                content: `原因：${addNewLabelData.errors.name[0]}`,
                type: 'error'
            });
        }
    }, [addNewLabelData]);

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
        } else {
            setDocumentPath([{ id: null, name: 'Root' }])
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
        if (updateDocumentNameByIdData?.success) {
            setAlert({ title: '改名成功', type: 'success' });
        }
    }, [updateDocumentNameByIdData]);

    useEffect(() => {
        if (
            latestPredictionData &&
            latestPredictionData.prediction &&
            latestPredictionData.success == true
        ) {
            setDocumentName(latestPredictionData.prediction.document.name);
            setTagName(latestPredictionData.prediction.tag.name);
            setTagHasFunction(
                _.find(latestPredictionData.prediction.tag.functions, {
                    name: 'form_understanding'
                })
            );

            confirmDocumentFormik.setFieldValue(
                'document_id',
                latestPredictionData.prediction.document.id
            );
            confirmDocumentFormik.setFieldValue('tag_id', latestPredictionData.prediction.tag.id);
        } else if (latestPredictionData && latestPredictionData.success === false) {
            setAlert({ title: '沒有文件需要驗證', type: 'info' });
            router.push('/classification/logs');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, latestPredictionData]);

    useEffect(() => {
        if (confirmDocumentFormik.values.tag_id) {
            getTagFunctions({
                ...apiSetting.Tag.getTagFunctionsById(confirmDocumentFormik.values.tag_id)
            });
        }
    }, [confirmDocumentFormik.values.tag_id]);

    useEffect(() => {
        if (tagFunctionsData && tagFunctionsData.functions) {
            // console.log(tagFunctionsData);
            setTagHasFunction(
                _.find(tagFunctionsData.functions, {
                    name: 'form_understanding'
                })
            );
        }
    }, [tagFunctionsData]);

    useEffect(() => {
        if (deleteDocumentNameByIdData?.success) {
            getAndPredictLatestUploadedDocument();
        } else {
            console.log(deleteDocumentNameByIdData);
        }
    }, [deleteDocumentNameByIdData]);

    useEffect(() => {
        if (tagHasFunction) {
            schemasStatusReady();
        }
    }, [tagHasFunction]);

    useEffect(() => {
        if (updateFormRecognitionData) {
            console.log('updateFormRecognitionData: ', updateFormRecognitionData);
            setAlert({ title: '成功處理', type: 'success' });
            router.push({
                pathname: `/form/validate`,
                query: {
                    document_id: latestPredictionData?.prediction?.document?.id,
                    form_url: updateFormRecognitionData?.document?.storage_url,
                    form_id: updateFormRecognitionData?.form_data?.id,
                    form_schema_id: updateFormRecognitionData?.form_data?.form_schema_id,
                    result: JSON.stringify(updateFormRecognitionData?.form_data?.data)
                }
            });
        }
    }, [updateFormRecognitionData]);

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
                    setVisable,
                    documentName,
                    setDocumentName,
                    changeDocumentName,
                    recoverDocumentName,
                    isChangeName,
                    tagName,
                    setTagName,
                    tagTypes,
                    newLabelName,
                    setNewLabelName,
                    addNewLabelHandler,
                    tagHasFunction,
                    deleteDocument,
                    schemasStatusReadyData,
                    onSubmitRecognition,
                    updateFormRecognitionLoading
                }}
            />
        </>
    );
}

export default ValidateContainer;
