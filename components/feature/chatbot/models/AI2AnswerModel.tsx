/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import _ from 'lodash';
import { Fragment, useRef } from 'react';
import InputTextView from '../../../common/Widget/InputTextView';
import SetAssistantView from '../SetAssistantView';
import SetExpertView from '../SetExpertView';
interface ViewProps {
    visable: boolean;
    chatbot: any;
    setChatbot: any;
    assistants: any;
    expert_ids: any;
    experts: any;
    setExpert_ids: any;
    cancelClick: any;
    confirmClick: any;
    feature_name: string;
}
export default function AI2AnswerModal(props: ViewProps) {
    const {
        visable,
        chatbot,
        setChatbot,
        assistants,
        expert_ids,
        experts,
        setExpert_ids,
        cancelClick,
        confirmClick,
        feature_name
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
                <div className="flex items-end justify-center min-h-screen pt-0 px-0 pb-20 text-center sm:block sm:p-0">
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
                        <div className="relative inline-block align-bottom bg-white   rounded-lg  pt-0 pb-4 text-center overflow-hidden shadow-xl transform transition-all  sm:align-middle sm:max-w-lg sm:w-full  ">
                            <div className="sm:flex sm:items-center justify-center p-4">
                                <div className="mt-0 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <p className="text-xl">{'超智能回答'}</p>
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
                                <SetAssistantView
                                    assistants={assistants}
                                    chatbot={chatbot}
                                    setChatbot={setChatbot}
                                />
                                <SetExpertView
                                    expert_ids={expert_ids}
                                    experts={experts}
                                    setExpert_ids={setExpert_ids}
                                />
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
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
