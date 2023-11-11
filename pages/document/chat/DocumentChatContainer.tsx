import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import DocumentChatView from './DocumentChatView';

const apiSetting = new Api();

export default function DocumentChatContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [formUrl, setFormUrl] = useState('')
    const [data, setData] = useState<any>()
    const [selectedResult, setSelectedResult] = useState<any>()
    const [document, setDocument] = useState<any>()
    const [label, setLabel] = useState<any>();

    const [{ data: getDocumentByIdData }, getDocumentById] = useAxios(
        apiSetting.Document.getDocumentById(''),
        { manual: true }
    );

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: true }
    );

    const [{ data: getLabelByIdData }, getLabelById] = useAxios(apiSetting.Tag.getTagById(''), {
        manual: true
    });

    useEffect(() => {
        if (router.query.document_id) {
            getDocumentById({
                ...apiSetting.Document.getDocumentById(router.query.document_id as string)
            })
            getLabelById({
                ...apiSetting.Tag.getTagById(router.query.tag_id as string)
            });
        }
    }, [router])

    useEffect(() => {
        if (document) {
            setFormUrl(document?.storage_url)
        }
    }, [document])

    useEffect(() => {
        if (getDocumentByIdData && getDocumentByIdData.success) {
            console.log(getDocumentByIdData);
            setDocument(getDocumentByIdData.document)

        }
    }, [getDocumentByIdData])

    useEffect(() => {
        if (getLabelByIdData && getLabelByIdData.success === true) {
            console.log('getLabelByIdData', getLabelByIdData);
            setLabel(getLabelByIdData.tag);
        }
    }, [getLabelByIdData]);

    const confirmDocumentFormik = useFormik({
        initialValues: {
            document_id: null,
            tag_id: ''
        },
        onSubmit: async (values) => {
            // setUpdateTag(true);
            // const res = await updateDocumentTag({
            //     data: {
            //         document_ids: documents_items,
            //         tag_id: values.tag_id
            //     }
            // });
            // setUpdateTag(false);
            // if (res.data.success === true) {
            //     setAlert({ title: '更新成功', type: 'success' });
            //     router.reload();
            // } else {
            //     setAlert({ title: '更新失敗', type: 'error' });
            // }
        }
    });

    return (
        <DocumentChatView
            {...{
                document,
                formUrl,
                data,
                selectedResult,
                getAllLabelsData,
                confirmDocumentFormik,
                label
            }}
        />
    );
}
