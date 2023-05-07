import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis/index';
import MyModal from '../../../components/common/Widget/MyModal';
import useAlert from '../../../hooks/useAlert';
import UploadView from './UploadView';

const apiSetting = new Api();

function UploadContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [target_folder_id, set_target_folder_id] = useState();
    const [tagId, setTagId] = useState('');
    const [needAutoUpload, setNeedAutoUpload] = useState(false);
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
            console.log('tagId', tagId);
            console.log('needAutoUpload', needAutoUpload);
            if (needAutoUpload) {
                if (tagId) {
                    formData.append('tag_id', tagId);
                } else {
                    setAlert({ title: '請選擇類別', type: 'info' });
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
        setOpen(uploadLoading);
    }, [uploadLoading]);

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
                    set_target_folder_id,
                    setTagId,
                    getAllLabelsData,
                    needAutoUpload,
                    setNeedAutoUpload
                }}
            />
            <MyModal
                visable={visable}
                cancelClick={confirm}
                cancelText={'完成並進行智能分類'}
                confirmClick={nextUpload}
                confirmText={'下一批'}
                success={true}
                description={`已成功上傳  ${documents.length}  份文檔`}
            />
        </>
    );
}

export default UploadContainer;
