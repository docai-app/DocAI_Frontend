import { useState, useEffect } from 'react';
import UploadView from './UploadView';
import { useFormik } from 'formik';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import { useRouter } from 'next/router';
import axios from 'axios';

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
            let formData = new FormData();
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
        axios.defaults.headers.common['authorization'] =
            localStorage.getItem('authorization') || '';
    }, [router]);
    useEffect(() => {
        if (uploadData && uploadData.success === true) {
            setOpen(false);
            router.push('/classification/validate');
        } else if (uploadData && uploadData.success === false) {
            setOpen(false);
            alert('Upload failed! Please try again!');
        }
    }, [router, uploadData]);
    useEffect(() => {
        setOpen(uploadLoading);
    }, [uploadLoading]);
    return (
        <>
            <UploadView {...{ formik, setDocuments, open, setOpen }} />
        </>
    );
}

export default UploadContainer;
