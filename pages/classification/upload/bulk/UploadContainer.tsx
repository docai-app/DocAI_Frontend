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
                alert('請選擇批量文件的類型！');
            }
            return errors;
        },
        onSubmit: (values) => {
            let formData = new FormData();
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
        console.log(allTagsData);
        console.log(tags);
    }, [allTagsData]);

    useEffect(() => {
        if (uploadData && uploadData.success === true) {
            setOpen(false);
            alert('上傳成功！');
            router.push('/classification');
        } else if (uploadData && uploadData.success === false) {
            setOpen(false);
            alert('Upload failed! Please try again!');
        }
    }, [uploadData]);
    return (
        <>
            <UploadView {...{ formik, setDocuments, tags, open, setOpen }} />
        </>
    );
}

export default UploadContainer;
