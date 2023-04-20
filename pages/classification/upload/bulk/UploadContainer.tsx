import { useState, useEffect } from 'react';
import UploadView from './UploadView';
import { useFormik } from 'formik';
import useAxios from 'axios-hooks';
import Api from '../../../../apis/index';
import { useRouter } from 'next/router';
import axios from 'axios';
import useAlert from '../../../../hooks/useAlert';

const apiSetting = new Api();

function UploadContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [tags, setTags] = useState([]);
    const formik = useFormik({
        initialValues: {
            document: [],
            tag_id: ''
        },
        validate: (values) => {
            const errors: any = {};
            if (!values.tag_id) {
                errors.tag_id = 'Required';
                setAlert({ title: '請選擇文件的類型！', type: 'warning' });
            }
            return errors;
        },
        onSubmit: (values) => {
            const formData = new FormData();
            for (const i of documents) {
                formData.append('document[]', i);
            }
            formData.append('tag_id', values.tag_id);
            uploadBulkWithSameTag({
                data: formData
            });
            setOpen(true);
        }
    });
    const [{ data: uploadData }, uploadBulkWithSameTag] = useAxios(
        apiSetting.Storage.uploadBulkWithSameTag(),
        { manual: true }
    );
    const [{ data: allTagsData }, getAllTags] = useAxios(apiSetting.Tag.getAllTags(), {
        manual: false
    });

    useEffect(() => {
        setTags(allTagsData);
    }, [allTagsData]);

    useEffect(() => {
        if (uploadData && uploadData.success === true) {
            setOpen(false);
            setAlert({ title: '上傳成功！', type: 'success' });
            router.push('/classification');
        } else if (uploadData && uploadData.success === false) {
            setOpen(false);
            setAlert({ title: 'Upload failed! Please try again!', type: 'error' });
        }
    }, [router, uploadData]);
    return (
        <>
            <UploadView {...{ formik, setDocuments, tags, open, setOpen }} />
        </>
    );
}

export default UploadContainer;
