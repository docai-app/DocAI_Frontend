import axios from 'axios';
import useAxios from 'axios-hooks';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../apis/index';
import useAlert from '../../hooks/useAlert';
import GenerateView from './GenerateView';

const apiSetting = new Api();

function GenerateContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [document, setDocument] = useState<any>();
    const [documents_items, setDocumentsItems] = useState<any>([]);
    const [generateContent, setGenerateContent] = useState('');
    const [open, setOpen] = useState(false);
    const [logs, setLogs] = useState<any>([]);

    const [{ data: getDocumentByIdData }, getDocumentById] = useAxios(
        '',
        {
            manual: true
        }
    );

    const [{ data: getGenerateData }, getGenerate] = useAxios('', { manual: true });

    useEffect(() => {
        if (router.query.document_ids) {
            setDocumentsItems([])
            console.log("router.query.document_ids", router.query.document_ids);
            router.query.document_ids.toString().split(',').map(async (id) => {
                axios.request(apiSetting.Document.getDocumentById(id)).then((res) => {
                    if (res.data.success) {
                        setDocumentsItems((arr: any) => [...arr, res.data.document])
                    }
                })
            })
        }
    }, [router.query.document_ids]);

    useEffect(() => {
        if (getDocumentByIdData && getDocumentByIdData.success === true) {
            console.log("getDocumentByIdData", getDocumentByIdData);
            setDocumentsItems((arr: any) => [...arr, getDocumentByIdData.document])
        }
    }, [router, getDocumentByIdData]);

    const handleQuery = useCallback(
        async (query: string, format: string, language: string, topic: string, style: string) => {
            // console.log("query", query);
            if (documents_items && documents_items?.length <= 0) {
                setAlert({ title: '請選擇文件', type: 'info' });
                return
            };

            setOpen(true);
            // const res = await getGenerate(
            //     apiSetting.Generate.query(document.id, query, format, language, topic, style)
            // );
            const document_ids = documents_items.map((item: any) => { return item.id })
            const res = await getGenerate(
                apiSetting.Generate.queryByDocuments(document_ids, query, format, language, topic, style)
            );
            setOpen(false);

            if (res.data?.success) {
                const newLog = {
                    content: res.data?.response?.content,
                    format: format,
                    language: language,
                    topic: topic,
                    style: style,
                    created_at: moment().format(),
                    email: localStorage.getItem('email')
                };

                setLogs((arr: any) => [...arr, newLog]);
                setGenerateContent(res.data?.response?.content);
            } else {
                setAlert({ title: '網絡發生錯誤，請稍後再試', type: 'error' });
            }
        },
        [router, documents_items]
    );

    return (
        <>
            <GenerateView
                {...{
                    documents_items,
                    setDocumentsItems,
                    handleQuery,
                    open,
                    setOpen,
                    generateContent,
                    setGenerateContent,
                    setAlert,
                    logs
                }}
            />
        </>
    );
}

export default GenerateContainer;
