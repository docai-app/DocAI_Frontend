import { useEffect, useState } from 'react';

interface LabelProps {
    addNewLabelHandler: any;
    addNewLabelData: any;
    getAllLabelsData: {
        labels: {
            created_at: string;
            id: string;
            name: string;
            updated_at: string;
        }[];
    };
    setNewLabelName: any;
    newLabelName: string;
    updateLabelNameByIdHandler: any;
}
export default function LabelView(props: LabelProps) {
    const {
        getAllLabelsData,
        addNewLabelHandler,
        newLabelName,
        setNewLabelName,
        updateLabelNameByIdHandler
    } = props;
    const [sortedLabels, setSortedLabels] = useState<any[]>([]);
    useEffect(() => {
        if (getAllLabelsData)
            setSortedLabels(
                getAllLabelsData.labels.slice().sort((a, b) => parseInt(a.id) - parseInt(b.id))
            );
    }, [getAllLabelsData]);
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 py-4 border-b">
                <div>
                    <h2 className="text-2xl font-bold">新增標籤 (Label)</h2>
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
                        className="p-3 bg-indigo-600 leading-none text-white rounded-md"
                        onClick={addNewLabelHandler}
                    >
                        新增
                    </button>
                </div>
            </div>
            <div className="py-4">
                {sortedLabels && (
                    <>
                        <div>
                            <h2 className="text-2xl font-bold">修改標籤 (Label)</h2>
                            <div className="text-slate-500">修改現有的標籤的名稱</div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            {sortedLabels.map((label) => {
                                return (
                                    <div>
                                        <input
                                            type="text"
                                            defaultValue={label.name}
                                            className="border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 mr-2 w-96"
                                            onBlur={(e) => {
                                                if (e.target.value !== label.name) {
                                                    updateLabelNameByIdHandler(
                                                        label.id,
                                                        e.target.value
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
