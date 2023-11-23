// File Path: pages/chatbot/ChatbotView.tsx

import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import useAxios from 'axios-hooks';
import Router from 'next/router';
import { useState } from 'react';
import Api from '../../apis';
import HeaderBreadCrumb from '../../components/common/Widget/HeaderBreadCrumb';
import MiniappShareQRcodeModal from '../../components/common/Widget/MiniappShareQRcodeModal';
import PaginationView from '../../components/common/Widget/PaginationView';
import SingleActionModel from '../../components/common/Widget/SingleActionModel';
import ChatbotRow from '../../components/feature/chatbot/ChatbotRow';
import { encrypt } from '../../utils/util_crypto';
import { Chatbot } from './ChatbotContainer';

const apiSetting = new Api();

function ChatbotView(props: { chatbots: Chatbot[]; meta: any; open: boolean; setOpen: any }) {
    const { chatbots, meta, open, setOpen } = props;
    const [miniappItem, setMiniappItem] = useState<any>();
    const [visable, setVisible] = useState(false);
    const [openShareLoad, setOpenShareLoad] = useState(false);

    const [{ data: getShareSignatureData, loading: getShareSignatureLoading }, getShareSignature] =
        useAxios({}, { manual: true });

    const share = (item: any) => {
        setOpenShareLoad(true);
        getShareSignature({
            ...apiSetting.Chatbot.getShareSignature(item.id)
        }).then((res) => {
            if (res.data.success) {
                const decodedKey = atob(res.data.signature);
                // console.log(decodedKey)
                const encryptedText = encrypt(decodedKey);
                const link =
                    process.env.NEXT_PUBLIC_CHATBOT_URL + `${item.id}?token_key=${encryptedText}`;
                // console.log(encryptedText)
                setMiniappItem({
                    ...item,
                    link: link
                });
                setVisible(true);
            }
            setOpenShareLoad(false);
        });
    };
    return (
        <>
            <SingleActionModel
                {...{
                    open,
                    setOpen,
                    title: '正在進行中...',
                    content: '正在加載數據',
                    icon: (
                        <PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    )
                }}
            />

            <SingleActionModel
                {...{
                    open: openShareLoad,
                    setOpen: setOpenShareLoad,
                    title: '正在進行中...',
                    content: '正在獲取分享連結',
                    icon: (
                        <PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    )
                }}
            />

            <div className="mx-auto max-w-7xl">
                <div className="px-4 sm:px-6 lg:px-8">
                    <HeaderBreadCrumb
                        title={'智能助手'}
                        saveTitle={'新增智能助手'}
                        save={() => {
                            Router.push('/chatbot/create');
                        }}
                    />
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 w-3/12 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                            >
                                                助手名稱
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-2/12 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                助手描述
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-2/12 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                來源文件夾
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-1/12 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                是否公開
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-2/12 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                建立日期
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-1/12 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                過期日期
                                            </th>
                                            <th
                                                scope="col"
                                                className="relative py-3.5 w-2/12 sm:pr-0"
                                            >
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {chatbots?.map((item: any, index: number) => {
                                            return (
                                                <ChatbotRow key={index} item={item} share={share} />
                                            );
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
        </>
    );
}

export default ChatbotView;
