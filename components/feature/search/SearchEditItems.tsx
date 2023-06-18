import { XMarkIcon } from '@heroicons/react/20/solid';
import {
    MagnifyingGlassIcon,
    PaperAirplaneIcon,
    TagIcon,
    ArchiveBoxArrowDownIcon
} from '@heroicons/react/24/outline';

interface EditItemsProps {
    openItems?: any;
    searchItems?: any;
    clearItems?: any;
    updateTag?: any;
    count: number;
    visibleDeepUnderstanding?: boolean;
    deepUnderstanding?: any;
}

export default function SearchEditItems(props: EditItemsProps) {
    const {
        openItems,
        searchItems,
        clearItems,
        updateTag,
        count,
        visibleDeepUnderstanding,
        deepUnderstanding
    } = props;
    return (
        <>
            {count > 0 && (
                <div className="flex justify-between items-center fixed w-full sm:w-full mx-auto lg:w-9/12 z-50 px-4 py-2 sm:px-6 lg:px-8  bg-white shadow-lg rounded-lg border">
                    <div className="flex flex-1 flex-row">
                        <div
                            className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                            onClick={openItems}
                        >
                            <PaperAirplaneIcon className="w-4 m-1 " />
                            <label className="text-sm">打開</label>
                        </div>
                        <div
                            className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                            onClick={searchItems}
                        >
                            <MagnifyingGlassIcon className="w-4 m-1 " />
                            <label className="text-sm">智能查詢</label>
                        </div>
                        <div
                            className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                            onClick={updateTag}
                        >
                            <TagIcon className="w-4 m-1 " />
                            <label className="text-sm">更新標籤</label>
                        </div>
                        {visibleDeepUnderstanding && (
                            <div
                                className="flex flex-row items-center p-1 hover:bg-gray-300 rounded-md"
                                onClick={deepUnderstanding}
                            >
                                <ArchiveBoxArrowDownIcon className="w-4 m-1 " />
                                <label className="text-sm">深度理解</label>
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
