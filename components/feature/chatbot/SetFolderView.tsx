import { XMarkIcon } from '@heroicons/react/24/outline';
import { FolderIcon } from '@heroicons/react/24/solid';
import _ from 'lodash';
import { useState } from 'react';
import FolderTreeForMultipleSelect from '../../common/Widget/FolderTreeForMultipleSelect';

interface ViewProps {
    multipleDest: any;
    setMultipleDest: any;
}

export default function SetFolderView(props: ViewProps) {
    const { multipleDest, setMultipleDest } = props;

    const [folderTreeIsOpen, setFolderTreeIsOpen] = useState(false);

    return (
        <>
            <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    來源文件夾
                </label>
                <div className="flex justify-between p-3 mt-2 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                    <div className="flex flex-wrap gap-2 ">
                        {multipleDest.length > 0 ? (
                            multipleDest.map((dest: any) => (
                                <div
                                    key={dest.id}
                                    className="p-2 pl-3 rounded-md flex items-center gap-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 relative"
                                >
                                    <FolderIcon className="h-5 text-gray-400" />
                                    <span>{dest.name}</span>
                                    <button
                                        className="cursor-pointer text-red-300 hover:text-red-600"
                                        onClick={() =>
                                            setMultipleDest((prev: any) =>
                                                _.filter(prev, (d) => d.id !== dest.id)
                                            )
                                        }
                                    >
                                        <XMarkIcon className="h-5" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-400">未選取任何文件夾</div>
                        )}
                    </div>
                    <button
                        onClick={() => setFolderTreeIsOpen(!folderTreeIsOpen)}
                        className="text-sm hover:underline text-indigo-600 whitespace-nowrap"
                    >
                        選擇多個文件夾
                    </button>
                </div>
                {/* <DocumentPath
                                modeType={'move'}
                                target_folder_id={target_folder_id}
                                set_target_folder_id={set_target_folder_id}
                            /> */}
            </div>
            <FolderTreeForMultipleSelect
                {...{
                    isOpen: folderTreeIsOpen,
                    setIsOpen: setFolderTreeIsOpen,
                    multipleDest,
                    setMultipleDest
                }}
            />
        </>
    );
}
