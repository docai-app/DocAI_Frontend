import { useRouter } from 'next/router';

export default function ChatbotConversationView() {
    const router = useRouter();
    return (
        <>
            {router.query?.id && (
                <iframe
                    src={`${process.env.NEXT_PUBLIC_CHATBOT_URL}${router.query.id as string}?token=${window.localStorage?.getItem('authorization') || ''}`}
                    className="h-full w-full"
                />
            )}
        </>
    );
}
