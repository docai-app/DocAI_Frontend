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
    const [generateContent, setGenerateContent] = useState('');
    const [open, setOpen] = useState(false);
    const [logs, setLogs] = useState<any>([]);

    const [{ data: getDocumentByIdData }, getDocumentById] = useAxios(
        apiSetting.Document.getDocumentById(`${router.query.document_id}`),
        {
            manual: false
        }
    );

    const [{ data: getGenerateData }, getGenerate] = useAxios('', { manual: true });

    useEffect(() => {
        if (getDocumentByIdData && getDocumentByIdData.success === true) {
            setDocument(getDocumentByIdData.document);
        }
    }, [router, getDocumentByIdData]);

    const handleQuery = useCallback(
        async (query: string, format: string, language: string, topic: string, style: string) => {
            // console.log("query", query);
            if (!document) return;

            setOpen(true);
            const res = await getGenerate(
                apiSetting.Generate.query(document.id, query, format, language, topic, style)
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
        [router, document]
    );

    return (
        <>
            <GenerateView
                {...{
                    document,
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
