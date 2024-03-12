/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import _ from 'lodash';
import { Fragment, useRef } from 'react';
import InputTextView from '../../../common/Widget/InputTextView';
interface ViewProps {
    visable: boolean;
    chatbot: any;
    setChatbot: any;
    cancelClick: any;
    confirmClick: any;
    feature_name: string;
    setIsOpen: any;
    chain_feature_labels: any;
}
export default function AIChainFeatureModel(props: ViewProps) {
    const {
        visable,
        chatbot,
        setChatbot,
        cancelClick,
        confirmClick,
        feature_name,
        setIsOpen,
        chain_feature_labels
    } = props;

    const cancelButtonRef = useRef(null);
    return (
        <Transition.Root show={visable || false} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={cancelClick}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-y-auto shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-center justify-center">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div className="mt-2">
                                        <p className="text-xl">{'智能任务'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col max-h-[80vh] overflow-y-auto p-4">
                                <InputTextView
                                    title={'標題'}
                                    placeholder={'請輸入標題'}
                                    defaultValue={_.get(
                                        chatbot?.meta?.selected_features_titles,
                                        feature_name
                                    )}
                                    onChange={(value: string) => {
                                        setChatbot({
                                            ...chatbot,
                                            meta: {
                                                ...chatbot.meta,
                                                selected_features_titles: {
                                                    ...chatbot.meta.selected_features_titles,
                                                    [feature_name]: value
                                                }
                                            }
                                        });
                                    }}
                                />
                                <div className="col-span-full my-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium leading-6 text-gray-900 flex justify-start">
                                            Chain Feature:
                                        </label>
                                        <a
                                            className="text-blue-500 underline cursor-pointer text-sm"
                                            onClick={() => {
                                                setIsOpen(true);
                                                cancelClick();
                                            }}
                                        >
                                            編輯
                                        </a>
                                    </div>
                                    <div className="mt-2 w-full flex flex-col justify-start items-start">
                                        <span className="text-sm text-gray-500 text-left">
                                            {chain_feature_labels}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-center">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        confirmClick();
                                    }}
                                >
                                    {'確認'}
                                </button>

                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:white sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        props.cancelClick();
                                    }}
                                    ref={cancelButtonRef}
                                >
                                    {'取消'}
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
