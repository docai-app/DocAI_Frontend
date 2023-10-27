import { Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction, useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';

interface SelectProps {
    loading: boolean;
    tags: [];
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    tagIds?: any;
    handleSave?: any;
}

const apiSetting = new Api();
export default function LabelSelect(props: SelectProps) {
    const { loading, tags, isOpen, setIsOpen, tagIds, handleSave } = props;
    const [_multipleDest, _setMultipleDest] = useState<any[]>([]);
    const [tag_ids, set_tag_ids] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (tagIds) set_tag_ids(tagIds);
    }, [tagIds]);

    const isSelected = useCallback(
        (id: string) => {
            const index = _.findIndex(tag_ids, function (value: any) {
                return id == value;
            });
            return index == -1;
        },
        [tag_ids]
    );

    const handleTagClick = useCallback(
        (id: any) => {
            if (isSelected(id)) {
                set_tag_ids((prev: any) => [...prev, id]);
            } else {
                set_tag_ids(tag_ids.filter((value: any) => value !== id));
            }
        },
        [tag_ids]
    );

    const handleConfirm = useCallback(
        (folders: any) => {
            setIsOpen(false);
            if (handleSave) {
                handleSave(tag_ids);
            }
        },
        [router, tag_ids]
    );
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
                            <h1 className="font-bold text-3xl text-center">選擇標籤</h1>
                            <XCircleIcon
                                className="w-6 h-6"
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            />
                        </div>
                        <div className="pl-2 pr-5 pb-5 overflow-auto">
                            {loading && <label>正在加載中...</label>}
                            {tags?.map((item: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={` border p-2 mt-1 cursor-pointer ${
                                            !isSelected(item?.id) ? ' bg-indigo-100' : ''
                                        }`}
                                        onClick={() => handleTagClick(item?.id)}
                                    >
                                        {item.name} ({item?.smart_extraction_schemas_count})
                                    </div>
                                );
                            })}
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
