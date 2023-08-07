import Api from '../../apis';
import { useRouter } from 'next/router';
import _ from 'lodash';
import _get from 'lodash/get';
import useAlert from '../../hooks/useAlert';
import ChatbotView from './ChatbotView';
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';

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

    const [
        { data: showAllChatbotsData, loading: showAllChatbotsLoading, error: showAllChatbotsError },
        getAllChatbots
    ] = useAxios({}, { manual: true });

    useEffect(() => {
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
        }
    }, [showAllChatbotsData]);

    return <ChatbotView {...{ chatbots, meta }} />;
}

export default ChatbotContainer;
