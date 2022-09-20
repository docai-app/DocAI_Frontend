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
    const [open, setOpen] = useState(false);
    const [tag, setTag] = useState('')
    useEffect(() => {
        if (getAllLabelsData)
            setSortedLabels(
                getAllLabelsData.tags.slice().sort((a, b) => parseInt(a.id) - parseInt(b.id))
            );
    }, [getAllLabelsData]);
    return (
        <>
            <EditLabel
                {...{ open, setOpen, tag, tagTypes, newLabelName, setNewLabelName, addNewLabelHandler, updateLabelNameByIdHandler}}
            />
       
            <div className="min-h-full bg-slate-50">
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* <div className="flex flex-col gap-4 py-4 border-b">
                            <div>
                                <h2 className="text-2xl font-bold">新增標籤 (Tags)</h2>
                                <div className="text-slate-500">新增一個新的標籤</div>
                            </div>
                            <div className="mx-auto sm:mx-0 flex flex-row gap-2 flex-wrap">
                                <input
                                    type="text"
                                    value={newLabelName}
                                    className="border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300"
                                    onChange={(e) => setNewLabelName(e.target.value)}
                                />
                                <button
                                    className="p-3 bg-green-600 hover:bg-green-700 leading-none text-white rounded-md"
                                    onClick={addNewLabelHandler}
                                >
                                    新增
                                </button>
                            </div>
                        </div> */}
                        <div className="py-4">
                            {sortedLabels && (
                                <>
                                    <div className='flex justify-between border-b-2 pb-2'>
                                        <h2 className="text-2xl font-bold">標籤管理</h2>
                                        <button
                                            className="px-4 py-2 bg-indigo-600  hover:bg-indigo-700 leading-none text-white rounded-md"
                                            onClick={()=> {
                                                setOpen(true)
                                                setTag('')
                                            }}
                                        >
                                            +新增
                                        </button>
                                        {/* <h2 className="text-2xl font-bold">修改標籤 (Label)</h2>
                                        <div className="text-slate-500">修改現有的標籤的名稱</div> */}
                                    </div>
                                    <div className="flex flex-col gap-2 mt-4">
                                        <table className='border-collapse '>
                                            <tbody>
                                                <tr>
                                                    <th>名稱 </th>
                                                    <th>分類類型</th>
                                                    <th>功能</th>
                                                    <th></th>
                                                </tr>
                                                {sortedLabels.map(
                                                    (label: any, index: number) => (
                                                        <LabelTag
                                                            key={index}
                                                            label={label}
                                                            onEdit={(tag: any) => {
                                                                setTag(tag)
                                                                setOpen(true)
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

                        {/* <div className="py-4">
                            {sortedLabels && (
                                <>
                                    <div>
                                        <h2 className="text-2xl font-bold">待查核標籤</h2>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-4">
                                        {sortedLabels.map((label: any, index: number) => (
                                            <LabelTag
                                                key={index}
                                                label={label}
                                                updateLabelNameByIdHandler={updateLabelNameByIdHandler}
                                                unCheck={true}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div> */}
                    </div>
                </main>
            </div>
        </>
    );
}
