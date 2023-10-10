import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import ChainFeatureSelect from '../../../components/feature/chatbot/ChainFeatureSelect';
import EditLabel from '../../../components/feature/setting/label/EditLabel';
import LabelTag from './LabelTag';

interface LabelProps {
    loading: boolean;
    addNewLabelHandler: any;
    addNewLabelData: any;
    getAllLabelsData: {
        tags: {
            id: string;
            name: string;
            taggings_count: number;
            updated_at: string;
            created_at: string;
        }[];
    };
    setNewLabelName: any;
    newLabelName: string;
    updateLabelNameByIdHandler: any;
    tagTypes: any;
    updateTagFunctionsHandler: any;
    deleteTagFunctionsHandler: any;
    updateTagFeatureHandler: any;
}
export default function LabelView(props: LabelProps) {
    const {
        loading,
        getAllLabelsData,
        addNewLabelHandler,
        newLabelName,
        setNewLabelName,
        updateLabelNameByIdHandler,
        tagTypes,
        updateTagFunctionsHandler,
        deleteTagFunctionsHandler,
        updateTagFeatureHandler
    } = props;
    const [sortedLabels, setSortedLabels] = useState<any[]>([]);
    const [sortedUnCheckLabels, setSortedUnCheckLabels] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [tag, setTag] = useState('');

    const [label, setLabel] = useState<any>();
    const [chainFeatureIsOpen, setChainFeatureIsOpen] = useState(false);
    const [chain_feature_ids, set_chain_feature_ids] = useState<any>([]);
    const handleSave = (chain_feature_ids: any) => {
        updateTagFeatureHandler(label?.id, chain_feature_ids);
    };

    useEffect(() => {
        if (label) {
            set_chain_feature_ids(label?.meta?.chain_features || []);
        }
    }, [label]);

    useEffect(() => {
        if (getAllLabelsData) {
            setSortedLabels(
                _.filter(getAllLabelsData.tags, function (o: any) {
                    return o.is_checked;
                })
            );

            setSortedUnCheckLabels(
                _.filter(getAllLabelsData.tags, function (o: any) {
                    return !o.is_checked;
                })
            );
        }
    }, [getAllLabelsData]);
    return (
        <>
            <SingleActionModel
                open={loading}
                setOpen={() => { }}
                title={'進行中......'}
                content={'正在加载数据...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />

            <EditLabel
                {...{
                    open,
                    setOpen,
                    tag,
                    tagTypes,
                    newLabelName,
                    setNewLabelName,
                    addNewLabelHandler,
                    updateLabelNameByIdHandler,
                    updateTagFunctionsHandler,
                    deleteTagFunctionsHandler
                }}
            />

            <div className="min-h-full  ">
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="py-0">
                            {sortedLabels && (
                                <>
                                    <div className="flex items-center justify-between mb-4  ">
                                        <label
                                            className=" px-4 py-2 rounded-md cursor-pointer text-indigo-500"
                                            onClick={() => {
                                                Router.back();
                                            }}
                                        >
                                            {'<'} 返回
                                        </label>
                                        <label className="text-2xl font-bold">標籤管理</label>
                                        <label className="text-xl font-bold">{''}</label>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-4">
                                        <table className="border-collapse ">
                                            <tbody>
                                                <tr>
                                                    <th className="text-left p-4">名稱 </th>
                                                    {/* <th className="text-left">分類類型</th> */}
                                                    <th className="text-left">功能</th>
                                                    <th className="text-left"></th>
                                                </tr>
                                                {sortedLabels.map((label: any, index: number) => (
                                                    <LabelTag
                                                        key={index}
                                                        label={label}
                                                        onEdit={(tag: any) => {
                                                            setTag(tag);
                                                            setOpen(true);
                                                        }}
                                                        updateLabelNameByIdHandler={
                                                            updateLabelNameByIdHandler
                                                        }
                                                        setLabel={(label: any) => {
                                                            setLabel(label);
                                                            setChainFeatureIsOpen(true);
                                                        }}
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="py-4">
                            {sortedUnCheckLabels && (
                                <>
                                    <div>
                                        <h2 className="text-2xl font-bold">待查核標籤</h2>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-4">
                                        <table className="border-collapse ">
                                            <tbody>
                                                <tr>
                                                    <th className="text-left p-4">名稱 </th>
                                                    {/* <th className="text-left">分類類型</th> */}
                                                    <th className="text-left">功能</th>
                                                    <th className="text-left"></th>
                                                </tr>
                                                {sortedUnCheckLabels.map(
                                                    (label: any, index: number) => (
                                                        <LabelTag
                                                            key={index}
                                                            label={label}
                                                            onEdit={(tag: any) => {
                                                                setTag(tag);
                                                                setOpen(true);
                                                            }}
                                                            updateLabelNameByIdHandler={
                                                                updateLabelNameByIdHandler
                                                            }
                                                        />
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <ChainFeatureSelect
                {...{
                    chain_features: [],
                    isOpen: chainFeatureIsOpen,
                    setIsOpen: setChainFeatureIsOpen,
                    chain_feature_ids,
                    set_chain_feature_ids,
                    handleSave
                }}
            />
        </>
    );
}
