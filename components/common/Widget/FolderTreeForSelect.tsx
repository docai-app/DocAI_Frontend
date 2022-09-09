import { Transition } from '@headlessui/react';
import axios from 'axios';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction, useCallback, useState } from 'react';
import Api from '../../../apis';
import FolderTree, { Folder } from './FolderTree';

interface FolderTreeForSelectgProps {
    mode: 'view' | 'move' | string;
    setMode: any;
    folderPath: Folder | null;
    setFolderPath: Dispatch<SetStateAction<Folder | null>>;
    targetId: string | null;
}

const apiSetting = new Api();
export default function FolderTreeForSelect(props: FolderTreeForSelectgProps) {
    const { mode, setMode,folderPath, setFolderPath, targetId } = props;

    const [_movingDest, _setMovingDest] = useState<Folder | null>(null);

    const router = useRouter();
    const handleMove = useCallback(
        async (document_id: string | null, folder: Folder) => {
            setFolderPath(folder)
            setMode('view');
        },
        [router]
    );
    return (
        <Transition show={mode === 'move'}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className="fixed inset-0 bg-black/30"
                    aria-hidden="true"
                    onClick={() => {
                        setMode('view');
                    }}
                />
            </Transition.Child>
            <Transition.Child
                as={Fragment}
                enter="translate ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="translate ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
            >
                <div className="fixed h-[calc(100vh)] shadow-lg right-0 top-0 bg-white w-[28rem]">
                    <div className="w-full h-full flex flex-col">
                        <h1 className="p-5 pt-10 font-bold text-3xl">選擇儲存路徑</h1>
                        <div className="pr-5 overflow-auto">
                            <FolderTree
                                expanded={true}
                                movingDest={_movingDest}
                                setMovingDest={_setMovingDest}
                            />
                        </div>
                        {_movingDest != null && (
                            <div className="py-5 px-5 flex">
                                <button
                                    className="ml-auto px-3 py-2 bg-green-600 text-white rounded-md"
                                    onClick={() => handleMove(targetId, _movingDest)}
                                >
                                    確認
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
}
