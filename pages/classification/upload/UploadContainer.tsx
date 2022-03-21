import { useState, useEffect } from 'react';
import UploadView from './UploadView';
import { useFormik } from 'formik';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import { useRouter } from 'next/router';

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
            setOpen(true);
        }
    });
    const [
        { data: uploadData, loading: uploadLoading, error: uploadError, response: uploadResponse },
        upload
    ] = useAxios(apiSetting.Storage.upload(), { manual: true });
    useEffect(() => {
        if (uploadData && uploadData.status === 'uploaded') {
            setOpen(false);
            router.push('/classification/validate');
        }
    }, [uploadData]);
    return (
        <>
            <UploadView {...{ formik, setDocuments, open, setOpen }} />
        </>
    );
}

export default UploadContainer;
