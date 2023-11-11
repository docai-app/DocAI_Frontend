import { XMarkIcon } from '@heroicons/react/20/solid';
import {
    ArchiveBoxArrowDownIcon, Square2StackIcon,
    TagIcon
} from '@heroicons/react/24/outline';
import _ from 'lodash';
import { useCallback, useState } from 'react';
import { getAllChainFeatureByIdsDatas } from '../../../../apis/AirtableChainFeature';
import ChainFeatureDetail from '../../search/ChainFeatureDetail';
import Dropdowns from '../../search/Dropdowns';
import SelectDataSchemaModal from '../../search/SelectDataSchemaModal';

interface Props {
    label: any;
    document: any;
    updateTag: any;
}

export default function DocumentFunction(props: Props) {
    const { label, document, updateTag } = props;

    const [visibleChainFeature, setVisibleChainFeature] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openIframe, setOpenIframe] = useState(false);
    const [openSelectShema, setOpenSelectShema] = useState(false);
    const [chain_features, set_chain_features] = useState<any>([]);
    const [chain_feature, set_chain_feature] = useState<any>();
    const [content, setContent] = useState('');


    const getChainFeature = useCallback(() => {
        console.log(label);

        if (!_.isEmpty(chain_features)) return;
        // console.log(label.meta.chain_features);
        if (label?.meta?.chain_features) {
            setLoading(true);
            getAllChainFeatureByIdsDatas(label?.meta?.chain_features)
                .then((res) => {
                    console.log(res);
                    set_chain_features(res);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [label, chain_features]);

    return (
        <>
            <div className="flex-0 bg-gray-100 rounded-lg border px-4 py-2 flex flex-col">
                <div className="flex flex-row items-center flex-wrap">
                    <div className="flex flex-row items-center my-1">
                        <label>標籤:</label>
                        {document?.label_list?.map((label: string, index: number) => {
                            return (
                                <button
                                    key={index}
                                    className="border bg-white rounded-md px-4   py-1 mx-2 flex flex-row items-center"

                                >
                                    {label}
                                </button>
                            )
                        })}
                    </div>

                </div>

                <div className="flex flex-1 flex-row">
                    <div className="flex flex-row items-center my-1">
                        <label>功能:</label>
                        {document ? (
                            <>
                                {!visibleChainFeature ? (
                                    <>
                                        <div
                                            className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md mx-2 my-1 cursor-pointer"
                                            onClick={() => {
                                                setOpenSelectShema(true);
                                            }}
                                        >
                                            <Square2StackIcon className="w-4 m-1 " />
                                            <label className="text-sm cursor-pointer">
                                                搬資料到Execl
                                            </label>
                                        </div>
                                        <div
                                            className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md mx-2 my-1 cursor-pointer"
                                            onClick={updateTag}
                                        >
                                            <TagIcon className="w-4 m-1 " />
                                            <label className="text-sm cursor-pointer">
                                                更新標籤
                                            </label>
                                        </div>
                                        {label?.meta?.chain_features &&
                                            <div
                                                className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md cursor-pointer"
                                                onClick={() => {
                                                    setVisibleChainFeature(true);
                                                    getChainFeature();
                                                }}
                                            >
                                                <ArchiveBoxArrowDownIcon className="w-4 m-1 " />
                                                <label className="text-sm cursor-pointer">
                                                    AI推薦功能
                                                </label>
                                            </div>
                                        }
                                    </>
                                ) : (
                                    <div className="flex flex-row items-center flex-wrap">
                                        <div
                                            className="flex flex-row items-center p-1 border mx-2 pr-4 hover:bg-gray-300 rounded-md"
                                            onClick={() => {
                                                setVisibleChainFeature(false);
                                            }}
                                        >
                                            <XMarkIcon className="w-4 mx-2 cursor-pointer" />
                                            <ArchiveBoxArrowDownIcon className="w-4 m-1 " />
                                            <label className="text-sm">AI推薦功能</label>
                                        </div>
                                        {' > '}
                                        <div>
                                            {loading ? (
                                                <label>正在加載中...</label>
                                            ) : (
                                                <div className="flex flex-row items-center flex-wrap my-1">
                                                    {chain_feature == null ? (
                                                        <>
                                                            {chain_features?.map(
                                                                (
                                                                    chain_feature: any,
                                                                    index: number
                                                                ) => {
                                                                    return (
                                                                        <div key={index}>
                                                                            <button
                                                                                className="border rounded-md px-4 py-1 mx-1 my-1 flex flex-row text-white items-center bg-blue-500 hover:bg-blue-600"
                                                                                onClick={() => {
                                                                                    setOpenIframe(
                                                                                        true
                                                                                    );
                                                                                    set_chain_feature(
                                                                                        chain_feature
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {
                                                                                    chain_feature
                                                                                        .fields.name
                                                                                }
                                                                            </button>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div
                                                            className="flex flex-row items-center p-1 border mx-2 pr-4 hover:bg-gray-300 rounded-md"
                                                            onClick={() => {
                                                                set_chain_feature(null);
                                                            }}
                                                        >
                                                            <XMarkIcon className="w-4 mx-2 cursor-pointer" />
                                                            <label className="text-sm">
                                                                {chain_feature?.fields?.name}
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <label className="mx-2 text-sm p-1">請選擇文檔</label>
                            </>
                        )}
                    </div>
                </div>
                {visibleChainFeature && (
                    <div className="flex flex-1 flex-row items-center">
                        <label className="flex-0 flex flex-row items-center">
                            <img src={'../intelligent.png'} className="w-6" />
                            {':'}
                        </label>
                        <div className="w-full flex-1 mx-2 my-1">
                            <textarea
                                className="w-full rounded-md min-h-[150px]"
                                defaultValue={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                            ></textarea>
                        </div>
                        <Dropdowns copyContent={content} />
                    </div>
                )}
                <div className="flex flex-1 flex-row">
                    <div className="flex flex-row items-center my-1 flex-wrap">
                        <label className='flex-0'>總結:</label>
                        <label className='flex-1 mx-2 text-gray-800 text-sm'></label>
                    </div>
                </div>

                <div className="flex flex-1 flex-row">
                    <div className="flex flex-row items-center my-1 flex-wrap">
                        <label className='flex-0'>關鍵詞:</label>
                        <label className='flex-1 mx-2 text-gray-800 text-sm'></label>
                    </div>
                </div>
            </div>
            <ChainFeatureDetail
                open={openIframe}
                setOpen={setOpenIframe}
                chain_feature_id={chain_feature?.id}
                setContent={setContent}
                selectDocument={_.pick(document, ['name', 'content'])}
            />
            <SelectDataSchemaModal
                open={openSelectShema}
                setOpen={setOpenSelectShema}
                document_ids={[document?.id]}
            />
        </>
    );
}
