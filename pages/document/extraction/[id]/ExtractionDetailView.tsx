import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SingleActionModel from '../../../../components/common/Widget/SingleActionModel';
import ChainFeatureSelect from '../../../../components/feature/chatbot/ChainFeatureSelect';
import ChainFeatureList from '../../../../components/feature/document/extraction/ChainFeatureList';
import SchemaList from '../../../../components/feature/document/extraction/SchemasList';

interface ExtractionDetailViewProps {
    open: boolean;
    setOpen: any;
    label: any;
    currentTypeTab: string;
    setCurrentTypeTab: any;
    smart_extraction_schemas: [];
    meta: any;
    chain_features: [];
    updateTagFeatureHandler?: any;
    updateTagNameHandler?: any;
}

function ExtractionDetailView(props: ExtractionDetailViewProps) {
    const {
        open,
        setOpen,
        label,
        currentTypeTab,
        setCurrentTypeTab,
        smart_extraction_schemas,
        meta,
        chain_features,
        updateTagFeatureHandler,
        updateTagNameHandler
    } = props;
    const router = useRouter();

    const [chainFeatureIsOpen, setChainFeatureIsOpen] = useState(false);
    const [chain_feature_ids, set_chain_feature_ids] = useState<any>([]);
    const [name, setName] = useState('')
    const handleSave = (chain_feature_ids: any) => {
        updateTagFeatureHandler(label?.id, chain_feature_ids);
        console.log('chain_feature_ids', chain_feature_ids);
    };

    useEffect(() => {
        if (label) {
            set_chain_feature_ids(label?.meta?.chain_features || []);
            setName(label.name)
        }
    }, [label]);

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
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                編輯標籤
                            </h2>
                        </div>
                    </div>
                    <div className='my-2'>
                        <div className='my-2 flex flex-row items-center'>
                            <label className='flex-0'>名稱:</label>
                            <input
                                className="block flex-1 mx-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={label?.name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                        </div>
                        <div className='flex justify-end'>
                            <button
                                className=" cursor-pointer block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={(e) => {
                                    updateTagNameHandler(label.id, name);
                                }}
                            >
                                保存
                            </button>
                        </div>
                    </div>
                    <div className="flex float-row flex-wrap">
                        <div className="mb-4 border-gray-300 border-b">
                            <ul className="flex flex-row -my-px">
                                <li
                                    onClick={() => setCurrentTypeTab('extraction')}
                                    className={`p-4 cursor-pointer ${currentTypeTab === 'extraction'
                                        ? 'text-indigo-700 border-b-2 border-indigo-700'
                                        : 'text-gray-400'
                                        } font-bold text-sm`}
                                >
                                    標籤填表與數據
                                </li>
                                {/* <li
                                    onClick={() => setCurrentTypeTab('form_filling')}
                                    className={`p-4 cursor-pointer ${
                                        currentTypeTab === 'form_filling' ||
                                        currentTypeTab === 'form_filling'
                                            ? 'text-indigo-700 border-b-2 border-indigo-700'
                                            : 'text-gray-400'
                                    } font-bold text-sm`}
                                >
                                    填表
                                </li> */}
                                <li
                                    onClick={() => setCurrentTypeTab('chain_feature')}
                                    className={`p-4 cursor-pointer ${currentTypeTab === 'chain_feature' ||
                                        currentTypeTab === 'chain_feature'
                                        ? 'text-indigo-700 border-b-2 border-indigo-700'
                                        : 'text-gray-400'
                                        } font-bold text-sm`}
                                >
                                    推薦功能
                                </li>
                            </ul>
                        </div>
                    </div>
                    {currentTypeTab === 'extraction' &&
                        <div className="my-2">
                            <div className="flex justify-end">
                                <Link href={`/document/extraction/${router.query.id}/schema`}>
                                    <a className=" cursor-pointer block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        新增Schema
                                    </a>
                                </Link>
                            </div>
                            <SchemaList
                                label={label}
                                smart_extraction_schemas={smart_extraction_schemas}
                                meta={meta}
                            />
                        </div>
                    }
                    {currentTypeTab === 'chain_feature' &&
                        <div className='my-2'>
                            <div className="flex justify-end">
                                <button
                                    className=" cursor-pointer block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => {
                                        setChainFeatureIsOpen(true)
                                    }}
                                >
                                    新增Chain featrue
                                </button>
                            </div>
                            <ChainFeatureList
                                label={label}
                                chain_features={chain_features}
                                chain_feature_ids={chain_feature_ids}
                                set_chain_feature_ids={set_chain_feature_ids}
                                handleSave={handleSave}
                            />
                        </div>
                    }
                </div>
            </div>
            <ChainFeatureSelect
                chain_features={chain_features}
                isOpen={chainFeatureIsOpen}
                setIsOpen={setChainFeatureIsOpen}
                chain_feature_ids={chain_feature_ids}
                set_chain_feature_ids={set_chain_feature_ids}
                handleSave={handleSave}
            />
        </>
    );
}
export default ExtractionDetailView;
