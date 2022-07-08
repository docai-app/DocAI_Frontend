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
}
export default function LabelView(props: LabelProps) {
    const { getAllLabelsData, addNewLabelHandler, newLabelName, setNewLabelName } = props;
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 py-4 border-b">
                <div>
                    <h2 className="text-2xl font-bold">新增標籤 (Label)</h2>
                    <div className="text-slate-500">新增一個新的標籤</div>
                </div>
                <div className="mx-auto sm:mx-0">
                    <input
                        type="text"
                        value={newLabelName}
                        className="border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 mr-2"
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
                <div>
                    <h2 className="text-2xl font-bold">修改標籤 (Label)</h2>
                    <div className="text-slate-500">修改現有的標籤的名稱</div>
                </div>
                {getAllLabelsData &&
                    getAllLabelsData.labels.map((label) => {
                        return <div>{label.name}</div>;
                    })}
            </div>
        </div>
    );
}
