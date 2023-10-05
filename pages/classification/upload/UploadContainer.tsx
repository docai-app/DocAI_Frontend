import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis/index';
import MyModal from '../../../components/common/Widget/MyModal';
import useAlert from '../../../hooks/useAlert';
import UploadView from './UploadView';

interface UploadContainerProps {
    showUploadSet?: boolean;
    app_function?: string;
    miniapp_tag_id?: string;
    miniapp_form_schema_id?: string;
    miniapp_target_folder_id?: string;
    form_miniapp?: boolean;
}

const apiSetting = new Api();

function UploadContainer(props: UploadContainerProps) {
    const {
        showUploadSet,
        app_function,
        miniapp_tag_id,
        miniapp_form_schema_id,
        miniapp_target_folder_id,
        form_miniapp
    } = props;
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [target_folder_id, set_target_folder_id] = useState(miniapp_target_folder_id);
    const [tagId, setTagId] = useState('');
    const [needAutoUpload, setNeedAutoUpload] = useState(false);
    const [needs_deep_understanding, set_needs_deep_understanding] = useState(false);
    const [needs_approval, set_needs_approval] = useState(false);
    const [form_schema_id, set_form_schema_id] = useState('');
    const formik = useFormik({
        initialValues: {
            document: []
        },
        onSubmit: (values) => {
            const formData = new FormData();
            for (const i of documents) {
                formData.append('document[]', i);
            }
            if (target_folder_id) {
                formData.append('target_folder_id', target_folder_id);
            }

            if ('upload_document' === app_function) {
                if (miniapp_tag_id) formData.append('tag_id', miniapp_tag_id);
                uploadByBatchTag({
                    data: formData
                });
            } else if ('form_understanding' === app_function) {
                if (miniapp_tag_id) formData.append('tag_id', miniapp_tag_id);
                formData.append('needs_deep_understanding', JSON.stringify(true));
                if (miniapp_form_schema_id)
                    formData.append('form_schema_id', miniapp_form_schema_id);
                uploadByBatchTag({
                    data: formData
                });
            } else if (needAutoUpload) {
                formData.append('tag_id', tagId);
                formData.append(
                    'needs_deep_understanding',
                    JSON.stringify(needs_deep_understanding)
                );

                if (needs_deep_understanding) {
                    formData.append('form_schema_id', form_schema_id);
                    formData.append('needs_approval', JSON.stringify(needs_approval));
                }
                if (!tagId) {
                    setAlert({ title: '請選擇類別', type: 'info' });
                    return;
                }
                if (needs_deep_understanding && !form_schema_id) {
                    setAlert({ title: '請選擇表格深度理解的模型', type: 'info' });
                    return;
                }
                uploadByBatchTag({
                    data: formData
                });
            } else {
                upload({
                    data: formData
                });
            }
        }
    });
    const [
        { data: uploadData, loading: uploadLoading, error: uploadError, response: uploadResponse },
        upload
    ] = useAxios(apiSetting.Storage.upload(), { manual: true });

    const [
        {
            data: uploadByBatchTagData,
            loading: uploadByBatchTagLoading,
            error: uploadByBatchTagError,
            response: uploadByBatchTagResponse
        },
        uploadByBatchTag
    ] = useAxios(apiSetting.Storage.uploadByBatchTag(), { manual: true });

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: false }
    );

    const [{ data: schemasStatusReadyData }, schemasStatusReady] = useAxios(
        apiSetting.Form.schemasStatusReady(),
        {
            manual: false
        }
    );

    useEffect(() => {
        if (uploadData && uploadData.success === true) {
            setOpen(false);
            setVisable(true);
            // router.push('/classification/validate');
        } else if (uploadData && uploadData.success === false) {
            setOpen(false);
            setAlert({ title: 'Upload failed! Please try again!', type: 'error' });
        }
    }, [router, uploadData]);

    useEffect(() => {
        if (uploadByBatchTagData && uploadByBatchTagData.success === true) {
            setOpen(false);
            setVisable(true);
            // router.push('/classification/validate');
        } else if (uploadByBatchTagData && uploadByBatchTagData.success === false) {
            setOpen(false);
            setAlert({ title: 'Upload failed! Please try again!', type: 'error' });
        }
    }, [router, uploadByBatchTagData]);

    useEffect(() => {
        setOpen(uploadLoading || uploadByBatchTagLoading);
    }, [uploadLoading, uploadByBatchTagLoading]);

    // useEffect(() => {
    //     console.log(getAllLabelsData);

    // }, [getAllLabelsData]);

    const [visable, setVisable] = useState(false);
    const nextUpload = () => {
        setVisable(false);
        router.reload();
    };
    const confirm = () => {
        setVisable(false);
        router.push('/classification/logs');
    };
    return (
        <>
            <UploadView
                {...{
                    formik,
                    setDocuments,
                    open,
                    setOpen,
                    target_folder_id,
                    set_target_folder_id,
                    setTagId,
                    getAllLabelsData,
                    needAutoUpload,
                    setNeedAutoUpload,
                    needs_deep_understanding,
                    set_needs_deep_understanding,
                    needs_approval,
                    set_needs_approval,
                    form_schema_id,
                    set_form_schema_id,
                    schemasStatusReadyData,
                    showUploadSet,
                    form_miniapp
                }}
            />
            <MyModal
                visable={visable}
                cancelClick={() => {
                    form_miniapp ? nextUpload() : confirm();
                }}
                cancelText={form_miniapp ? '確認' : '完成並進行智能分類'}
                confirmClick={nextUpload}
                confirmText={'下一批'}
                success={true}
                description={`已成功上傳  ${documents.length}  份文檔`}
            />
        </>
    );
}

export default UploadContainer;
