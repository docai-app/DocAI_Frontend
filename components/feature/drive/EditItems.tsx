import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import { TrashIcon, XIcon } from '@heroicons/react/solid';

interface EditItemsProps {
    moveItems?: any;
    deleteItems?: any;
    clearItems?: any;
    count: number;
}

export default function EditItems(props: EditItemsProps) {
    const { moveItems, deleteItems, clearItems, count } = props;
    return (
        <>
            {count > 0 &&
                <div className="flex justify-between items-center fixed w-full sm:w-full mx-auto lg:w-9/12 z-50  px-4 py-1 sm:px-6 lg:px-8  bg-white shadow-md rounded-lg">
                    <div className="flex flex-1 flex-row">
                        <div className="flex-row items-center p-1 hover:bg-gray-300 rounded-md hidden" onClick={deleteItems}>
                            <TrashIcon className="w-4 m-1  " /><label className="text-sm">刪除</label>
                        </div>
                        <div className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md" onClick={moveItems}>
                            <ArrowCircleRightIcon className="w-4 m-1 " /><label className="text-sm">移動至</label>
                        </div>
                    </div>
                    <div className="flex flex-0 mr-4">
                        <div className="flex flex-row items-center rounded-lg border border-gray-300 p-1" onClick={clearItems}>
                            <XIcon className="w-4 m-1" /><label className="text-sm">已選取 {count} 個項目</label>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}