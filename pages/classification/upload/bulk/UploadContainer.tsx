import { useState, useEffect } from 'react';
import UploadView from './UploadView';
import { useFormik } from 'formik';
import useAxios from 'axios-hooks';
import Api from '../../../../apis/index';
import { useRouter } from 'next/router';

const apiSetting = new Api();

function UploadContainer() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [labels, setLabels] = useState([]);
    const formik = useFormik({
        initialValues: {
            document: [],
            label_id: ''
        },
        validate: (values) => {
            const errors: any = {};
            if (!values.label_id) {
                errors.label_id = 'Required';
                alert('請選擇批量文件的類型！');
            }
            return errors;
        },
        onSubmit: (values) => {
            let formData = new FormData();
            for (const i of documents) {
                formData.append('document[]', i);
            }
            formData.append('label_id', values.label_id);
            uploadBulkWithSameLabel({
                data: formData
            });
            setOpen(true);
        }
    });
    const [{ data: uploadData }, uploadBulkWithSameLabel] = useAxios(
        apiSetting.Storage.uploadBulkWithSameLabel(),
        { manual: true }
    );
    const [{ data: allLabelsData }, getAllLabels] = useAxios(apiSetting.Label.getAllLabels(), {
        manual: false
    });

    useEffect(() => {
        setLabels(allLabelsData);
        console.log(allLabelsData);
        console.log(labels);
    }, [allLabelsData]);

    useEffect(() => {
        if (uploadData && uploadData.status === true) {
            setOpen(false);
            router.push('/classification');
        } else if (uploadData && uploadData.status === false) {
            setOpen(false);
            alert('Upload failed! Please try again!');
        }
    }, [uploadData]);
    return (
        <>
            <UploadView {...{ formik, setDocuments, labels, open, setOpen }} />
        </>
    );
}

export default UploadContainer;
