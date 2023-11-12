import { FolderIcon } from '@heroicons/react/20/solid';
import copy from 'copy-to-clipboard';
import moment from 'moment';
import Link from 'next/link';
import { encrypt } from '../../../utils/util_crypto';

interface ChatbotRowProps {
    item: {
        chatbot: any;
        folders: any[];
    };
    share?: any;
}

export default function ChatbotRow(props: ChatbotRowProps) {
    const { item, share } = props;
    const { chatbot, folders } = item;

    const copyLink = () => {
        const encryptedText = encrypt(window.localStorage?.getItem('authorization') || '');
        copy(process.env.NEXT_PUBLIC_CHATBOT_URL + `/${chatbot.id}?token=${encryptedText}`);
    };

    return (
        <>
            <tr>
                <td className="w-3/12 py-4  text-sm font-medium text-gray-900 sm:pl-0">
                    <Link href={`/chatbot/${chatbot?.id}`}>
                        <a className="text-indigo-500">{chatbot?.name}</a>
                    </Link>
                </td>
                <td className="w-2/12py-4 text-sm text-gray-500">{chatbot?.description}</td>
                <td className="w-2/12 py-4 text-sm text-gray-500">
                    {folders?.map((folder) => (
                        <div className="flex gap-2 items-center" key={folder.id}>
                            <div>
                                <FolderIcon className="h-5 text-blue-200" />
                            </div>
                            <span>{folder.name}</span>
                        </div>
                    ))}
                </td>
                <td className="w-1/12 py-4 text-sm text-gray-500">
                    {chatbot?.is_public ? '公開' : ''}
                </td>
                <td className="w-2/12 py-4 text-sm text-gray-500">
                    {moment(chatbot?.created_at).format('YYYY-MM-DD HH:ss')}
                </td>
                <td className="w-1/12 py-4 text-sm text-gray-500">
                    {chatbot?.expired_at && moment(chatbot?.expired_at).format('YYYY-MM-DD')}
                </td>
                <td className="w-2/12 py-4 text-right text-sm font-medium sm:pr-0">
                    <label
                        className=" cursor-pointer text-indigo-600 hover:text-indigo-900"
                        onClick={() => {
                            share(chatbot);
                        }}
                    >
                        分享<span className="sr-only">, Lindsay Walton</span>
                    </label>
                    {'  | '}
                    <Link href={`/chatbot/create?id=${chatbot?.id}`}>
                        <a className="text-indigo-600 hover:text-indigo-900">
                            編輯<span className="sr-only">, Lindsay Walton</span>
                        </a>
                    </Link>
                    {/* {' | '}
                    <a
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        onClick={copyLink}
                    >
                        複製連結
                    </a> */}
                </td>
            </tr>
        </>
    );
}
