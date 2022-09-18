import { useState, useEffect } from 'react';
import UploadView from './UploadView';
import { useFormik } from 'formik';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import { useRouter } from 'next/router';
import axios from 'axios';
import MyModal from '../../../components/common/Widget/MyModal';

const apiSetting = new Api();

function UploadContainer() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState([]);
    const formik = useFormik({
        initialValues: {
            document: []
        },
        onSubmit: (values) => {
            const formData = new FormData();
            for (const i of documents) {
                formData.append('document[]', i);
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
            alert('Upload failed! Please try again!');
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
        router.push('/classification/validate');
    };
    return (
        <>
            <UploadView {...{ formik, setDocuments, open, setOpen }} />
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
