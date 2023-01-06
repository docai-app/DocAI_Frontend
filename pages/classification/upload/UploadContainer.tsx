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
            upload({
                data: formData
            });
        }
    });
    const [
        { data: uploadData, loading: uploadLoading, error: uploadError, response: uploadResponse },
        upload
    ] = useAxios(apiSetting.Storage.upload(), { manual: true });
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
            <UploadView {...{ formik, setDocuments, open, setOpen, set_target_folder_id }} />
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
