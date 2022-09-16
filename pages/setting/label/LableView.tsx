import { useEffect, useState } from 'react';
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
                getAllLabelsData.tags.slice().sort((a, b) => parseInt(a.id) - parseInt(b.id))
            );
    }, [getAllLabelsData]);
    return (
        <div className="min-h-full bg-slate-50">
            {/* <header className="shadow bg-white">
                <div className="flex w-full py-6 px-4 sm:px-6 lg:px-8">
                    <div className="w-full">
                        <h1 className="text-3xl font-bold text-gray-900">標籤管理</h1>
                    </div>
                </div>
            </header> */}
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 py-4 border-b">
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
                    </div>
                    <div className="py-4">
                        {sortedLabels && (
                            <>
                                <div>
                                    <h2 className="text-2xl font-bold">現有標籤名單</h2>
                                    {/* <h2 className="text-2xl font-bold">修改標籤 (Label)</h2>
                                    <div className="text-slate-500">修改現有的標籤的名稱</div> */}
                                </div>
                                <div className="flex flex-col gap-2 mt-4">
                                    {sortedLabels.map((label: any, index: number) =>  <LabelTag key={index} label={label} updateLabelNameByIdHandler={updateLabelNameByIdHandler}/>
                                        // return (
                                        //     <form
                                        //         onSubmit={(e) => {
                                        //             e.preventDefault();
                                        //             const formData = new FormData(e.currentTarget);
                                        //             const newName = formData.get('name');
                                        //             updateLabelNameByIdHandler(label.id, newName);
                                        //         }}
                                        //         key={label.id}
                                        //         className="flex flex-row flex-wrap gap-2 max-w-xl"
                                        //     >
                                        //         <input
                                        //             type="text"
                                        //             name="name"
                                        //             defaultValue={label.name}
                                        //             className="border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 flex-grow focus:ring-2 focus:ring-slate-300"
                                        //             onChange={(e) => {
                                        //                 if (label.name !== e.target.value) {
                                        //                     e.target.classList.toggle(
                                        //                         'bg-yellow-100',
                                        //                         true
                                        //                     );
                                        //                 } else {
                                        //                     e.target.classList.toggle(
                                        //                         'bg-yellow-100',
                                        //                         false
                                        //                     );
                                        //                 }
                                        //             }}
                                        //         />
                                        //         <button
                                        //             className="p-3 bg-indigo-600 hover:bg-indigo-900 leading-none text-white rounded-md"
                                        //             onClick={()=>{
                                        //                 isEdit = false
                                        //             }}
                                        //         >
                                        //             編輯{isEdit+'='}
                                        //         </button>
                                        //         <button
                                        //             className="p-3 bg-indigo-600 hover:bg-indigo-900 leading-none text-white rounded-md"
                                        //             type="submit"
                                        //         >
                                        //             確認
                                        //         </button>
                                        //     </form>
                                        // );
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="py-4">
                        {sortedLabels && (
                            <>
                                <div>
                                    <h2 className="text-2xl font-bold">待查核標籤</h2>
                                </div>
                                <div className="flex flex-col gap-2 mt-4">
                                    {/* {sortedLabels.map((label: any, index: number) =>  <LabelTag key={index} label={label} updateLabelNameByIdHandler={updateLabelNameByIdHandler} unCheck={true}/>
                                    )} */}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
