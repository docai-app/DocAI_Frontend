import { Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction, useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';
import FolderTree, { Folder } from './FolderTree';

interface FolderTreeForMultipleSelectProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setMultipleDest: Dispatch<SetStateAction<Folder[]>>;
    multipleDest: Folder[];
}

const apiSetting = new Api();
export default function FolderTreeForMultipleSelect(props: FolderTreeForMultipleSelectProps) {
    const { isOpen, setIsOpen, multipleDest, setMultipleDest } = props;

    const [_multipleDest, _setMultipleDest] = useState<Folder[]>([]);

    const router = useRouter();
    const handleConfirm = useCallback(
        (folders: Folder[]) => {
            setMultipleDest(folders);
            setIsOpen(false);
        },
        [router]
    );

    useEffect(() => {
        if (multipleDest) {
            _setMultipleDest(multipleDest);
        }
    }, [multipleDest]);
    return (
        <Transition show={isOpen}>
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
                        setIsOpen(false);
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
                <div className="fixed h-[calc(100vh)] shadow-lg right-0 top-0 pt-16 bg-white w-[28rem] z-50">
                    <div className="w-full h-full flex flex-col py-8">
                        <div className="px-8 py-2 flex flex-row items-center justify-between">
                            <h1 className="font-bold text-3xl text-center">選擇多個文件夾</h1>
                            <XCircleIcon
                                className="w-6 h-6"
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            />
                        </div>
                        <div className="pl-2 pr-5 overflow-auto">
                            <FolderTree
                                expanded={true}
                                multiple={true}
                                multipleDest={_multipleDest}
                                setMultipleDest={_setMultipleDest}
                            />
                        </div>
                        {_multipleDest != null && (
                            <div className="px-5 flex">
                                <button
                                    className="ml-auto px-3 py-2 bg-green-600 text-white rounded-md"
                                    onClick={() => handleConfirm(_multipleDest)}
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
