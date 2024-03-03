import { FolderIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import moment from 'moment';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Folder } from '../../../components/common/Widget/FolderTree';
import FolderTreeForMultipleSelect from '../../../components/common/Widget/FolderTreeForMultipleSelect';
import SelectDropdown from '../../../components/common/Widget/SelectDropdown';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import ChainFeatureSelect from '../../../components/feature/chatbot/ChainFeatureSelect';

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
    const [chainFeatureIsOpen, setChainFeatureIsOpen] = useState(false);
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
                <div className="mx-auto max-w-7xl pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">編輯智能助手</h2>
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
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Chain Feature
                            </label>
                            <div className="flex justify-between p-3 mt-2 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <div className="flex flex-wrap gap-2 ">
                                    <label>
                                        已選擇 {chain_feature_ids?.length} 個Chain Feature
                                    </label>
                                </div>
                                <button
                                    onClick={() => setChainFeatureIsOpen(!chainFeatureIsOpen)}
                                    className="text-sm hover:underline text-indigo-600 whitespace-nowrap"
                                >
                                    選擇Chain Feature
                                </button>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                來源文件夾
                            </label>
                            <div className="flex justify-between p-3 mt-2 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <div className="flex flex-wrap gap-2 ">
                                    {multipleDest.length > 0 ? (
                                        multipleDest.map((dest) => (
                                            <div
                                                key={dest.id}
                                                className="p-2 pl-3 rounded-md flex items-center gap-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 relative"
                                            >
                                                <FolderIcon className="h-5 text-gray-400" />
                                                <span>{dest.name}</span>
                                                <button
                                                    className="cursor-pointer text-red-300 hover:text-red-600"
                                                    onClick={() =>
                                                        setMultipleDest((prev) =>
                                                            _.filter(prev, (d) => d.id !== dest.id)
                                                        )
                                                    }
                                                >
                                                    <XMarkIcon className="h-5" />
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-gray-400">未選取任何文件夾</div>
                                    )}
                                </div>
                                <button
                                    onClick={() => setFolderTreeIsOpen(!folderTreeIsOpen)}
                                    className="text-sm hover:underline text-indigo-600 whitespace-nowrap"
                                >
                                    選擇多個文件夾
                                </button>
                            </div>
                            {/* <DocumentPath
                                modeType={'move'}
                                target_folder_id={target_folder_id}
                                set_target_folder_id={set_target_folder_id}
                            /> */}
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                助手
                            </label>
                            <div className="mt-2 w-full">
                                {assistants?.map((item: any, index: number) => {
                                    return (
                                        <div key={index}>
                                            <input
                                                type={'radio'}
                                                name="assistant"
                                                className="mr-2"
                                                value={item.id}
                                                checked={item.id == chatbot?.meta?.assistant}
                                                onChange={(e) => {
                                                    setChatbot({
                                                        ...chatbot,
                                                        meta: {
                                                            ...chatbot?.meta,
                                                            assistant: item.id
                                                        }
                                                    });
                                                }}
                                            />
                                            {item.name}
                                            <span className="text-xs text-gray-500">
                                                ({item.description})
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                專家
                            </label>
                            <div className="mt-2 w-full">
                                {experts?.map((item: any, index: number) => {
                                    return (
                                        <div key={index}>
                                            <input
                                                type={'checkbox'}
                                                name="expert"
                                                className="mr-2"
                                                value={item.id}
                                                checked={
                                                    expert_ids && expert_ids?.indexOf(item.id) != -1
                                                }
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setExpert_ids((arr: any) => [
                                                            ...arr,
                                                            item.id
                                                        ]);
                                                    } else {
                                                        const ids = _.remove(
                                                            expert_ids,
                                                            function (x) {
                                                                return x !== item.id;
                                                            }
                                                        );
                                                        setExpert_ids(ids);
                                                    }
                                                }}
                                            />
                                            {item.name}
                                            <span className="text-xs text-gray-500">
                                                ({item.description})
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                類型
                            </label>
                            <div className="mt-2 w-full">
                                <SelectDropdown
                                    defaultValue={chatbot?.category || 'qa'}
                                    onChange={(value: any) => {
                                        setChatbot({
                                            ...chatbot,
                                            category: value
                                        });
                                    }}
                                    options={[
                                        {
                                            name: '問答',
                                            value: 'qa'
                                        },
                                        {
                                            name: '圖表',
                                            value: 'chart_generation'
                                        },
                                        {
                                            name: '統計',
                                            value: 'statistical_generation'
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                語言
                            </label>
                            <div className="mt-2 w-full">
                                <SelectDropdown
                                    defaultValue={chatbot?.meta?.language || '繁體中文'}
                                    onChange={(value: any) => {
                                        setChatbot({
                                            ...chatbot,
                                            meta: {
                                                ...chatbot?.meta,
                                                language: value
                                            }
                                        });
                                    }}
                                    options={[
                                        {
                                            name: '繁體中文',
                                            value: '繁體中文'
                                        },
                                        {
                                            name: '简体中文',
                                            value: '简体中文'
                                        },
                                        {
                                            name: '英文',
                                            value: '英文'
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                語氣
                            </label>
                            <div className="mt-2 w-full">
                                <SelectDropdown
                                    defaultValue={chatbot?.meta?.tone || '正常'}
                                    onChange={(value: any) => {
                                        setChatbot({
                                            ...chatbot,
                                            meta: {
                                                ...chatbot?.meta,
                                                tone: value
                                            }
                                        });
                                    }}
                                    options={[
                                        {
                                            name: '正常',
                                            value: '正常'
                                        },
                                        {
                                            name: '輕鬆',
                                            value: '輕鬆'
                                        },
                                        {
                                            name: '專業',
                                            value: '專業'
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                回答長度
                            </label>
                            <div className="mt-2 w-full">
                                <SelectDropdown
                                    defaultValue={chatbot?.meta?.length || '正常'}
                                    onChange={(value: any) => {
                                        setChatbot({
                                            ...chatbot,
                                            meta: {
                                                ...chatbot?.meta,
                                                length: value
                                            }
                                        });
                                    }}
                                    options={[
                                        {
                                            name: '正常',
                                            value: 'normal'
                                        },
                                        {
                                            name: '簡短的',
                                            value: 'brief'
                                        },
                                        {
                                            name: '詳細的',
                                            value: 'detailed'
                                        }
                                    ]}
                                />
                            </div>
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
            <ChainFeatureSelect
                {...{
                    chain_features: chain_features,
                    isOpen: chainFeatureIsOpen,
                    setIsOpen: setChainFeatureIsOpen,
                    chain_feature_ids,
                    set_chain_feature_ids
                }}
            />
        </>
    );
}
export default CreateView;
