import { Transition } from '@headlessui/react';
import axios from 'axios';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction, useCallback } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import FolderTree, { Folder } from './FolderTree';

interface FolderTreeForMovingProps {
    mode: 'view' | 'move' | string;
    setMode: any;
    movingDest: Folder | null;
    setMovingDest: Dispatch<SetStateAction<Folder | null>>;
    targetId: string | null;
}

const apiSetting = new Api();
export default function FolderTreeForMoving(props: FolderTreeForMovingProps) {
    const { mode, setMode, movingDest, setMovingDest, targetId } = props;
    const { setAlert } = useAlert();
    const router = useRouter();
    const handleMove = useCallback(
        async (document_id: string | null, folder_id: string) => {
            if (document_id != null) {
                const res = await axios.request(
                    apiSetting.Document.updateDocumentById(document_id, folder_id)
                );
                if (res.data?.success) {
                    // setAlert({title: '移動成功');
                    router.reload();
                } else {
                    setAlert({ title: '發生錯誤', type: 'error' });
                }
            }
        },
        [router, setAlert]
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
                <div className="fixed h-[calc(100vh)] pt-10 shadow-lg right-0 top-0 bg-white w-[28rem]">
                    <div className="w-full h-full flex flex-col">
                        <h1 className="p-5 pt-10 font-bold text-3xl">選擇移動目的地</h1>
                        <div className="pr-5 overflow-auto">
                            <FolderTree
                                expanded={true}
                                movingDest={movingDest}
                                setMovingDest={setMovingDest}
                            />
                        </div>
                        {movingDest != null && (
                            <div className="py-5 px-5 flex">
                                <button
                                    className="ml-auto px-3 py-2 bg-green-600 text-white rounded-md"
                                    onClick={() => handleMove(targetId, movingDest.id)}
                                >
                                    移動
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
}
