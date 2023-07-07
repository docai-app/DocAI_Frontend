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
    const [modalDescription, setModalDescription] = useState({});
    const [logs, setLogs] = useState<any>([]);

    const [{ data: getCollectionDocumentsData }, getCollectionDocuments] = useAxios(
        apiSetting.Document.getCollectionDocuments(),
        {
            manual: true
        }
    );

    const [{ data: getGenerateData }, getGenerate] = useAxios('', { manual: true });
    const [{ data: uploadGeneratedContentData }, uploadGeneratedContent] = useAxios('', { manual: true });

    useEffect(() => {
        if (router.query.document_ids) {
            setOpen(true);
            setModalDescription({
                title: '加載中......',
                content: '正在加載文件...'
            });
            setDocumentsItems([]);
            getCollectionDocuments({
                params: {
                    ids: router.query.document_ids.toString().split(',')
                }
            });
        }
    }, [router.query.document_ids]);

    useEffect(() => {
        if (getCollectionDocumentsData && getCollectionDocumentsData.success === true) {
            setDocumentsItems(getCollectionDocumentsData.documents);
            setOpen(false);
        } else if (getCollectionDocumentsData && getCollectionDocumentsData.success === false) {
            setAlert({ title: getCollectionDocumentsData.error, type: 'error' });
            setOpen(false);
        }
    }, [router, getCollectionDocumentsData]);

    const handleQuery = useCallback(
        async (query: string, format: string, language: string, topic: string, style: string) => {
            if (documents_items && documents_items?.length <= 0) {
                setAlert({ title: '請選擇文件', type: 'info' });
                return;
            }

            setOpen(true);
            setModalDescription({
                title: '進行中......',
                content: '正在生成內容...'
            });

            const document_ids = documents_items.map((item: any) => {
                return item.id;
            });

            const maxRetry = 2;

            const tryQuery: any = async (retryCount = 0) => {
                try {
                    const res = await getGenerate(
                        apiSetting.Generate.queryByDocuments(
                            document_ids,
                            query,
                            format,
                            language,
                            topic,
                            style
                        )
                    );
                    return res;
                } catch (error) {
                    if (retryCount >= maxRetry) throw error;
                    return tryQuery(retryCount + 1);
                }
            };

            try {
                const res = await tryQuery();
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
            } catch (error) {
                setOpen(false);
                setAlert({ title: '網絡發生錯誤，請稍後再試', type: 'error' });
            }
        },
        [router, documents_items]
    );


    const handleUploadGeneratedData = useCallback(
        async (data: any) => {
            console.log(data);
            setOpen(true);
            setModalDescription({
                title: '進行中......',
                content: '正在儲存內容...'
            });
            const formData = new FormData();
            formData.append('filename', data.filename);
            formData.append('target_folder_id', data.target_folder_id);
            formData.append('content', data.content);
            const res = await uploadGeneratedContent(
                apiSetting.Storage.uploadGeneratedContent(
                    data.filename,
                    data.target_folder_id,
                    data.content
                ))
            if (res.data?.success) {
                setAlert({ title: '儲存成功', type: 'success' });
            } else {
                setAlert({ title: res.data?.error, type: 'error' });
            }
            setOpen(false);


        }, [router]
    )
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
                    logs,
                    modalDescription,
                    handleUploadGeneratedData
                }}
            />
        </>
    );
}

export default GenerateContainer;
