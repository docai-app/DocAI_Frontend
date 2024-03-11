import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import moment from 'moment';
import Router from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Folder } from '../../../components/common/Widget/FolderTree';
import FolderTreeForMultipleSelect from '../../../components/common/Widget/FolderTreeForMultipleSelect';
import HeaderBreadCrumb from '../../../components/common/Widget/HeaderBreadCrumb';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import AI2AnswerView from '../../../components/feature/chatbot/AI2AnswerView';
import AIAnswerView from '../../../components/feature/chatbot/AIAnswerView';
import AIDataView from '../../../components/feature/chatbot/AIDataView';
import ChainFeatureView from '../../../components/feature/chatbot/ChainFeatureView';
import SetFolderView from '../../../components/feature/chatbot/SetFolderView';

interface CreateViewProps {
    chatbot: any;
    setChatbot: any;
    multipleDest: Folder[];
    setMultipleDest: Dispatch<SetStateAction<Folder[]>>;
    handleCreate: any;
    chain_feature_ids?: any;
    set_chain_feature_ids?: any;
    open: boolean;
    setOpen: any;
    actionContent: string;
    chain_features: [];
    assistant_agents_data: any;
    expert_ids: any[];
    setExpert_ids: any;
}

function CreateView(props: CreateViewProps) {
    const {
        chatbot,
        setChatbot,
        multipleDest = [],
        setMultipleDest,
        handleCreate,
        chain_feature_ids,
        set_chain_feature_ids,
        open,
        setOpen,
        actionContent,
        chain_features,
        assistant_agents_data,
        expert_ids,
        setExpert_ids
    } = props;
    const [folderTreeIsOpen, setFolderTreeIsOpen] = useState(false);
    const [assistants, setAssistants] = useState<any>([]);
    const [experts, setExperts] = useState<any>([]);

    useEffect(() => {
        if (assistant_agents_data) {
            setAssistants(
                _.filter(assistant_agents_data?.assistant_agents, function (o) {
                    return o.category == 'assistant';
                })
            );
            setExperts(
                _.filter(assistant_agents_data?.assistant_agents, function (o) {
                    return o.category == 'expert';
                })
            );
        }
    }, [assistant_agents_data, expert_ids]);

    useEffect(() => {
        if (chatbot && assistants && assistants.length > 0) {
            if (!chatbot?.meta?.assistant) {
                setChatbot({
                    ...chatbot,
                    meta: {
                        ...chatbot?.meta,
                        assistant: assistants[0].id
                    }
                });
            }
        }
    }, [assistants, chatbot]);
    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'正在進行...'}
                content={actionContent}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-7xl pb-12 pt-2 px-4">
                    {/* <h2 className="text-2xl font-semibold leading-7 text-gray-900">編輯智能助手</h2> */}
                    <HeaderBreadCrumb
                        title={'編輯智能助手'}
                        back={() => {
                            Router.back();
                        }}
                    />
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">未有描述</p> */}
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                名稱
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    defaultValue={chatbot?.name}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="智能助手名稱"
                                    onChange={(e) => {
                                        setChatbot({
                                            ...chatbot,
                                            name: e.target.value
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                描述
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    defaultValue={chatbot?.description}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="智能助手描述"
                                    onChange={(e) => {
                                        setChatbot({
                                            ...chatbot,
                                            description: e.target.value
                                        });
                                    }}
                                ></textarea>
                            </div>
                        </div>
                        <SetFolderView
                            multipleDest={multipleDest}
                            setMultipleDest={setMultipleDest}
                        />
                        {/* <SetCategoryView chatbot={chatbot} setChatbot={setChatbot} /> */}

                        <div className="col-span-full w-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                功能(必須選一個)
                            </label>
                            <AIAnswerView chatbot={chatbot} setChatbot={setChatbot} />
                            <AIDataView chatbot={chatbot} setChatbot={setChatbot} />
                            <ChainFeatureView
                                {...{
                                    chatbot,
                                    setChatbot,
                                    chain_features,
                                    chain_feature_ids,
                                    set_chain_feature_ids
                                }}
                            />
                            <AI2AnswerView
                                chatbot={chatbot}
                                setChatbot={setChatbot}
                                assistants={assistants}
                                expert_ids={expert_ids}
                                experts={experts}
                                setExpert_ids={setExpert_ids}
                            />
                        </div>

                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                是否公開使用
                            </label>
                            <div className="mt-2">
                                <input
                                    type={'checkbox'}
                                    defaultChecked={chatbot?.is_public}
                                    onClick={() => {
                                        setChatbot({
                                            ...chatbot,
                                            is_public: !chatbot?.is_public
                                        });
                                    }}
                                />
                                公開使用
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                過期日期
                            </label>
                            <div className="mt-2">
                                <input
                                    type={'date'}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={moment(chatbot?.expired_at).format('YYYY-MM-DD')}
                                    onChange={(e) => {
                                        setChatbot({
                                            ...chatbot,
                                            expired_at: e.target.value
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-6 flex justify-end">
                            <button
                                className=" cursor-pointer block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => {
                                    handleCreate();
                                }}
                            >
                                確認
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <FolderTreeForMultipleSelect
                {...{
                    isOpen: folderTreeIsOpen,
                    setIsOpen: setFolderTreeIsOpen,
                    multipleDest,
                    setMultipleDest
                }}
            />
        </>
    );
}
export default CreateView;
