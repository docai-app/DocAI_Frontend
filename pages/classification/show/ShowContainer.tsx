import { useCallback, useEffect, useState } from 'react';
import ValidateView from './ShowView';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Folder } from '../../../components/common/Widget/FolderTree';
import moment from 'moment';
import useAlert from '../../../hooks/useAlert';

const apiSetting = new Api();

function ShowContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [mode, setMode] = useState<'view' | 'move'>('view');
    const [dest, setDest] = useState<Folder | null>(null);
    const [documentPath, setDocumentPath] = useState<{ id: string | null; name: string }[]>([
        { id: null, name: 'Root' }
    ]);
    const [documentName, setDocumentName] = useState('');
    const [isChangeName, setIsChangeName] = useState(false);
    const [tagName, setTagName] = useState('');
    const [visable, setVisable] = useState(false);
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
            const res = await confirmDocument({
                data: {
                    ...values
                }
            });
            if (res.data.success === true) {
                setAlert({ title: 'Document Confirmed!', type: 'success' });
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
                setAlert({ title: '新類型已存在！', type: 'warning' });
            }
        }
    });

    const changeDocumentName = () => {
        if (latestPredictionData) {
            const created_at = moment(latestPredictionData.prediction.document.created_at).format(
                'YYYYMMDD'
            );
            const tag = latestPredictionData.prediction.tag.name;
            const file_type = latestPredictionData.prediction.document.name.match(/.[^.]+$/)[0];
            const newName = tag + '_' + created_at + file_type;
            setDocumentName(newName);
            setIsChangeName(true);
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
        // addNewLabel({ data: { name: newLabelName } });
        // console.log('newLabelName',newLabelName);
    }, [addNewLabel, newLabelName]);

    useEffect(() => {
        if (addNewLabelData && addNewLabelData.success) {
            setAlert({ title: '新增成功', type: 'success' });
            setTagName(newLabelName);
            setNewLabelName('');
            // confirmDocumentFormik.setFieldValue(
            //     'tag_id',
            //     newLabelName
            // );
        } else if (addNewLabelData && !addNewLabelData.success) {
            setAlert({
                title: `新增失敗！`,
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
        console.log(latestPredictionData);
        if (
            latestPredictionData &&
            latestPredictionData.prediction &&
            latestPredictionData.success == true
        ) {
            setDocumentName(latestPredictionData.prediction.document.name);
            setTagName(latestPredictionData.prediction.tag.name);
            confirmDocumentFormik.setFieldValue(
                'document_id',
                latestPredictionData.prediction.document.id
            );
            confirmDocumentFormik.setFieldValue('tag_id', latestPredictionData.prediction.tag.id);
        } else if (latestPredictionData && latestPredictionData.success === false) {
            setAlert({ title: '沒有文件需要驗證', type: 'info' });
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
                    dest,
                    setDest,
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
                    addNewLabelHandler
                }}
            />
        </>
    );
}

export default ShowContainer;
