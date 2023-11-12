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
    const [formUrl, setFormUrl] = useState('');
    const [data, setData] = useState<any>();
    const [selectedResult, setSelectedResult] = useState<any>();
    const [document, setDocument] = useState<any>();
    const [label, setLabel] = useState<any>();
    const [updateTag, setUpdateTag] = useState(false);
    const [pdf_page_details, set_pdf_page_details] = useState<any>([])

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

    const [{ data: updateDocumentTagData }, updateDocumentTag] = useAxios(
        apiSetting.Classification.updateDocumentTag([], ''),
        { manual: true }
    );

    const [{ data: page_detailsData }, page_details] = useAxios(
        apiSetting.Document.page_details(),
        { manual: true }
    );

    useEffect(() => {
        if (router.query.document_id) {
            getDocumentById({
                ...apiSetting.Document.getDocumentById(router.query.document_id as string)
            });
            getAllLabels()
            page_details({
                params: {
                    id: router.query.document_id as string
                }
            })
        }
    }, [router]);

    useEffect(() => {
        if (document) {
            setFormUrl(document?.storage_url);
            if (document.labels && document.labels[0]) {
                getLabelById({
                    ...apiSetting.Tag.getTagById(document.labels[0].id)
                });
            }

        }
    }, [document]);

    useEffect(() => {
        if (getDocumentByIdData && getDocumentByIdData.success) {
            console.log(getDocumentByIdData);
            setDocument(getDocumentByIdData.document);
        }
    }, [getDocumentByIdData]);

    useEffect(() => {
        if (getLabelByIdData && getLabelByIdData.success === true) {
            console.log('getLabelByIdData', getLabelByIdData);
            setLabel(getLabelByIdData.tag);
        }
    }, [getLabelByIdData]);

    useEffect(() => {
        if (page_detailsData && page_detailsData.success) {
            console.log(page_detailsData);
            set_pdf_page_details(page_detailsData.document?.pdf_page_details?.sort((a: any, b: any) =>
                a.page_number > b.page_number ? 1 : -1
            ))
        }
    }, [page_detailsData])

    const confirmDocumentFormik = useFormik({
        initialValues: {
            document_id: null,
            tag_id: ''
        },
        onSubmit: async (values) => {
            setUpdateTag(true);
            const res = await updateDocumentTag({
                data: {
                    document_ids: [document?.id],
                    tag_id: values.tag_id
                }
            });
            setUpdateTag(false);
            if (res.data.success === true) {
                setAlert({ title: '更新成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '更新失敗', type: 'error' });
            }
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
                label,
                updateTag,
                setUpdateTag,
                pdf_page_details
            }}
        />
    );
}
