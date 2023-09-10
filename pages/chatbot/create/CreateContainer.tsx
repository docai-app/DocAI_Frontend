import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';
import { Folder } from '../../../components/common/Widget/FolderTree';
import CreateView from './CreateView';

const apiSetting = new Api();

function CreateContainer() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [multipleDest, setMultipleDest] = useState<Folder[]>([]);
    const [{ data, loading: submitting, error }, createChatbot] = useAxios({}, { manual: true });
    const [{ data: updateChatboxData, loading: updateing }, updateChatbot] = useAxios(
        {},
        { manual: true }
    );
    const [chain_feature_ids, set_chain_feature_ids] = useState<any>([]);
    const [chatbot, setChatbot] = useState<any>({});
    const [actionContent, setActionContent] = useState('');

    const [{ data: getChatbotData, loading: loading }, getChatbot] = useAxios(
        apiSetting.Chatbot.getChatbotById(router.query.id?.toString() || ''),
        { manual: true }
    );

    useEffect(() => {
        if (router.query.id) {
            setActionContent('正在加載數據');
            getChatbot();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    useEffect(() => {
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        setOpen(updateing);
    }, [updateing]);

    useEffect(() => {
        setOpen(submitting);
    }, [submitting]);

    const handleCreate = useCallback(async () => {
        if (router.query.id) {
            handleUpdate();
        } else {
            setActionContent('正在保存數據');
            const res = await createChatbot(
                apiSetting.Chatbot.createChatbot(
                    chatbot?.name,
                    chatbot?.description,
                    chatbot?.is_public,
                    chatbot?.expired_at,
                    {
                        folder_id: multipleDest.map((f) => f.id)
                    },
                    chain_feature_ids
                )
            );
            if (res.data?.success) router.push('/chatbot');
        }
    }, [router, chatbot, chain_feature_ids, multipleDest]);

    const handleUpdate = useCallback(async () => {
        if (router.query.id) {
            setActionContent('正在保存數據');
            const res = await updateChatbot(
                apiSetting.Chatbot.updateChatbotById(
                    router.query.id?.toString(),
                    chatbot?.name,
                    chatbot?.description,
                    chatbot?.is_public,
                    chatbot?.expired_at,
                    {
                        folder_id: multipleDest.map((f) => f.id)
                    },
                    chain_feature_ids
                )
            );
            if (res.data?.success) router.push('/chatbot');
        }
    }, [router, chatbot, chain_feature_ids, multipleDest]);

    useEffect(() => {
        if (getChatbotData && getChatbotData.success) {
            // console.log(getChatbotData);
            setChatbot(getChatbotData?.chatbot);
            setMultipleDest(getChatbotData?.folders || []);
            set_chain_feature_ids(getChatbotData.chatbot?.meta?.chain_features || []);
        }
    }, [router, getChatbotData]);

    useEffect(() => {
        if (updateChatboxData && updateChatboxData.success) {
            router.push('/chatbot');
            // console.log('updateChatboxData', updateChatboxData);
        }
    }, [updateChatboxData]);

    return (
        <CreateView
            {...{
                chatbot,
                setChatbot,
                multipleDest,
                setMultipleDest,
                handleCreate,
                chain_feature_ids,
                set_chain_feature_ids,
                open,
                setOpen,
                actionContent
            }}
        />
    );
}

export default CreateContainer;
