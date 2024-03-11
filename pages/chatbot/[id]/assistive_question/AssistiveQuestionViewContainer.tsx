import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../../apis';
import useAlert from '../../../../hooks/useAlert';
import AssistiveQuestionView from './AssistiveQuestionView';
const apiSetting = new Api();
export default function AssistiveQuestionViewContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);
    const [actionContent, setActionContent] = useState('');
    const [chatbot, setChatbot] = useState<any>({});
    const [assistive_questions, set_assistive_questions] = useState<any>([]);

    const [{ data: getChatbotData, loading: loading }, getChatbot] = useAxios(
        apiSetting.Chatbot.getChatbotById(router.query.id?.toString() || ''),
        { manual: true }
    );
    const [
        { data: updateChatbotAssistiveQuestionsByIdData, loading: updateing },
        updateChatbotAssistiveQuestionsById
    ] = useAxios(
        apiSetting.Chatbot.updateChatbotAssistiveQuestionsById(router.query.id?.toString() || ''),
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
        if (getChatbotData && getChatbotData.success) {
            // console.log(getChatbotData);
            setChatbot(getChatbotData.chatbot);
            set_assistive_questions(getChatbotData.chatbot?.assistive_questions || []);
        }
    }, [router, getChatbotData]);

    const handleUpdate = () => {
        setOpen(true);
        setActionContent('正在保存數據');
        console.log(assistive_questions);

        updateChatbotAssistiveQuestionsById({
            data: {
                assistive_questions: assistive_questions
            }
        });
    };

    useEffect(() => {
        if (
            updateChatbotAssistiveQuestionsByIdData &&
            updateChatbotAssistiveQuestionsByIdData.success
        ) {
            setAlert({ title: '保存成功', type: 'success' });
            router.push('/chatbot');
            setOpen(false);
            // console.log('updateChatboxData', updateChatboxData);
        }
    }, [updateChatbotAssistiveQuestionsByIdData]);

    return (
        <AssistiveQuestionView
            {...{
                chatbot,
                open,
                setOpen,
                actionContent,
                assistive_questions,
                set_assistive_questions,
                handleUpdate
            }}
        />
    );
}
