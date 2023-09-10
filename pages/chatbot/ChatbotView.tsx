// File Path: pages/chatbot/ChatbotView.tsx

import Link from 'next/link';
import { useState } from 'react';
import MiniappShareQRcodeModal from '../../components/common/Widget/MiniappShareQRcodeModal';
import PaginationView from '../../components/common/Widget/PaginationView';
import ChatbotRow from '../../components/feature/chatbot/ChatbotRow';
import { encrypt } from '../../utils/util_crypto';
import { Chatbot } from './ChatbotContainer';

function ChatbotView(props: { chatbots: Chatbot[]; meta: any }) {
    const { chatbots, meta } = props;
    const [miniappItem, setMiniappItem] = useState<any>();
    const [visable, setVisible] = useState(false);
    const share = (item: any) => {
        const encryptedText = encrypt(window.localStorage?.getItem('authorization') || '');
        const link = process.env.NEXT_PUBLIC_CHATBOT_URL + `/${item.id}?token=${encryptedText}`

        setMiniappItem({
            ...item,
            link: link
        });
        setVisible(true);
    };
    return (
        <div className="mx-auto max-w-7xl">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold leading-6 text-gray-900">智能助手</h1>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Link href={'/chatbot/create'}>
                            <a className=" cursor-pointer block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                新增智能助手
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                        >
                                            助手名稱
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            助手描述
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            來源文件夾
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            是否公開
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            建立日期
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            過期日期
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                        >
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {chatbots?.map((item: any, index: number) => {
                                        return <ChatbotRow key={index} item={item} share={share} />;
                                    })}
                                </tbody>
                            </table>
                            <PaginationView meta={meta} pathname={'/chatbot'} params={null} />
                        </div>
                    </div>
                </div>
            </div>
            <MiniappShareQRcodeModal
                visable={visable}
                title={'掃描QR-code來訪問智能助手'}
                name={miniappItem?.name}
                link={miniappItem?.link}
                cancelClick={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
}

export default ChatbotView;
