import { TrashIcon, XMarkIcon } from '@heroicons/react/20/solid';
import {
    ArchiveBoxArrowDownIcon,
    ArrowRightCircleIcon,
    ChartBarIcon,
    MagnifyingGlassIcon,
    PaperAirplaneIcon,
    Square2StackIcon,
    TagIcon
} from '@heroicons/react/24/outline';

interface EditItemsProps {
    moveItems?: any;
    deleteItems?: any;
    clearItems?: any;
    searchItems?: any;
    downloadItems?: any;
    visibleSearchItems?: boolean;
    updateTag?: any;
    visibleUpdateTag?: boolean;
    visibleMoveItem?: boolean;
    count: number;
    visibleDeepUnderstanding?: boolean;
    deepUnderstanding?: any;
    visibleGenerateChart?: boolean;
    generateChart?: any;
    visibleToExecl?: boolean;
    toExecl?: any;
    visibleOpen?: boolean;
    openItems?: any;
}

export default function EditItems(props: EditItemsProps) {
    const {
        moveItems,
        deleteItems,
        clearItems,
        searchItems,
        downloadItems,
        visibleSearchItems,
        updateTag,
        visibleUpdateTag,
        visibleMoveItem = true,
        count,
        visibleDeepUnderstanding,
        deepUnderstanding,
        visibleGenerateChart,
        generateChart,
        visibleToExecl,
        toExecl,
        visibleOpen,
        openItems
    } = props;
    return (
        <>
            {count > 0 && (
                <div className="flex justify-between items-center fixed w-full sm:w-full mx-auto lg:w-9/12 z-50 px-4 py-2 sm:px-6 lg:px-8  bg-white shadow-lg rounded-lg border">
                    <div className="flex flex-1 flex-row">
                        <div
                            className="flex-row items-center p-1 hover:bg-gray-300 rounded-md hidden"
                            onClick={deleteItems}
                        >
                            <TrashIcon className="w-4 m-1" />
                            <label className="text-sm">刪除</label>
                        </div>
                        {visibleOpen && (
                            <div
                                className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                                onClick={openItems}
                            >
                                <PaperAirplaneIcon className="w-4 m-1 " />
                                <label className="text-sm">打開</label>
                            </div>
                        )}
                        {visibleMoveItem && (
                            <div
                                className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                                onClick={moveItems}
                            >
                                <ArrowRightCircleIcon className="w-4 m-1 " />
                                <label className="text-sm">移動至</label>
                            </div>
                        )}
                        {visibleMoveItem && (
                            <div
                                className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                                onClick={downloadItems}
                            >
                                <ArrowRightCircleIcon className="w-4 m-1 " />
                                <label className="text-sm">下載</label>
                            </div>
                        )}
                        {visibleUpdateTag && (
                            <div
                                className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                                onClick={updateTag}
                            >
                                <TagIcon className="w-4 m-1 " />
                                <label className="text-sm">更新標籤</label>
                            </div>
                        )}
                        {visibleToExecl && (
                            <div
                                className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                                onClick={toExecl}
                            >
                                <Square2StackIcon className="w-4 m-1 " />
                                <label className="text-sm">搬資料到Execl</label>
                            </div>
                        )}
                        {visibleSearchItems && (
                            <div
                                className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                                onClick={searchItems}
                            >
                                <MagnifyingGlassIcon className="w-4 m-1 " />
                                <label className="text-sm">智能查詢</label>
                            </div>
                        )}
                        {visibleDeepUnderstanding && (
                            <div
                                className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                                onClick={deepUnderstanding}
                            >
                                <ArchiveBoxArrowDownIcon className="w-4 m-1 " />
                                <label className="text-sm">深度理解</label>
                            </div>
                        )}
                        {visibleGenerateChart && (
                            <div
                                className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                                onClick={generateChart}
                            >
                                <ChartBarIcon className="w-4 m-1 " />
                                <label className="text-sm">生成圖表</label>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-0 mr-4">
                        <div
                            className="flex flex-row items-center rounded-lg border border-gray-300 p-1"
                            onClick={clearItems}
                        >
                            <XMarkIcon className="w-4 m-1" />
                            <label className="text-sm">已選取 {count} 個項目</label>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
