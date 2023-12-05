import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../apis';
import useAlert from '../../hooks/useAlert';
import ChatbotView from './ChatbotView';

const apiSetting = new Api();

export interface Chatbot {
    id: string;
    name: string;
    description: string;
    user_id: string;
    category: string;
    meta: any;
    source: {
        folder_id: string[];
    };
    created_at: string;
    updated_at: string;
}

function ChatbotContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();

    const [page, setPage] = useState(1);
    const [chatbots, setChatbots] = useState<Chatbot[]>([]);
    const [meta, setMeta] = useState<any>();
    const [open, setOpen] = useState(false);

    const [
        { data: showAllChatbotsData, loading: showAllChatbotsLoading, error: showAllChatbotsError },
        getAllChatbots
    ] = useAxios({}, { manual: true });

    const [
        { data: deleteChatbotByIdData },
        deleteChatbotById
    ] = useAxios(apiSetting.Chatbot.deleteChatbotById(''), { manual: true });

    useEffect(() => {
        setOpen(true);
        getAllChatbots(apiSetting.Chatbot.showAllChatbots(page));
    }, [page]);

    useEffect(() => {
        if (router.query.page) {
            setPage(parseInt(router.query.page.toString()) || 1);
        }
    }, [router.query.page]);

    useEffect(() => {
        if (showAllChatbotsData?.success) {
            setChatbots(showAllChatbotsData.chatbots);
            setMeta(showAllChatbotsData.meta);
            setOpen(false);
        } else if (showAllChatbotsData && !showAllChatbotsData?.success) {
            setAlert({ title: showAllChatbotsData.error, type: 'error' });
            setOpen(false);
        }
    }, [showAllChatbotsData]);

    useEffect(() => {
        if (deleteChatbotByIdData && deleteChatbotByIdData.success) {
            setAlert({ title: "删除成功!", type: 'success' });
            setOpen(false)
            router.reload()
        } else if (deleteChatbotByIdData && !deleteChatbotByIdData.success) {
            setOpen(false)
            setAlert({ title: deleteChatbotByIdData.error, type: 'error' });
        }
    }, [deleteChatbotByIdData])

    const handleDeleteChatbot = (chatbot_id: string) => {
        // console.log('chatbot_id', chatbot_id);
        setOpen(true)
        deleteChatbotById({
            ...apiSetting.Chatbot.deleteChatbotById(chatbot_id)
        })
    }

    return (
        <ChatbotView
            {...{
                chatbots,
                meta,
                open,
                setOpen,
                handleDeleteChatbot
            }} />
    )
}

export default ChatbotContainer;
