import { Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction, useCallback, useState } from 'react';
import Api from '../../../apis';

interface ChainFeatureSelectProps {
    chain_features: [];
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    chain_feature_ids?: any;
    set_chain_feature_ids?: any;
    handleSave?: any;
}

const apiSetting = new Api();
export default function ChainFeatureSelect(props: ChainFeatureSelectProps) {
    const {
        chain_features,
        isOpen,
        setIsOpen,
        chain_feature_ids,
        set_chain_feature_ids,
        handleSave
    } = props;
    const [_multipleDest, _setMultipleDest] = useState<any[]>([]);
    const router = useRouter();

    const isSelected = useCallback(
        (chain_feature_id: string) => {
            const index = _.findIndex(chain_feature_ids, function (value: any) {
                return chain_feature_id == value;
            });
            return index == -1;
        },
        [props]
    );

    const handleChainFeatureClick = useCallback(
        (chain_feature_id: any) => {
            if (isSelected(chain_feature_id)) {
                set_chain_feature_ids((prev: any) => [...prev, chain_feature_id]);
            } else {
                set_chain_feature_ids(
                    chain_feature_ids.filter((value: any) => value !== chain_feature_id)
                );
            }
        },
        [chain_feature_ids]
    );

    const handleConfirm = useCallback(
        (folders: any) => {
            setIsOpen(false);
            if (handleSave) {
                handleSave(chain_feature_ids);
            }
        },
        [router, chain_feature_ids]
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
                            <h1 className="font-bold text-3xl text-center">選擇Chain Feature</h1>
                            <XCircleIcon
                                className="w-6 h-6"
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            />
                        </div>
                        <div className="pl-2 pr-5 pb-5 overflow-auto">
                            {chain_features?.map((item: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={` border p-2 mt-1 cursor-pointer ${
                                            !isSelected(item?.fields?.id) ? ' bg-indigo-100' : ''
                                        }`}
                                        onClick={() => handleChainFeatureClick(item?.fields?.id)}
                                    >
                                        {item.fields.name}
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
