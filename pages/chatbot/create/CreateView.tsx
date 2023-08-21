import { FolderIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import { Dispatch, SetStateAction, useState } from 'react';
import { Folder } from '../../../components/common/Widget/FolderTree';
import FolderTreeForMultipleSelect from '../../../components/common/Widget/FolderTreeForMultipleSelect';
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
        actionContent
    } = props;
    const [folderTreeIsOpen, setFolderTreeIsOpen] = useState(false);
    const [chainFeatureIsOpen, setChainFeatureIsOpen] = useState(false);

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
                    <p className="mt-1 text-sm leading-6 text-gray-600">未有描述</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
