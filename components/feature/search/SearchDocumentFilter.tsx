import { XMarkIcon } from '@heroicons/react/20/solid';
import {
    ArchiveBoxArrowDownIcon,
    ChatBubbleBottomCenterTextIcon,
    PaperAirplaneIcon,
    TagIcon
} from '@heroicons/react/24/outline';
import _ from 'lodash';
import Router from 'next/router';
import { useCallback, useState } from 'react';
import { getAllChainFeatureByIdsDatas } from '../../../apis/AirtableChainFeature';
import ChainFeatureDetail from './ChainFeatureDetail';
import Dropdowns from './Dropdowns';

interface Props {
    label: any;
    document: any;
    searchParam: any;
    setSearchParam: any;
    openItems: any;
    updateTag: any;
    count: any;
}

export default function SearchDocumentFilter(props: Props) {
    const { label, document, searchParam, setSearchParam, openItems, updateTag, count } = props;

    const [visibleChainFeature, setVisibleChainFeature] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openIframe, setOpenIframe] = useState(false);
    const [chain_features, set_chain_features] = useState<any>([]);
    const [chain_feature, set_chain_feature] = useState<any>();
    const [content, setContent] = useState('');
    const handleSearch = () => {
        Router.push({ pathname: '/search', query: searchParam });
    };

    const getChainFeature = useCallback(() => {
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
            <div className="flex-0 bg-white rounded-lg border px-4 py-2 flex flex-col">
                <div className="flex flex-row items-center flex-wrap">
                    <div className="flex flex-row items-center my-1">
                        <label>標籤:</label>
                        <button
                            className="border rounded-md pr-4 pl-2 py-1 mx-2 flex flex-row items-center"
                            onClick={() => {
                                Router.push('/');
                            }}
                        >
                            <XMarkIcon className="w-4 mr-2" />
                            {searchParam.label}
                        </button>
                    </div>
                    <div className="flex flex-0 flex-row items-center my-1 mx-2">
                        <label className="flex-0">日期:</label>
                        <div className="flex flex-1 flex-row items-center rounded-lg  border mx-2">
                            <XMarkIcon
                                className="w-4 mx-2 cursor-pointer"
                                onClick={() => {
                                    setSearchParam({
                                        ...searchParam,
                                        from: '',
                                        to: ''
                                    });
                                }}
                            />
                            <input
                                type="date"
                                name="from_date"
                                id="from_date"
                                className=" border-0"
                                placeholder="請選擇起始日期"
                                value={searchParam.from}
                                onChange={(e) => {
                                    setSearchParam({
                                        ...searchParam,
                                        from: e.target.value
                                    });
                                }}
                            />
                            <label className="mx-1">{'-'}</label>
                            <input
                                type="date"
                                name="to_date"
                                id="to_date"
                                className=" border-0 border-none focus:border-none "
                                placeholder="請選擇結束日期"
                                value={searchParam.to}
                                onChange={(e) => {
                                    // setEndDate(e.target.value);
                                    setSearchParam({
                                        ...searchParam,
                                        to: e.target.value
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-1 flex-row items-center my-1">
                        <label className="flex-0">關鍵字:</label>
                        <input
                            type="search"
                            name="content"
                            id="content"
                            className="block flex-1 mx-2 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="輸入文件的關鍵字或文件的相關內容"
                            defaultValue={searchParam.content}
                            onChange={(e) => {
                                setSearchParam({
                                    ...searchParam,
                                    content: e.target.value
                                });
                            }}
                        />
                    </div>
                    <div className="flex flex-0 items-center my-1">
                        <button
                            className="border rounded-md px-4 py-1 mx-2 flex flex-row text-white items-center bg-blue-500 hover:bg-blue-600"
                            onClick={() => {
                                handleSearch();
                            }}
                        >
                            搜尋
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 flex-row">
                    <div className="flex flex-row items-center my-1">
                        <label>功能:</label>
                        {count > 0 ? (
                            <>
                                {!visibleChainFeature ? (
                                    <>
                                        <div
                                            className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md mx-2 my-1"
                                            onClick={openItems}
                                        >
                                            <PaperAirplaneIcon className="w-4 m-1 " />
                                            <label className="text-sm">打開</label>
                                        </div>
                                        <div
                                            className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md mx-2 my-1"
                                            onClick={updateTag}
                                        >
                                            <TagIcon className="w-4 m-1 " />
                                            <label className="text-sm">更新標籤</label>
                                        </div>
                                        <div
                                            className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                                            onClick={() => {
                                                setVisibleChainFeature(true);
                                                getChainFeature();
                                            }}
                                        >
                                            <ArchiveBoxArrowDownIcon className="w-4 m-1 " />
                                            <label className="text-sm">AI推薦功能</label>
                                        </div>
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
                                <label className="mx-2 text-sm">請選擇文檔</label>
                            </>
                        )}
                    </div>
                </div>
                {visibleChainFeature && (
                    <div className="flex flex-1 flex-row">
                        <label className="flex-0">
                            {' '}
                            <ChatBubbleBottomCenterTextIcon className="w-6" />
                        </label>
                        <div className="w-full flex-1 mx-2 my-1">
                            <textarea
                                className="w-full rounded-md min-h-[150px]"
                                defaultValue={content}
                            ></textarea>
                        </div>
                        <Dropdowns copyContent={content} />
                    </div>
                )}
            </div>
            <ChainFeatureDetail
                open={openIframe}
                setOpen={setOpenIframe}
                chain_feature_id={chain_feature?.id}
                setContent={setContent}
                selectDocument={_.pick(document, ['name', 'content'])}
            />
        </>
    );
}
