import _ from 'lodash';
import { useEffect, useState } from 'react';
import EditLabel from '../../../components/feature/setting/label/EditLabel';
import TagView from '../../classification/[tag]/TagView';
import LabelTag from './LabelTag';

interface LabelProps {
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
}
export default function LabelView(props: LabelProps) {
    const {
        getAllLabelsData,
        addNewLabelHandler,
        newLabelName,
        setNewLabelName,
        updateLabelNameByIdHandler,
        tagTypes
    } = props;
    const [sortedLabels, setSortedLabels] = useState<any[]>([]);
    const [sortedUnCheckLabels, setSortedUnCheckLabels] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [tag, setTag] = useState('');
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
            <EditLabel
                {...{
                    open,
                    setOpen,
                    tag,
                    tagTypes,
                    newLabelName,
                    setNewLabelName,
                    addNewLabelHandler,
                    updateLabelNameByIdHandler
                }}
            />

            <div className="min-h-full bg-slate-50">
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="py-0">
                            {sortedLabels && (
                                <>
                                    <div className="flex justify-between border-b-2 pb-2">
                                        <h2 className="text-2xl font-bold">標籤管理</h2>
                                        {/* <button
                                            className="px-4 py-2 bg-indigo-600  hover:bg-indigo-700 leading-none text-white rounded-md"
                                            onClick={() => {
                                                setOpen(true);
                                                setTag('');
                                            }}
                                        >
                                            +新增
                                        </button> */}
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
        </>
    );
}
