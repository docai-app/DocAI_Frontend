import { XMarkIcon } from '@heroicons/react/20/solid';
import { ArchiveBoxArrowDownIcon, Square2StackIcon, TagIcon } from '@heroicons/react/24/outline';
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
    pdf_page_details?: [];
}

export default function DocumentFunction(props: Props) {
    const { label, document, updateTag, pdf_page_details } = props;

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
                        <label>文件名稱:</label>
                        <label className='mx-2'>{document?.name}</label>
                    </div>
                </div>
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
                            );
                        })}
                        {document?.label_list && document?.label_list.length == 0 &&
                            <button
                                className="border bg-white rounded-md px-4   py-1 mx-2 flex flex-row items-center"
                            >
                                未分類
                            </button>

                        }
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
                                        {label?.meta?.chain_features && (
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
                                        )}
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
                {pdf_page_details && pdf_page_details.length > 0 &&
                    <div className=' max-h-[200px] overflow-y-auto'>
                        {pdf_page_details?.sort().map((page: any, index) => {
                            return (
                                <div key={index}>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="w-full border-t border-gray-300" />
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="px-3  text-sm text-gray-900">Page: {page?.page_number + 1}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-row">
                                        <div className="flex flex-row items-start my-1 flex-wrap">
                                            <label className="flex-0 w-14 ">總結:</label>
                                            <label className="flex-1 mx-2 text-gray-800 text-sm">{page?.summary}</label>
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-row">
                                        <div className="flex flex-row items-start my-1 flex-wrap ">
                                            <label className="flex-0 w-14 ">關鍵詞:</label>
                                            <label className="flex-1 mx-2 text-gray-800 text-sm"> {page?.keywords}</label>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                }
            </div>
            <ChainFeatureDetail
                open={openIframe}
                setOpen={setOpenIframe}
                chain_feature_id={chain_feature?.id}
                setContent={setContent}
                selectDocument={_.pick(document, ['name', 'content'])}
            />
            {document &&
                <SelectDataSchemaModal
                    open={openSelectShema}
                    setOpen={setOpenSelectShema}
                    document_ids={[document?.id]}
                />
            }
        </>
    );
}
